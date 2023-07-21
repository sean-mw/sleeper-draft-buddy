import { Player } from "./player";

const SLEEPER_API = "https://api.sleeper.app/v1"

interface PlayerResponseObject {
  metadata: {
    first_name: string;
    last_name: string;
    position: string;
  }
}

export async function getSleeperDraftPicks(draftId: string): Promise<Player[]> {
  if (draftId === "") return [];

  const response = await fetch(SLEEPER_API + `/draft/${draftId}/picks`);
  if (!response.ok) return [];

  const playerResponseObjects = await response.json() as PlayerResponseObject[];
  return playerResponseObjects.map((p) => {
    return {
      firstName: p.metadata.first_name,
      lastName: p.metadata.last_name,
      position: p.metadata.position,
    }
  })
}