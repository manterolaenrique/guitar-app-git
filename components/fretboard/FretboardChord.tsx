
"use client";
import * as React from "react";
import type { JSX } from "react";
import { chromaticScale } from "@/data/chordFormulas";
import type { Position } from "@/data/chordShapes";

interface FretboardChordProps {
  positions: Position[];
}

const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // 1ª a 6ª (de aguda a grave)
const fretCount = 13;

const FretboardChord: React.FC<FretboardChordProps> = ({ positions }) => {
  const getCell = (stringIdx: number, fretIdx: number): JSX.Element | null => {
    const match = positions.find(p => p.string === stringIdx && p.fret === fretIdx);
    if (!match) return null;

    const isTonic = match.label === 'T';
    const bgClass = isTonic ? 'bg-red-600 text-white' : 'bg-yellow-300 text-black';

    return (
      <div className={`w-12 h-12 flex items-center justify-center font-bold border border-gray-300 ${bgClass}`}>
        {match.label}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        {Array.from({ length: fretCount }, (_, fretIdx) => (
          <div key={fretIdx} className="flex flex-col">
            {strings.map((_, stringIdx) => (
              <div
                key={stringIdx}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center bg-[#fbe8c6]"
              >
                {getCell(5 - stringIdx, fretIdx)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FretboardChord;