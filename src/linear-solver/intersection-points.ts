import { Point, RestrictionPair, RestrictionsMatrix } from "./types";

export function getIntersections(
  restrictionsMatrix: RestrictionsMatrix
): Point[] {
  const points: Point[] = [];

  for (let i = 0; i < restrictionsMatrix.length; i++) {
    for (let j = i + 1; j < restrictionsMatrix.length; j++) {
      const restriction1 = restrictionsMatrix[i];
      const restriction2 = restrictionsMatrix[j];

      const point = getIntersectionPoint({ restriction1, restriction2 });

      if (point !== null) {
        points.push(point);
      }
    }
  }

  return points;
}

function getIntersectionPoint(restrictionPair: RestrictionPair): Point {
  const det = getMatrixDeterminant([
    [restrictionPair.restriction1[0], restrictionPair.restriction1[1]],
    [restrictionPair.restriction2[0], restrictionPair.restriction2[1]],
  ]);

  const detX = getMatrixDeterminant([
    [restrictionPair.restriction1[2], restrictionPair.restriction1[1]],
    [restrictionPair.restriction2[2], restrictionPair.restriction2[1]],
  ]);

  const detY = getMatrixDeterminant([
    [restrictionPair.restriction1[0], restrictionPair.restriction1[2]],
    [restrictionPair.restriction2[0], restrictionPair.restriction2[2]],
  ]);

  if (det === 0) {
    return null;
  }

  const x = detX / det;
  const y = detY / det;

  return [x, y];
}

function getMatrixDeterminant(matrix: number[][]) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}
