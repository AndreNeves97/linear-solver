import { getCandidatePoints } from "../linear-solver/candidate-points";
import {
  GEQ,
  LEQ,
  MAX,
  MIN,
  ObjFunc,
  Point,
  RestrictionsMatrix,
} from "../linear-solver/types";

export function solve(
  objective: string,
  objFunc: ObjFunc,
  restrictionsMatrix: RestrictionsMatrix
) {
  restrictionsMatrix = [
    ...restrictionsMatrix,
    [1, 0, 0, ">="],
    [0, 1, 0, ">="],
  ];

  const candidatePoints = getCandidatePoints(restrictionsMatrix);

  if (candidatePoints.length === 0) {
    console.log(
      "Não há solução.... Nenhum dos possíveis pontos atendem à todas as restrições"
    );
  }

  const solution = getBestPoint(candidatePoints, objective, objFunc);

  console.log(
    "Solução ótima encontrada!\n\n  Ponto:",
    solution[0],
    "\n\n  Valor",
    solution[1]
  );
}

function getBestPoint(
  points: Point[],
  objective: string,
  objFunc: ObjFunc
): [Point, number] {
  let solution = null;

  points.forEach((point) => {
    const value = point[0] * objFunc[0] + point[1] * objFunc[1];

    if (solution === null) {
      solution = [point, value];
      return;
    }

    if (objective == MAX && value >= solution[1]) {
      solution = [point, value];
    }

    if (objective == MIN && value <= solution[1]) {
      solution = [point, value];
    }
  });

  return solution;
}
