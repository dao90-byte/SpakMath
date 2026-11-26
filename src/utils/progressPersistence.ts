// ============================================================================
// PROGRESS PERSISTENCE & AUTO-BACKUP ENGINE (BẢO TOÀN TIẾN TRÌNH HỌC)
// - Dual-layer storage: localStorage + IndexedDB automatic mirror
// - Restores missing progress keys from IndexedDB before React mounts
// - 1-click Export / Import JSON backup for cross-device / total safety
// ============================================================================

const IDB_NAME = 'SpakMathProgressBackupDB';
const IDB_VERSION = 1;
const IDB_STORE = 'kv_backup';
const IDB_SNAPSHOT_KEY = 'latest_progress_snapshot';

const EXCLUDED_KEYS = new Set<string>([
  'spark_math_scratchpad_data',
  'spark_math_dev_errors',
]);

export function isLearningProgressKey(key: string): boolean {
  if (!key || EXCLUDED_KEYS.has(key)) return false;
  return (
    key.startsWith('spark_math_') ||
    key.startsWith('grade3_math_')
  );
}

export interface ProgressBackupPayload {
  version: 1;
  exportedAt: string;
  entries: Record<string, string>;
}

function collectLocalStorageProgress(): Record<string, string> {
  const entries: Record<string, string> = {};
  if (typeof window === 'undefined' || !window.localStorage) return entries;
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && isLearningProgressKey(k)) {
        const val = window.localStorage.getItem(k);
        if (val !== null) {
          entries[k] = val;
        }
      }
    }
  } catch {
    // Ignore storage access errors
  }
  return entries;
}

function openBackupDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      resolve(null);
      return;
    }
    try {
      const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readIndexedDBSnapshot(): Promise<ProgressBackupPayload | null> {
  const db = await openBackupDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(IDB_SNAPSHOT_KEY);
      req.onsuccess = () => {
        const res = req.result as ProgressBackupPayload | undefined;
        db.close();
        resolve(res && res.entries ? res : null);
      };
      req.onerror = () => {
        db.close();
        resolve(null);
      };
    } catch {
      db.close();
      resolve(null);
    }
  });
}

export async function mirrorLocalStorageToIndexedDB(): Promise<void> {
  const entries = collectLocalStorageProgress();
  if (Object.keys(entries).length === 0) return;

  const db = await openBackupDB();
  if (!db) return;

  const payload: ProgressBackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    entries,
  };

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(payload, IDB_SNAPSHOT_KEY);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    } catch {
      db.close();
      resolve();
    }
  });
}

/**
 * Runs once before React mounts:
 * - Restores any learning progress keys present in IndexedDB that are missing in localStorage.
 * - Immediately mirrors current localStorage progress into IndexedDB if localStorage already has data.
 */
export async function restoreProgressFromIndexedDBIfNeeded(): Promise<number> {
  if (typeof window === 'undefined' || !window.localStorage) return 0;

  let restoredCount = 0;
  try {
    const snapshot = await readIndexedDBSnapshot();
    if (snapshot && snapshot.entries) {
      for (const [k, v] of Object.entries(snapshot.entries)) {
        if (!isLearningProgressKey(k)) continue;
        const existing = window.localStorage.getItem(k);
        if (existing === null || existing === '{}' || existing === '[]') {
          window.localStorage.setItem(k, v);
          restoredCount++;
        }
      }
    }
  } catch {
    // Never block app startup on backup restore
  }

  // Ensure IndexedDB has the latest merged snapshot
  void mirrorLocalStorageToIndexedDB();
  return restoredCount;
}

let autoMirrorInstalled = false;

/**
 * Installs automatic debounced mirroring from localStorage -> IndexedDB
 * whenever any SpakMath learning progress key is written.
 */
export function installProgressAutoMirror(): void {
  if (autoMirrorInstalled || typeof window === 'undefined') return;
  autoMirrorInstalled = true;

  let timer: number | null = null;
  const scheduleMirror = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = null;
      void mirrorLocalStorageToIndexedDB();
    }, 400);
  };

  try {
    const origSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      origSetItem.call(this, key, value);
      if (this === window.localStorage && isLearningProgressKey(key)) {
        scheduleMirror();
      }
    };
  } catch {
    // Fallback to lifecycle hooks only
  }

  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      void mirrorLocalStorageToIndexedDB();
    }
  });
  window.addEventListener('pagehide', () => {
    void mirrorLocalStorageToIndexedDB();
  });
}

export function exportProgressBackupFile(): number {
  const entries = collectLocalStorageProgress();
  const count = Object.keys(entries).length;
  const payload: ProgressBackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    entries,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `spakmath-tien-trinh-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return count;
}

export async function importProgressBackupFile(file: File): Promise<number> {
  const text = await file.text();
  const parsed = JSON.parse(text) as Partial<ProgressBackupPayload>;
  if (!parsed || typeof parsed.entries !== 'object' || !parsed.entries) {
    throw new Error('File sao lưu không đúng định dạng SpakMath.');
  }

  let imported = 0;
  for (const [k, v] of Object.entries(parsed.entries)) {
    if (isLearningProgressKey(k) && typeof v === 'string') {
      window.localStorage.setItem(k, v);
      imported++;
    }
  }

  await mirrorLocalStorageToIndexedDB();
  return imported;
}
