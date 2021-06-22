type ObjFunc = [a: number, b: number];
type Restriction = [a: number, b: number, c: number, symbol: string];
type RestrictionsMatrix = Restriction[];
type RestrictionPair = {
  restriction1: Restriction;
  restriction2: Restriction;
};
type Point = [x: number, y: number];

const MIN = "min";
const MAX = "max";

const LEQ = "<=";
const GEQ = ">=";

solve(
  MIN,
  [8, 10],
  [
    [-1, 1, 2, LEQ],
    [4, 5, 20, GEQ],
    [1, 0, 6, LEQ],
    [0, 1, 4, GEQ],
  ]
);

function solve(
  objective: string,
  objFunc: ObjFunc,
  restrictionsMatrix: RestrictionsMatrix
) {
  restrictionsMatrix = [
    ...restrictionsMatrix,
    [1, 0, 0, ">="],
    [0, 1, 0, ">="],
  ];

  const intersections = getIntersections(restrictionsMatrix);
  const validPoints = filterPointsByRestrictions(
    intersections,
    restrictionsMatrix
  );

  if (validPoints.length === 0) {
    console.log(
      "Não há solução.... Nenhum dos possíveis pontos atendem à todas as restrições"
    );
  }

  const solution = getBestPoint(validPoints, objective, objFunc);

  console.log(
    "Solução ótima encontrada!\n\n  Ponto:",
    solution[0],
    "\n\n  Valor",
    solution[1]
  );
}

function getIntersections(restrictionsMatrix: RestrictionsMatrix): Point[] {
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
