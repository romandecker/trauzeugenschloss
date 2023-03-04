import { createContext, useContext } from "react";

export type SolutionContextProps = [
  firstDigit: null | number,
  secondDigit: null | number,
  thirdDigit: null | number
];

export const SolutionContext = createContext<SolutionContextProps>([null, null, null]);

export function useSolution() {
  return useContext(SolutionContext);
}
