import { useEffect, useState } from "react";
import { Rankings } from "../components/Rankings";
import {
  getSleeperDraftPicks,
  getSleeperKeepers,
  getSleeperLeagueId,
  isValidDraftId,
} from "../util/sleeper";
import { getAllUnderdogPlayers } from "../util/underdog";
import { Player, getPlayerId, Position } from "../util/player";
import { SelectionRadio } from "../components/SelectionRadio";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./draft.css";

export function Draft() {
  const navigate = useNavigate();
  const draftId = useLoaderData() as string;
  const [picks, setPicks] = useState<Set<string>>(new Set());
  const [players, setPlayers] = useState<Player[]>([]);
  const [rankingSelection, setRankingSelection] = useState<Position>(
    Position.ALL,
  );

  useEffect(() => {
    isValidDraftId(draftId)
      .then((isValid) => {
        if (!isValid) navigate("/");
        return isValid;
      })
      .catch(() => console.error);

    const leagueId = getSleeperLeagueId(draftId);
    const keeperIds = leagueId
      .then(async (leagueId) => {
        if (leagueId === null) return [];
        const keepers = await getSleeperKeepers(leagueId);
        return keepers.map((player) => getPlayerId(player));
      })
      .catch((e) => {
        console.log(e);
        return [] as string[];
      });

    async function updatePicks() {
      const players = await getSleeperDraftPicks(draftId);
      const playerIds = players.map((player) => getPlayerId(player));
      const picks = new Set<string>(playerIds.concat(await keeperIds));
      setPicks(picks);
    }

    getAllUnderdogPlayers(setPlayers);
    updatePicks().catch(console.error);
    const updateTimeout = setInterval(() => {
      updatePicks().catch(console.error);
    }, 1000);

    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [draftId, navigate]);

  return (
    <div className="page">
      <div className="nav">
        <button className="back-button" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </button>
      </div>
      <div className="content">
        <SelectionRadio setRankingSelection={setRankingSelection} />
        <Rankings position={rankingSelection} picks={picks} players={players} />
      </div>
    </div>
  );
}
