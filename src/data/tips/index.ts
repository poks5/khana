
import { TipCategory } from './types';
import { hyperkalemiaTips } from './hyperkalemia';
import { hyperphosphatemiaTips } from './hyperphosphatemia';
import { combinedTips } from './combined';
import { proteinTips } from './protein';
import { fluidTips } from './fluid';
import { riceGuideTips } from './rice';
import { tarkariSafetyTips } from './tarkari';
import { acharSafetyTips } from './achar';

export const tipCategories: TipCategory[] = [
  hyperkalemiaTips,
  hyperphosphatemiaTips,
  combinedTips,
  proteinTips,
  fluidTips,
  riceGuideTips,
  tarkariSafetyTips,
  acharSafetyTips
];

// Re-export types for backward compatibility
export type { ClinicalTip, TipCategory } from './types';
