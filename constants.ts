import { ProposalData } from "./types";

export const INITIAL_DATA: ProposalData = {
  client: { name: "Kelly", age: 43 },
  planName: "環宇盈活儲蓄計劃",
  premium: { total: 130000, paymentType: "整付" },
  scenarioA: {
    year10: { surrender: 212742, death: 224442 },
    year20: { surrender: 420929, death: 438187 },
    year30: { surrender: 859852, death: 859852 },
  },
  scenarioB: {
    annualWithdrawal: 7800,
    year10: { cumulative: 62400, remaining: 145500 },
    year20: { cumulative: 140400, remaining: 152851 },
    year30: { cumulative: 218400, remaining: 206123 },
    year40: { cumulative: 296400, remaining: 281854 },
  },
  promo: {
    lumpSum: { enabled: true, percent: 2 },
    fiveYear: { enabled: true, percent: 10 },
    prepay: { enabled: true, rate: 3.8, deadline: "2025-01-31" },
  },
};

export const SYSTEM_INSTRUCTION = ``; // Deprecated but kept for file structure consistency if needed
