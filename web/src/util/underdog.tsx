import { parse, ParseResult } from "papaparse";
import { Player } from "./player";

interface UnderdogPlayer {
  adp: string;
  firstName: string;
  lastName: string;
  slotName: string;
  positionRank: string;
}

export function getAllUnderdogPlayers(): Promise<Player[]> {
  return new Promise((res, _rej) => {
    parse("/data/underdog-rankings.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<UnderdogPlayer>) => {
        const underdogPlayers = results.data;
        const players = underdogPlayers.map(underdogPlayerToPlayer);
        res(players);
      },
    });
  });
}

function underdogPlayerToPlayer(p: UnderdogPlayer): Player {
  return {
    firstName: p.firstName,
    lastName: p.lastName,
    position: p.slotName,
    underdogAdp: p.adp,
    underdogPositionRank: p.positionRank.replace(/\D/g, ""),
  };
}
