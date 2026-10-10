export interface Gift {
  id: string;
  name: string;
  weightKg: number;
  priority: number; // 1–5
  photo?: string; // object URL
  emoji?: string; // fallback tile art
}

export interface Airline {
  name: string;
  allowanceKg: number;
  note: string;
}

// Typical economy checked allowances, India–Gulf corridor.
// Always confirm against the e-ticket; fares change the number.
export const AIRLINES: Airline[] = [
  { name: 'Emirates — Saver', allowanceKg: 30, note: 'typical' },
  { name: 'Qatar Airways', allowanceKg: 25, note: 'typical' },
  { name: 'Etihad', allowanceKg: 23, note: 'typical' },
  { name: 'Oman Air', allowanceKg: 30, note: 'typical' },
  { name: 'Air India', allowanceKg: 25, note: 'typical' },
  { name: 'Air India Express', allowanceKg: 20, note: 'typical' },
  { name: 'IndiGo Intl', allowanceKg: 20, note: 'typical' },
  { name: 'SpiceJet Intl', allowanceKg: 20, note: 'typical' },
];

let seq = 0;
export function makeGift(
  name: string,
  weightKg: number,
  priority: number,
  emoji?: string,
): Gift {
  return { id: `g${Date.now()}-${seq++}`, name, weightKg, priority, emoji };
}

// Booth-ready demo list: totals ~23 kg against the 20 kg default,
// so the algorithm visibly cuts the lowest-priority density items.
export function demoGifts(): Gift[] {
  return [
    makeGift('Medjool dates', 2.0, 5, '🌴'),
    makeGift('Spice box', 1.5, 5, '🌶️'),
    makeGift('Perfume', 0.5, 4, '🧴'),
    makeGift('Chocolates', 1.0, 4, '🍫'),
    makeGift('Dry fruits', 1.0, 4, '🥜'),
    makeGift('Abaya', 1.2, 3, '🥻'),
    makeGift('Mixer grinder', 5.0, 3, '🔌'),
    makeGift('Kids toys', 0.8, 3, '🧸'),
    makeGift('Rice cooker', 4.0, 2, '🍚'),
    makeGift('Steel dinner set', 6.0, 2, '🍽️'),
  ];
}

export function suggest(g: Gift): string {
  if (g.weightKg <= 2) return 'Light enough for carry-on?';
  if (g.weightKg <= 5) return 'Ship separately or gift on arrival?';
  return 'Buy this in Kerala instead?';
}
