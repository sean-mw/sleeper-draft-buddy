import { Player } from "./player";

export type SortFn = typeof sortByUnderdogAdp | typeof sortByNffcAdp;

export const sortFnLabels = new Map<SortFn, string>([
  [sortByUnderdogAdp, "Underdog ADP"],
  [sortByNffcAdp, "NFFC ADP"],
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

export function toggleSortBy(prev: SortFn): SortFn {
  if (prev === sortByUnderdogAdp) {
    return sortByNffcAdp;
  }
  return sortByUnderdogAdp;
}
