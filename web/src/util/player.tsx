export interface Player {
    firstName: string;
    lastName: string;
    position: string;
    adp?: string;
    positionRank: string;
}

export function getPlayerId(player: Player): string {
    return `${player.firstName}-${player.lastName}-${player.position}`
}