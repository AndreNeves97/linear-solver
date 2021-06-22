import { getIntersections } from "./intersection-points";
import {
  GEQ,
  LEQ,
  Point,
  Restriction,
  RestrictionPair,
  RestrictionsMatrix,
} from "./types";

export function getCandidatePoints(
  restrictionsMatrix: RestrictionsMatrix
): Point[] {
  const intersections = getIntersections(restrictionsMatrix);

  return filterPointsByRestrictions(intersections, restrictionsMatrix);
}

function filterPointsByRestrictions(
  intersections: Point[],
  restrictionsMatrix: RestrictionsMatrix
): Point[] {
  return intersections.filter((point) => {
    return restrictionsMatrix.every((restriction) => {
      return testPointForRestriction(point, restriction);
    });
  });
}

function testPointForRestriction(point: Point, restriction: Restriction) {
  const value = point[0] * restriction[0] + point[1] * restriction[1];

  const symbol = restriction[3];

  if (symbol === LEQ) {
    return value <= restriction[2];
  }

  if (symbol === GEQ) {
    return value >= restriction[2];
  }

  return value === restriction[2];
}
