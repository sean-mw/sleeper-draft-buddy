import { ratioToGreenRedColor, rgbaToString } from "../util/color";
import { Player, Position, getPlayerId } from "../util/player";
import "./Rankings.css";

interface RankingsProps {
  position: Position;
  picks: Set<string>;
  players: Player[];
}

const PLAYER_LIMIT = 10;

const positionRankLimit = new Map([
  ["QB", 18],
  ["TE", 18],
  ["WR", 48],
  ["RB", 48],
]);

function playerAlreadyPicked(player: Player, picks: Set<string>) {
  return picks.has(getPlayerId(player));
}

export function Rankings(props: RankingsProps) {
  const players = [];
  for (const player of props.players) {
    if (players.length === PLAYER_LIMIT) break;
    const correctPosition = player.position === props.position;
    const picked = playerAlreadyPicked(player, props.picks);
    if (!correctPosition || picked) continue;
    players.push(player);
  }

  if (props.position === Position.ALL) {
    return (
      <div className="ALL">
        <Rankings
          position={Position.WR}
          picks={props.picks}
          players={props.players}
        />
        <Rankings
          position={Position.RB}
          picks={props.picks}
          players={props.players}
        />
        <Rankings
          position={Position.TE}
          picks={props.picks}
          players={props.players}
        />
        <Rankings
          position={Position.QB}
          picks={props.picks}
          players={props.players}
        />
      </div>
    );
  }

  return (
    <>
      <ul>
        {players.map((player: Player, i: number) => {
          const rankLimit = positionRankLimit.get(props.position) ?? 1;
          const rankRatio = Math.min(
            Number(player.positionRank) / rankLimit,
            1,
          );
          const color = ratioToGreenRedColor(rankRatio);
          color.a = 0.5;
          const backgroundStyle = rgbaToString(color);

          return (
            <li
              style={{ background: backgroundStyle }}
              key={`${i}-${getPlayerId(player)}`}
            >
              [{props.position}
              {player.positionRank}] {player.firstName} {player.lastName} (ADP:{" "}
              {player.adp})
            </li>
          );
        })}
      </ul>
    </>
  );
}
