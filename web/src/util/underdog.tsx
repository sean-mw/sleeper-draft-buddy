import { parse, ParseResult } from 'papaparse';
import { Player } from './player';

interface UnderdogPlayer {
  adp: string;
  firstName: string;
  lastName: string;
  slotName: string;
  positionRank: string;
}

export function getAllUnderdogPlayers(setPlayers: React.Dispatch<React.SetStateAction<Player[]>>) {
  parse("/data/rankings.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
    delimiter: ",",
    complete: (results: ParseResult<UnderdogPlayer>) => {
      const players = results.data.map((p: UnderdogPlayer) => {
        return {
          firstName: p.firstName,
          lastName: p.lastName,
          position: p.slotName,
          adp: p.adp,
          positionRank: p.positionRank.replace(/\D/g,''),
        }
      });
      setPlayers(players);
    },
  });
}