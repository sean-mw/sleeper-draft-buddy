export interface Player {
    firstName: string;
    lastName: string;
    position: string;
    adp?: string;
    positionRank?: string;
}

export enum Position {
  WR="WR",
  RB="RB",
  QB="QB",
  TE="TE",
  ALL="ALL",
}

export function getPlayerId(player: Player): string {
    return `${player.firstName}-${player.lastName}-${player.position}`
}