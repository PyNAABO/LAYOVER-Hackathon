import type { Gift } from './data';

export interface PackResult {
  packed: Gift[];
  leftOut: Gift[];
  totalKg: number;
  /** True when user-pinned gifts alone exceed the limit. */
  overLimit: boolean;
}

// Plain 0/1 knapsack: maximize priority under a weight cap.
// Weights in 100 g integer units; ties prefer the lighter set.
function knapsack(gifts: Gift[], limitKg: number): { packed: Gift[]; leftOut: Gift[] } {
  const W = Math.max(0, Math.round(limitKg * 10));
  const n = gifts.length;
  const w = gifts.map((g) => Math.max(0, Math.round(g.weightKg * 10)));
  const v = gifts.map((g, i) => g.priority * 100000 - w[i]);

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(W + 1).fill(0),
  );
  for (let i = 1; i <= n; i++) {
    for (let c = 0; c <= W; c++) {
      dp[i][c] = dp[i - 1][c];
      if (w[i - 1] <= c) {
        const take = dp[i - 1][c - w[i - 1]] + v[i - 1];
        if (take > dp[i][c]) dp[i][c] = take;
      }
    }
  }

  const packed: Gift[] = [];
  const leftOut: Gift[] = [];
  let c = W;
  for (let i = n; i >= 1; i--) {
    if (dp[i][c] !== dp[i - 1][c]) {
      packed.unshift(gifts[i - 1]);
      c -= w[i - 1];
    } else {
      leftOut.unshift(gifts[i - 1]);
    }
  }
  return { packed, leftOut };
}

/**
 * Pack the bag. Gifts flagged `forced` (the user tapped "Put in bag") are
 * always included and are removed from the pool before the DP runs, so the
 * algorithm fills whatever room is left with the best remaining items.
 */
export function pack(gifts: Gift[], limitKg: number): PackResult {
  // Excluded gifts are out of the running entirely — no room in the bag, no
  // matter how low their importance. Without this the user can only remove a
  // gift by deleting it, which loses their data.
  const excluded = gifts.filter((g) => g.excluded);
  const forced = gifts.filter((g) => g.forced && !g.excluded);
  const rest = gifts.filter((g) => !g.forced && !g.excluded);
  const forcedKg = forced.reduce((s, g) => s + g.weightKg, 0);

  // Always run the DP on the remaining room, even when that room is zero.
  // Short-circuiting here would make unpinning useless while over the limit:
  // freeing space has to refill the bag automatically, otherwise the user
  // must unpin several times before the total visibly moves.
  const { packed: auto, leftOut } = knapsack(
    rest,
    Math.max(0, limitKg - forcedKg),
  );
  const packed = [...forced, ...auto];
  const totalKg = packed.reduce((s, g) => s + g.weightKg, 0);
  return {
    packed,
    leftOut: [...leftOut, ...excluded],
    totalKg,
    overLimit: totalKg > limitKg,
  };
}

/**
 * What must leave the bag for `gift` to fit, given it is being forced in?
 * Evicts the cheapest weight among currently-packed, non-forced gifts.
 */
export function planForceIn(
  packed: Gift[],
  gift: Gift,
  limitKg: number,
): { evicts: Gift[] } {
  const currentKg = packed.reduce((s, g) => s + g.weightKg, 0);
  let over = currentKg + gift.weightKg - limitKg;
  if (over <= 0) return { evicts: [] };

  const pool = packed
    .filter((g) => !g.forced)
    .sort((a, b) => a.priority - b.priority || b.weightKg - a.weightKg);

  const evicts: Gift[] = [];
  for (const g of pool) {
    if (over <= 0) break;
    evicts.push(g);
    over -= g.weightKg;
  }
  return { evicts };
}