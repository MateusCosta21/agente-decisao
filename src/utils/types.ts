export type CostInput = {
  periodo: string;
  categoria: string;
  valor: number;
};

export type VolumeInput = {
  periodo: string;
  volume: number;
};

export type EventInput = {
  evento: string;
  data: string;
  descricao: string;
};

export type PeriodTotals = {
  periodo: string;
  totalCusto: number;
  totalPorCategoria: Record<string, number>;
  volume?: number;
  custoPorUnidade?: number;
};

export type PeriodComparison = {
  periodoAnterior: string;
  periodoAtual: string;
  crescimentoCustoPercentual: number;
  crescimentoVolumePercentual?: number;
  crescimentoCustoPorUnidadePercentual?: number;
};

export type DisproportionalIncrease = {
  periodo: string;
  crescimentoCustoPercentual: number;
  crescimentoVolumePercentual: number;
  diferencaPercentual: number;
};

export type ProcessedSummary = {
  intervalo: {
    from: string;
    to: string;
  };
  periodos: PeriodTotals[];
  totalGeralNoIntervalo: number;
  totaisPorCategoriaNoIntervalo: Record<string, number>;
  comparacoes: PeriodComparison[];
  aumentosDesproporcionais: DisproportionalIncrease[];
  eventosRelacionados: EventInput[];
};

export type AnalysisResult = {
  resumo: string;
  principais_causas: string[];
  pergunta_critica: string;
};
