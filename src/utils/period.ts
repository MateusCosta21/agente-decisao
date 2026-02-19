function isValidPeriod(period: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(period);
}

function periodToIndex(period: string): number {
  const [year, month] = period.split("-").map(Number);
  return year * 12 + (month - 1);
}

function isPeriodInRange(period: string, from: string, to: string): boolean {
  const current = periodToIndex(period);
  return current >= periodToIndex(from) && current <= periodToIndex(to);
}

function comparePeriods(a: string, b: string): number {
  return periodToIndex(a) - periodToIndex(b);
}

function calculateGrowthPercentage(previous: number, current: number): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return ((current - previous) / previous) * 100;
}

export {
  isValidPeriod,
  periodToIndex,
  isPeriodInRange,
  comparePeriods,
  calculateGrowthPercentage,
};
