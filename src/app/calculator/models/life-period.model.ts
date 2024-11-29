import { LIFE_PERIODS_ENUM } from "../enums/life-periods.enum";

export class LIFE_PERIOD_MODEL {
  name = LIFE_PERIODS_ENUM.LP_AF;

  list = [
    {
      name: LIFE_PERIODS_ENUM.LP_A,
      value: null
    },
    {
      name: LIFE_PERIODS_ENUM.LP_B,
      value: null
    },
    {
      name: LIFE_PERIODS_ENUM.LP_1,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_A,
        LIFE_PERIODS_ENUM.LP_B
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_2,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_A,
        LIFE_PERIODS_ENUM.LP_1
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_3,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_A,
        LIFE_PERIODS_ENUM.LP_2
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_4,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_1,
        LIFE_PERIODS_ENUM.LP_2
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_5,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_B,
        LIFE_PERIODS_ENUM.LP_1
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_6,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_B,
        LIFE_PERIODS_ENUM.LP_5
      ]
    },
    {
      name: LIFE_PERIODS_ENUM.LP_7,
      position: null,
      value: null,
      dependencies: [
        LIFE_PERIODS_ENUM.LP_1,
        LIFE_PERIODS_ENUM.LP_5
      ]
    },
  ];

  constructor(name: LIFE_PERIODS_ENUM, positionList: string[]) {
    this.name = name;

    this.list
      .filter((item: any) => item.position === null)
      .map((item: any, index: number) => item.position = positionList[index]);
  }
}