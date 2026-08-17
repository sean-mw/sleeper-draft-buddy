import { Player } from "./player";

export type SortFn = typeof sortByUnderdogAdp | typeof sortByNffcAdp;

export type SortKey = "nffc" | "underdog";

export const adpSortLabels = new Map<SortKey, string>([
  ["underdog", "Underdog ADP"],
  ["nffc", "NFFC ADP"],
]);

export const sortFns = new Map<SortKey, SortFn>([
  ["underdog", sortByUnderdogAdp],
  ["nffc", sortByNffcAdp],
]);

export function sortByUnderdogAdp(a: Player, b: Player): number {
  if (!a || !b || a.underdogAdp == undefined || b.underdogAdp == undefined) {
    return 0;
  }
  return parseFloat(a.underdogAdp) - parseFloat(b.underdogAdp);
}

export function sortByNffcAdp(a: Player, b: Player): number {
  if (!a || !b || a.nffcAdp == undefined || b.nffcAdp == undefined) {
    return 0;
  }
  return parseFloat(a.nffcAdp) - parseFloat(b.nffcAdp);
}

export function toggleSortKey(prev: SortKey): SortKey {
  if (prev === "underdog") {
    return "nffc";
  }
  return "underdog";
}

export function getPositionRankBySortKey(key: SortKey, p: Player) {
  if (key === "underdog") {
    return p.underdogPositionRank;
  }
  return p.nffcPositionRank;
}
