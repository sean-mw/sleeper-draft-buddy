import { useEffect, useState } from "react";
import { Rankings } from "../components/Rankings";
import { getSleeperDraftPicks } from "../util/sleeper";
import { getAllUnderdogPlayers } from "../util/underdog";
import { Player, getPlayerId, Position } from "../util/player";
import { SelectionRadio } from "../components/SelectionRadio";
import { useLoaderData } from "react-router-dom";
  
export function Draft() {
  const draftId = useLoaderData() as string;
  const [picks, setPicks] = useState<Set<string>>(new Set());
  const [players, setPlayers] = useState<Player[]>([]);
  const [rankingSelection, setRankingSelection] = useState<Position>(
    Position.ALL
  );

  useEffect(() => {
    function updatePicks() {
        getSleeperDraftPicks(draftId)
        .then((players: Player[]) => {
            const picks = new Set<string>();
            for (const player of players) {
            picks.add(getPlayerId(player));
            }
            setPicks(picks);
        })
        .catch((e) => {
            console.log(e);
            throw new Error("Failed to update picks.");
        });
    }

    getAllUnderdogPlayers(setPlayers);
    updatePicks();
    setInterval(updatePicks, 1000);
  }, [draftId]);

  return (
    <>
      <SelectionRadio setRankingSelection={setRankingSelection} />
      <Rankings position={rankingSelection} picks={picks} players={players} />
    </>
  );
}