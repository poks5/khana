
import { RiceProfile } from "@/types/rice";
import { whiteRiceVarieties } from "./rice/whiteRice";
import { coloredRiceVarieties } from "./rice/coloredRice";
import { processedRiceVarieties } from "./rice/processedRice";

export type { RiceProfile } from "@/types/rice";

export const nepaliRice: RiceProfile[] = [
  ...whiteRiceVarieties,
  ...coloredRiceVarieties,
  ...processedRiceVarieties
];
