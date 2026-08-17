import { parse, ParseResult } from "papaparse";
import { Player } from "./player";

interface NffcPlayer {
  ADP: string;
  Player: string;
  "Position(s)": string;
}

export function getAllNffcPlayers(): Promise<Player[]> {
  return new Promise((res, _rej) => {
    parse("/data/nffc-rankings.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<NffcPlayer>) => {
        const nffcPlayers = results.data;
        const players = nffcPlayers
          .map(nffcPlayerToPlayer)
          .filter((p: Player) => {
            return p.position !== "TDSP" && p.position !== "TK";
          });
        res(players);
      },
    });
  });
}

function nffcPlayerToPlayer(p: NffcPlayer): Player {
  const [lastName, firstName] = p.Player.split(",");
  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    position: p["Position(s)"],
    nffcAdp: p.ADP,
  };
}
