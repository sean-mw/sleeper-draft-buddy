import { useEffect, useState } from 'react';
import './App.css'
import { Rankings } from './Rankings';
import { getSleeperDraftPicks } from '../util/sleeper';
import { getAllUnderdogPlayers } from '../util/underdog';
import { Player, getPlayerId, Position } from '../util/player';
import { SelectionRadio } from './SelectionRadio';

function App() {
  const [draftId, setDraftId] = useState("");
  const [picks, setPicks] = useState<Set<string>>(new Set());
  const [players, setPlayers] = useState<Player[]>([]);
  const [rankingSelection, setRankingSelection] = useState<Position>(
    Position.ALL
  );

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
    setInterval(updatePicks, 1000);
  }


  if (players.length !== 0 && picks.size !== 0) {
    return (
      <>
        <SelectionRadio setRankingSelection={setRankingSelection}/>
        <Rankings
          position={rankingSelection}
          picks={picks}
          players={players}
        />
      </>
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
