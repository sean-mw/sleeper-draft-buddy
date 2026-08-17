import { useEffect, useState } from "react";
import { Rankings } from "../components/Rankings";
import {
  getSleeperDraftPicks,
  getSleeperKeepers,
  getSleeperLeagueId,
  isValidDraftId,
} from "../util/sleeper";
import { Player, getPlayerId, Position, getPlayers } from "../util/player";
import { SelectionRadio } from "../components/SelectionRadio";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./draft.css";
import { SortKey, adpSortLabels, toggleSortKey } from "../util/sort";

export function Draft() {
  const navigate = useNavigate();
  const draftId = useLoaderData() as string;
  const [picks, setPicks] = useState<Set<string>>(new Set());
  const [players, setPlayers] = useState<Player[]>([]);
  const [rankingSelection, setRankingSelection] = useState<Position>(
    Position.ALL,
  );
  const [sortKey, setSortKey] = useState<SortKey>("underdog");

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
        console.error(e);
        return [] as string[];
      });

    async function updatePicks() {
      const players = await getSleeperDraftPicks(draftId);
      const playerIds = players.map((player) => getPlayerId(player));
      const picks = new Set<string>(playerIds.concat(await keeperIds));
      setPicks(picks);
    }

    getPlayers()
      .then((players: Player[]) => setPlayers(players))
      .catch((e) => console.error(e));
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
        <div>
          <SelectionRadio setRankingSelection={setRankingSelection} />
          <button onClick={() => setSortKey(toggleSortKey)}>
            Sort By: {adpSortLabels.get(sortKey) ?? "Unknown"}
          </button>
        </div>
        <Rankings
          position={rankingSelection}
          picks={picks}
          players={players}
          sortKey={sortKey}
        />
      </div>
    </div>
  );
}
