"use client";

import { Fragment, useMemo } from "react";
import type { Position } from "@/data/chordShapes";

interface FretboardChordProps {
  positions: Position[];
}

const strings = ["E", "B", "G", "D", "A", "E"];
const fretCount = 13;
const markerFrets = new Set([3, 5, 7, 9, 12]);

const FretboardChord = ({ positions }: FretboardChordProps) => {
  const positionMap = useMemo(
    () => new Map(positions.map((position) => [`${position.string}-${position.fret}`, position])),
    [positions],
  );

  const activeFrets = useMemo(
    () => positions.filter((position) => position.fret > 0).map((position) => position.fret),
    [positions],
  );

  const minActiveFret = activeFrets.length ? Math.min(...activeFrets) : 0;
  const maxActiveFret = activeFrets.length ? Math.max(...activeFrets) : 0;

  return (
    <section className="chord-fretboard-shell">
      <div className="chord-fretboard-header">
        <div>
          <span className="chord-panel-kicker">Mapa de posiciones</span>
          <h3 className="chord-fretboard-title">Distribucion sobre el mastil</h3>
        </div>

        <div className="chord-fretboard-stats">
          <span className="scale-stat-chip">
            <strong>{positions.length}</strong>
            voces
          </span>
          <span className="scale-stat-chip">
            <strong>{minActiveFret}</strong>
            traste inicial
          </span>
          <span className="scale-stat-chip">
            <strong>{maxActiveFret}</strong>
            traste final
          </span>
        </div>
      </div>

      <div className="chord-fretboard-scroll">
        <div
          className="chord-fretboard-grid"
          role="img"
          aria-label="Distribucion de posiciones del acorde sobre el mastil"
        >
          <div className="chord-fretboard-corner">Str</div>

          {Array.from({ length: fretCount }, (_, fretIdx) => (
            <div key={`fret-header-${fretIdx}`} className="chord-fret-number">
              {fretIdx}
            </div>
          ))}

          {strings.map((stringName, displayIndex) => {
            const stringIdx = 5 - displayIndex;

            return (
              <Fragment key={`string-row-${stringIdx}`}>
                <div className="chord-string-label">{stringName}</div>

                {Array.from({ length: fretCount }, (_, fretIdx) => {
                  const match = positionMap.get(`${stringIdx}-${fretIdx}`);
                  const isTonic = match?.label === "T";
                  const hasMarker = markerFrets.has(fretIdx);

                  return (
                    <div
                      key={`cell-${stringIdx}-${fretIdx}`}
                      className={`chord-fret-cell ${fretIdx === 0 ? "is-nut" : ""} ${hasMarker ? "has-dot" : ""}`}
                    >
                      {match ? (
                        <div className={`chord-fret-marker ${isTonic ? "is-tonic" : ""}`}>
                          <span>{match.label}</span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>

      <p className="chord-fretboard-caption">
        Vista tecnica de 6 cuerdas y 13 trastes, pensada para reutilizar las posiciones existentes sin alterar
        el calculo del acorde.
      </p>
    </section>
  );
};

export default FretboardChord;
