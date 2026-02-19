import { inMemoryStore } from "./inMemoryStore";
import {
  DisproportionalIncrease,
  PeriodComparison,
  PeriodTotals,
  ProcessedSummary,
} from "../utils/types";
import {
  calculateGrowthPercentage,
  comparePeriods,
  isPeriodInRange,
} from "../utils/period";

function buildProcessedSummary(from: string, to: string): ProcessedSummary {
  const costs = inMemoryStore
    .getCosts()
    .filter((item) => isPeriodInRange(item.periodo, from, to));
  const volumeMap = inMemoryStore.getVolumes();

  const periodAggregation = new Map<string, PeriodTotals>();
  const categoryTotals: Record<string, number> = {};

  for (const item of costs) {
    const existing = periodAggregation.get(item.periodo) ?? {
      periodo: item.periodo,
      totalCusto: 0,
      totalPorCategoria: {},
    };

    existing.totalCusto += item.valor;
    existing.totalPorCategoria[item.categoria] =
      (existing.totalPorCategoria[item.categoria] ?? 0) + item.valor;

    categoryTotals[item.categoria] =
      (categoryTotals[item.categoria] ?? 0) + item.valor;

    periodAggregation.set(item.periodo, existing);
  }

  const periods = [...periodAggregation.values()].sort((a, b) =>
    comparePeriods(a.periodo, b.periodo),
  );

  for (const period of periods) {
    const volume = volumeMap.get(period.periodo);
    if (typeof volume === "number") {
      period.volume = volume;
      period.custoPorUnidade = volume > 0 ? period.totalCusto / volume : undefined;
    }
  }

  const comparisons: PeriodComparison[] = [];
  const disproportionalIncreases: DisproportionalIncrease[] = [];

  for (let index = 1; index < periods.length; index += 1) {
    const previous = periods[index - 1];
    const current = periods[index];

    const costGrowth = calculateGrowthPercentage(
      previous.totalCusto,
      current.totalCusto,
    );

    const comparison: PeriodComparison = {
      periodoAnterior: previous.periodo,
      periodoAtual: current.periodo,
      crescimentoCustoPercentual: costGrowth,
    };

    if (
      typeof previous.volume === "number" &&
      typeof current.volume === "number"
    ) {
      const volumeGrowth = calculateGrowthPercentage(previous.volume, current.volume);
      comparison.crescimentoVolumePercentual = volumeGrowth;

      if (
        typeof previous.custoPorUnidade === "number" &&
        typeof current.custoPorUnidade === "number"
      ) {
        comparison.crescimentoCustoPorUnidadePercentual = calculateGrowthPercentage(
          previous.custoPorUnidade,
          current.custoPorUnidade,
        );
      }

      const difference = costGrowth - volumeGrowth;
      if (costGrowth > 10 && difference >= 20) {
        disproportionalIncreases.push({
          periodo: current.periodo,
          crescimentoCustoPercentual: costGrowth,
          crescimentoVolumePercentual: volumeGrowth,
          diferencaPercentual: difference,
        });
      }
    }

    comparisons.push(comparison);
  }

  const totalGeral = periods.reduce((acc, item) => acc + item.totalCusto, 0);
  const events = inMemoryStore
    .getEvents()
    .filter((item) => item.data.slice(0, 7) >= from && item.data.slice(0, 7) <= to);

  return {
    intervalo: { from, to },
    periodos: periods,
    totalGeralNoIntervalo: totalGeral,
    totaisPorCategoriaNoIntervalo: categoryTotals,
    comparacoes: comparisons,
    aumentosDesproporcionais: disproportionalIncreases,
    eventosRelacionados: events,
  };
}

export { buildProcessedSummary };
