import { useEffect, useState } from 'react';
import './App.css'
import { PositionRankings } from './PositionRankings';
import { getSleeperDraftPicks } from '../util/sleeper';
import { getAllUnderdogPlayers } from '../util/underdog';
import { Player, getPlayerId } from '../util/player';


function App() {
  const [draftId, setDraftId] = useState("");
  const [picks, setPicks] = useState<Set<string>>(new Set());
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    getAllUnderdogPlayers(setPlayers);
  }, []);

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

  function handleStart(e: React.MouseEvent) {
    e.preventDefault();
    updatePicks();
    setInterval(updatePicks, 5000);
  }

  if (players.length !== 0 && picks.size !== 0) {
    return (
      <div className="rankings">
        <PositionRankings position="WR" picks={picks} players={players} />
        <PositionRankings position="RB" picks={picks} players={players} />
        <PositionRankings position="TE" picks={picks} players={players} />
        <PositionRankings position="QB" picks={picks} players={players} />
      </div>
    );
  } else {
    return (
      <>
        <input
          type="text"
          value={draftId}
          onChange={(e) => setDraftId(e.target.value)}
        />
        <button onClick={handleStart}>Start</button>
      </>
    );
  }
}

export default App
