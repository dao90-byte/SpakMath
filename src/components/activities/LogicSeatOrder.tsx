import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Award } from 'lucide-react';

interface LogicSeatOrderProps {
  seatsCount: number;
  correctOrder: string[];
  allowedCharacters: string[];
  onCompleted: () => void;
}

export const LogicSeatOrder: React.FC<LogicSeatOrderProps> = ({
  seatsCount = 5,
  correctOrder,
  allowedCharacters,
  onCompleted
}) => {
  // Array of 5 seats, holding character name or null
  const [seats, setSeats] = useState<(string | null)[]>([null, null, null, null, null]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const characterAvatars: Record<string, string> = {
    'Bác sĩ Mayle': '👨‍⚕️',
    'Casey': '🐹',
    'Abby': '🐰',
    'Benny': '🐵',
    'Bác Ram': '🧔'
  };

  const handleSeatClick = (seatIndex: number) => {
    sound.playClick();
    setSelectedSeat(seatIndex);
  };

  const handleAssignCharacter = (charName: string) => {
    if (selectedSeat === null) return;
    sound.playClick();

    const newSeats = [...seats];
    // Remove character from any previous seat
    const prevIndex = newSeats.indexOf(charName);
    if (prevIndex !== -1) {
      newSeats[prevIndex] = null;
    }

    newSeats[selectedSeat] = charName;
    setSeats(newSeats);

    // Auto move to next empty seat
    const nextEmpty = newSeats.findIndex((s) => s === null);
    setSelectedSeat(nextEmpty !== -1 ? nextEmpty : null);

    // Check clues if all 5 seated
    if (newSeats.every((s) => s !== null)) {
      validateSeating(newSeats as string[]);
    }
  };

  const handleClearSeat = (seatIndex: number) => {
    sound.playClick();
    const newSeats = [...seats];
    newSeats[seatIndex] = null;
    setSeats(newSeats);
  };

  const handleReset = () => {
    sound.playWrong();
    setSeats([null, null, null, null, null]);
    setSelectedSeat(0);
    setIsSuccess(false);
  };

  // Clue checker functions
  const checkClues = (currentSeats: (string | null)[]) => {
    const mayleIdx = currentSeats.indexOf('Bác sĩ Mayle');
    const abbyIdx = currentSeats.indexOf('Abby');
    const bennyIdx = currentSeats.indexOf('Benny');
    const ramIdx = currentSeats.indexOf('Bác Ram');

    const clue1 = mayleIdx === 0 || mayleIdx === 4; // Bác sĩ Mayle ở rìa
    const clue2 = abbyIdx === 2; // Abby ở trung tâm (Ghế 3)
    const clue3 = abbyIdx !== -1 && bennyIdx !== -1 && bennyIdx > abbyIdx; // Benny ở bên phải Abby
    const clue4 =
      mayleIdx !== -1 && ramIdx !== -1 && Math.abs(mayleIdx - ramIdx) === 3; // 2 người ở giữa Mayle và Ram

    return { clue1, clue2, clue3, clue4 };
  };

  const cluesState = checkClues(seats);

  const validateSeating = (currentSeats: string[]) => {
    const { clue1, clue2, clue3, clue4 } = checkClues(currentSeats);
    if (clue1 && clue2 && clue3 && clue4) {
      sound.playCorrect();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Clues Live Checklist */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 w-full max-w-xl space-y-2">
        <h4 className="text-xs uppercase font-extrabold text-amber-800 tracking-wider">
          🔍 Manh mối thám tử:
        </h4>
        <ul className="text-xs md:text-sm space-y-1.5 font-medium">
          <li className={`flex items-center gap-2 ${cluesState.clue1 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
            <span>{cluesState.clue1 ? '✅' : '⚪'}</span>
            1. Bác sĩ Mayle ngồi ở bên rìa ngoài cùng.
          </li>
          <li className={`flex items-center gap-2 ${cluesState.clue2 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
            <span>{cluesState.clue2 ? '✅' : '⚪'}</span>
            2. Abby đang ngồi ở vị trí trung tâm (Ghế số 3).
          </li>
          <li className={`flex items-center gap-2 ${cluesState.clue3 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
            <span>{cluesState.clue3 ? '✅' : '⚪'}</span>
            3. Benny ngồi ở phía bên phải của bạn Abby.
          </li>
          <li className={`flex items-center gap-2 ${cluesState.clue4 ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>
            <span>{cluesState.clue4 ? '✅' : '⚪'}</span>
            4. Có 2 người ngồi ở giữa Bác sĩ Mayle và Bác Ram.
          </li>
        </ul>
      </div>

      {/* 5 Chairs in a row */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase mb-4 px-2">
          <span>⬅️ BÊN TRÁI</span>
          <span>BÊN PHẢI ➡️</span>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {seats.map((charName, idx) => {
            const isSelected = selectedSeat === idx;

            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-slate-500">Ghế {idx + 1}</span>

                <button
                  type="button"
                  onClick={() => handleSeatClick(idx)}
                  className={`w-full aspect-square rounded-2xl border-3 flex flex-col items-center justify-center transition-all p-1.5 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300 scale-105 shadow-md'
                      : charName
                      ? 'border-emerald-400 bg-emerald-50 hover:bg-emerald-100'
                      : 'border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-3xl md:text-4xl">
                    {charName ? characterAvatars[charName] : '🪑'}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-800 text-center truncate max-w-full mt-1">
                    {charName || 'Trống'}
                  </span>
                </button>

                {charName && (
                  <button
                    type="button"
                    onClick={() => handleClearSeat(idx)}
                    className="text-[10px] text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Bỏ chọn
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Character badges to pick */}
      <div className="bg-slate-100 p-4 rounded-3xl w-full max-w-xl space-y-2 text-center">
        <span className="text-xs font-bold text-slate-500">
          Chạm vào 1 người để xếp vào ghế đang chọn:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {allowedCharacters.map((char) => {
            const isAssigned = seats.includes(char);

            return (
              <button
                key={char}
                onClick={() => handleAssignCharacter(char)}
                className={`px-3 py-2 rounded-2xl border-2 flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all active:scale-95 ${
                  isAssigned
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 opacity-60'
                    : 'bg-white border-slate-300 hover:border-amber-400 text-slate-800 shadow-sm'
                }`}
              >
                <span>{characterAvatars[char]}</span>
                <span>{char}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Xếp lại từ đầu
        </button>
        <button
          onClick={() => {
            if (seats.every((s) => s !== null)) {
              validateSeating(seats as string[]);
            } else {
              sound.playWrong();
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Chỗ Ngồi
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Hoàn hảo! Bạn đã sắp xếp đúng 5 người vào 5 ghế thỏa mãn mọi manh mối!
        </div>
      )}
    </div>
  );
};
