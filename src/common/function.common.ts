import {PhaseEnum} from "../enums/phase.enum";

export class FunctionCommon {
  public static handleAmountPaginationItems(screenWidth: number): number {
    if (screenWidth < 1250 && screenWidth >= 520) {
      return 7;
    }
    if (screenWidth < 520 && screenWidth >= 400) {
      return 3;
    }
    if (screenWidth < 400) {
      return 2;
    }
    return 10;
  }

  public static translatePhaseEnum(phase: string): string {
    return <string>new Map<string, string>([
      [PhaseEnum.DRAFT, 'Minuta'],
      [PhaseEnum.ACTIVE, 'Vigente'],
      [PhaseEnum.OBSOLETE, 'Obsoleto']
    ]).get(phase);
  }
}

export module Strings {
  export function isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}
