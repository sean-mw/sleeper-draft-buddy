import { Player } from "./player";

const SLEEPER_API = "https://api.sleeper.app/v1";

interface PlayerResponseObject {
  metadata: {
    first_name: string;
    last_name: string;
    position: string;
  };
}

interface SleeperPlayer {
  first_name: string;
  last_name: string;
  position: string;
}

const sleeperPlayers = fetch(SLEEPER_API + "/players/nfl").then((response) => {
  if (!response.ok) throw new Error("Failed to fetch sleeper players.");
  return response.json().then((responseJson) => {
    return responseJson as { [key: string]: SleeperPlayer };
  });
});

export async function getSleeperDraftPicks(draftId: string): Promise<Player[]> {
  if (draftId === "") return [];

  const response = await fetch(SLEEPER_API + `/draft/${draftId}/picks`);
  if (!response.ok) return [];

  const playerResponseObjects =
    (await response.json()) as PlayerResponseObject[];
  return playerResponseObjects.map((p) => {
    return {
      firstName: p.metadata.first_name,
      lastName: p.metadata.last_name,
      position: p.metadata.position,
    };
  });
}

export async function getSleeperLeagueId(draftId: string): Promise<string> {
  const response = await fetch(SLEEPER_API + `/draft/${draftId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch draft info for draftId ${draftId}`);
  }
  return response.json().then((draft: { league_id: string }) => {
    return draft.league_id;
  });
}

export async function getSleeperKeepers(leagueId: string): Promise<Player[]> {
  const response = await fetch(SLEEPER_API + `/league/${leagueId}/rosters`);
  if (!response.ok) {
    throw new Error(`Failed to fetch league rosters for leagueId ${leagueId}`);
  }
  const keeperIds: string[] = await response
    .json()
    .then((rosters: { keepers: string[] }[]) => {
      let ids: string[] = [];
      for (const roster of rosters) {
        if (roster.keepers === null) continue;
        ids = ids.concat(roster.keepers);
      }
      return ids;
    });

  return Promise.all(
    keeperIds.map((id) => {
      return getSleeperPlayer(id);
    }),
  );
}

export async function isValidDraftId(draftId: string): Promise<boolean> {
  const response = await fetch(SLEEPER_API + `/draft/${draftId}`);
  return response.status === 200;
}

async function getSleeperPlayer(playerId: string): Promise<Player> {
  const sleeperPlayer = (await sleeperPlayers)[playerId];
  if (sleeperPlayer == undefined) {
    throw new Error(`Player with sleeper id ${playerId} does not exist.`);
  }
  return {
    firstName: sleeperPlayer.first_name,
    lastName: sleeperPlayer.last_name,
    position: sleeperPlayer.position,
  };
}
