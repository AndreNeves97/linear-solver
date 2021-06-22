export type ObjFunc = [a: number, b: number];
export type Restriction = [a: number, b: number, c: number, symbol: string];
export type RestrictionsMatrix = Restriction[];
export type RestrictionPair = {
  restriction1: Restriction;
  restriction2: Restriction;
};
export type Point = [x: number, y: number];

export const MIN = "min";
export const MAX = "max";

export const LEQ = "<=";
export const GEQ = ">=";
