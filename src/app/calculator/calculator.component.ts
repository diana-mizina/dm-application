import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MATRIX_OF_FATE_ENUM } from './enums/matrix-of-fate.enum';
import { LIFE_PERIODS_STATE } from './states/life-periods.state';
import { ARKAN_LIST_STATE } from './states/arkan-list.state';
import { LIFE_PERIODS_ENUM } from './enums/life-periods.enum';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskDirective,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    NgClass
  ],
  providers: [
    provideNgxMask()
  ]
})
export class CalculatorComponent {

  // dateControl = new FormControl('30.07.1998', [Validators.required]);
  dateControl = new FormControl('', [Validators.required]);

  lifePeriods: any[] = LIFE_PERIODS_STATE;
  arkanList: any[] = ARKAN_LIST_STATE;
  isSubmit = signal(false);

  submit(): void {
    this.calculateMatrixOfFate(this.dateControl.value!);

    this.setLifePeriodsValues();
    this.calculateLifePeriods();

    this.isSubmit.set(true);
  }

  private setLifePeriodsValues(): void {
    this.lifePeriods.map((lifePeriod: any) => {
      const firstValueIndex = lifePeriod.list.findIndex((item: any) => item.name === LIFE_PERIODS_ENUM.LP_A);
      const secondValueIndex = lifePeriod.list.findIndex((item: any) => item.name === LIFE_PERIODS_ENUM.LP_B);

      switch (lifePeriod.name) {
        case LIFE_PERIODS_ENUM.LP_AF:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.DAY_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MALE_LINE_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_FB:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MALE_LINE_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MONTH_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_BG:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MONTH_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.FEMALE_LINE_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_GC:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.FEMALE_LINE_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.YEAR_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_CY:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.YEAR_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MALE_PHYSICAL_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_YD:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.MALE_PHYSICAL_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.PAST_KARMA_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_DK:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.PAST_KARMA_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.FEMALE_PHYSICAL_ENERGY);
          break;

        case LIFE_PERIODS_ENUM.LP_KA:
          lifePeriod.list[firstValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.FEMALE_PHYSICAL_ENERGY);
          lifePeriod.list[secondValueIndex].value = this.getValueByName(MATRIX_OF_FATE_ENUM.DAY_ENERGY);
          break;

        default:
          break;
      }
    });
  }

  private calculateLifePeriods(): void {
    this.lifePeriods.map((lifePeriod: any) => {
      lifePeriod.list
        .filter((item: any) => !!item.position)
        .map((item: any) => {
          const [firstDepName, secondDepName] = item.dependencies;
          const firstValue = this.getValueByName(firstDepName, lifePeriod.list)!;
          const secondValue = this.getValueByName(secondDepName, lifePeriod.list)!;

          item.value = this.reduceToTwentyTwo(firstValue + secondValue);
        });
    });
  }

  private getValueByName(name: MATRIX_OF_FATE_ENUM, list: any[] = this.arkanList): number | null {
    const index = list.findIndex((item: any) => item.name === name);

    return index !== -1 ? list[index].value : null;
  }

  private setValuByName(name: MATRIX_OF_FATE_ENUM, value: number): void {
    const index = this.arkanList.findIndex((item: any) => item.name === name);

    if (index !== -1) {
      this.arkanList[index].value = value;
    }
  }

  private calculateMatrixOfFate(date: string): void {
    const [day, month, year] = date.split('.').map(Number);

    // 1. Енергія дня народження
    const dayEnergy = this.reduceToTwentyTwo(day);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DAY_ENERGY, dayEnergy);

    // 2. Енергія місяця народження
    const monthEnergy = this.reduceToTwentyTwo(month);
    this.setValuByName(MATRIX_OF_FATE_ENUM.MONTH_ENERGY, monthEnergy);

    // 3. Енергія року народження
    const yearEnergy = this.reduceToTwentyTwo(
      year
        .toString()
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0)
    );
    this.setValuByName(MATRIX_OF_FATE_ENUM.YEAR_ENERGY, yearEnergy);

    // 4. Енергія карми минулого життя
    const pastKarmaEnergy = this.reduceToTwentyTwo(dayEnergy + monthEnergy + yearEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.PAST_KARMA_ENERGY, pastKarmaEnergy);

    // 5. Енергія точки сили (зона комфорту)
    const powerPointEnergy = this.reduceToTwentyTwo(dayEnergy + monthEnergy + yearEnergy + pastKarmaEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.POWER_POINT_ENERGY, powerPointEnergy);

    // 6. Енергії родових ліній
    const maleLineEnergy = this.reduceToTwentyTwo(dayEnergy + monthEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.MALE_LINE_ENERGY, maleLineEnergy);

    const femaleLineEnergy = this.reduceToTwentyTwo(monthEnergy + yearEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.FEMALE_LINE_ENERGY, femaleLineEnergy);

    const malePhysicalEnergy = this.reduceToTwentyTwo(yearEnergy + pastKarmaEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.MALE_PHYSICAL_ENERGY, malePhysicalEnergy);

    const femalePhysicalEnergy = this.reduceToTwentyTwo(dayEnergy + pastKarmaEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.FEMALE_PHYSICAL_ENERGY, femalePhysicalEnergy);

    // 7. Лінії Неба і Землі
    const heavenLineEnergy = this.reduceToTwentyTwo(monthEnergy + pastKarmaEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.HEAVEN_LINE_ENERGY, heavenLineEnergy);

    const earthLineEnergy = this.reduceToTwentyTwo(dayEnergy + yearEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.EARTH_LINE_ENERGY, earthLineEnergy);

    // 8. Призначення для себе
    const destinyForSelf = this.reduceToTwentyTwo(heavenLineEnergy + earthLineEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DESTINY_FOR_SELF, destinyForSelf);

    // 8.1. Призначення для роду
    const destinyForClanMale = this.reduceToTwentyTwo(maleLineEnergy + malePhysicalEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DESTINY_FOR_CLAN_MALE, destinyForClanMale);

    const destinyForClanFemale = this.reduceToTwentyTwo(femaleLineEnergy + femalePhysicalEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DESTINY_FOR_CLAN_FEMALE, destinyForClanFemale);

    const destinyForClan = this.reduceToTwentyTwo(destinyForClanMale + destinyForClanFemale);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DESTINY_FOR_CLAN, destinyForClan);

    // 8.2. Призначення для світу
    const destinyForWorld = this.reduceToTwentyTwo(destinyForSelf + destinyForClan);
    this.setValuByName(MATRIX_OF_FATE_ENUM.DESTINY_FOR_WORLD, destinyForWorld);

    // 9. Зона дитячо-батьківських стосунків
    const parentChildZone = this.reduceToTwentyTwo(dayEnergy + powerPointEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.PARENT_CHILD_ZONE, parentChildZone);

    const parentChildZone1 = this.reduceToTwentyTwo(parentChildZone + dayEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.PARENT_CHILD_ZONE_1, parentChildZone1);

    const parentChildZone2 = this.reduceToTwentyTwo(parentChildZone + powerPointEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.PARENT_CHILD_ZONE_2, parentChildZone2);

    // 10. Кармічний хвіст і грошовий хвіст
    const karmicTail = this.reduceToTwentyTwo(pastKarmaEnergy + powerPointEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.KARMIC_TAIL, karmicTail);

    const karmicProgramTail = this.reduceToTwentyTwo(pastKarmaEnergy + karmicTail);
    this.setValuByName(MATRIX_OF_FATE_ENUM.KARMIC_PROGRAM_TAIL, karmicProgramTail);

    const financialTail = this.reduceToTwentyTwo(powerPointEnergy + yearEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.FINANCIAL_TAIL, financialTail);

    const financialProgramTail = this.reduceToTwentyTwo(yearEnergy + financialTail);
    this.setValuByName(MATRIX_OF_FATE_ENUM.FINANCIAL_PROGRAM_TAIL, financialProgramTail);

    // 11. Точка входу в грошовий канал
    const moneyEntryPoint = this.reduceToTwentyTwo(karmicTail + financialTail);
    this.setValuByName(MATRIX_OF_FATE_ENUM.MONEY_ENTRY_POINT, moneyEntryPoint);

    // 12. Енергія партнерства
    const partnershipEnergy = this.reduceToTwentyTwo(karmicTail + moneyEntryPoint);
    this.setValuByName(MATRIX_OF_FATE_ENUM.PARTNERSHIP_ENERGY, partnershipEnergy);

    const moneyEnergy = this.reduceToTwentyTwo(financialTail + moneyEntryPoint);
    this.setValuByName(MATRIX_OF_FATE_ENUM.MONEY_ENERGY, moneyEnergy);

    // 13. talent zone
    const talentForClan = this.reduceToTwentyTwo(powerPointEnergy + monthEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.TALENT_FOR_CLAN, talentForClan);

    const intermediateTalent = this.reduceToTwentyTwo(talentForClan + monthEnergy);
    this.setValuByName(MATRIX_OF_FATE_ENUM.INTERMEDIATE_TALENT, intermediateTalent);

    // 13. Енергія серця (Анахата)
    const heartEnergy = this.reduceToTwentyTwo(powerPointEnergy + talentForClan);
    this.setValuByName(MATRIX_OF_FATE_ENUM.HEART_ENERGY, heartEnergy);
  }

  private reduceToTwentyTwo(num: any): number {
    while (num > 22) {
      num = num
        .toString()
        .split('')
        .reduce((sum: number, digit: number) => sum + Number(digit), 0);
    }
    return num;
  }
}
