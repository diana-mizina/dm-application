import { LIFE_PERIOD_MODEL } from "../models/life-period.model";
import { LIFE_PERIODS_ENUM } from "../enums/life-periods.enum";

export const LIFE_PERIODS_STATE = [
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_AF, ['f1', 'a4', 'a5', 'a6', 'f2', 'f4', 'f3']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_FB, ['f5', 'f6', 'f7', 'f8', 'b4', 'b6', 'b5']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_BG, ['k1', 'b7', 'b8', 'k2', 'k3', 'k5', 'k4']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_GC, ['c4', 'k7', 'k8', 'k6', 'c5', 'c7', 'c6']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_CY, ['y1', 'y2', 'y3', 'y4', 'y5', 'y7', 'y6']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_YD, ['d4', 'y8', 'd6', 'd5', 'd7', 'd9', 'd8']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_DK, ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7']),
  new LIFE_PERIOD_MODEL(LIFE_PERIODS_ENUM.LP_KA, ['t1', 't2', 't3', 't4', 't5', 't7', 't6'])
];