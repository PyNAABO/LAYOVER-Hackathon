import type { Gift } from './data';

export interface PackResult {
  packed: Gift[];
  leftOut: Gift[];
  totalKg: number;
}

// 0/1 knapsack: maximize priority under the weight limit.
// Weights in 100 g integer units; ties prefer the lighter set.
export function pack(gifts: Gift[], limitKg: number): PackResult {
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
  const totalKg = packed.reduce((s, g) => s + g.weightKg, 0);
  return { packed, leftOut, totalKg };
}
