export interface Player {
  firstName: string;
  lastName: string;
  position: string;
  adp?: string;
  positionRank?: string;
}

export enum Position {
  WR = "WR",
  RB = "RB",
  QB = "QB",
  TE = "TE",
  ALL = "ALL",
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
