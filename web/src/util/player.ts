import { getAllNffcPlayers } from "./nffc";
import { getAllUnderdogPlayers } from "./underdog";

export interface Player {
  firstName: string;
  lastName: string;
  position: string;
  underdogPositionRank?: string;
  nffcPositionRank?: string;
  underdogAdp?: string;
  nffcAdp?: string;
}

export enum Position {
  WR = "WR",
  RB = "RB",
  QB = "QB",
  TE = "TE",
  ALL = "ALL",
}

export function isPosition(value: string): value is Position {
  return Object.values(Position).includes(value as Position);
}

function cleanString(s: string): string {
  return s.replace(/[^A-Za-z]/g, "").toLowerCase();
}

export function getPlayerId(player: Player): string {
  const first = cleanString(player.firstName);
  const last = cleanString(player.lastName.split(" ")[0]);
  const pos = cleanString(player.position);
  return `${first}-${last}-${pos}`;
}

export async function getPlayers(): Promise<Player[]> {
  const underdogPlayers = await getAllUnderdogPlayers();
  const nffcPlayers = await getAllNffcPlayers();

  const players: Map<string, Player> = new Map();
  underdogPlayers.forEach((p) => players.set(getPlayerId(p), p));
  nffcPlayers.forEach((p) => {
    const playerId = getPlayerId(p);
    const curPlayer = players.get(playerId);
    if (!curPlayer) {
      console.warn("nffc/underdog mismatch - underdog is missing player:", p);
      return;
    }
    curPlayer.nffcAdp = p.nffcAdp;
    curPlayer.nffcPositionRank = p.nffcPositionRank;
    players.set(playerId, curPlayer);
  });

  return Array.from(players.values());
}
