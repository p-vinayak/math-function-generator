import { replace } from 'lodash';

export default function sanitizeEquationVariances(equationVariances: string[]) {
  const sanitizedEquationVariances = equationVariances.map(equation =>
    sanitizeEquation(equation)
  );
  return sanitizedEquationVariances;
}

function sanitizeEquation(equation: string) {
  let sanitizedEquation: string = equation;
  sanitizedEquation = replaceMinusMinus(sanitizedEquation);
  sanitizedEquation = replacePlusPlus(sanitizedEquation);
  sanitizedEquation = replacePlusMinus(sanitizedEquation);
  sanitizedEquation = replaceMinusPlus(sanitizedEquation);
  sanitizedEquation = replaceOne(sanitizedEquation);
  return sanitizedEquation;
}

function replaceMinusPlus(equation: string) {
  return replace(equation, /\-\040*\+/gim, '- ');
}

function replacePlusMinus(equation: string) {
  return replace(equation, /\+\040*\-/gim, '- ');
}

function replacePlusPlus(equation: string) {
  return replace(equation, /\+\040*\+/gim, '+ ');
}

function replaceMinusMinus(equation: string) {
  return replace(equation, /\-\040*\-/gim, '+ ');
}

function replaceOne(equation: string) {
  return replace(equation, /1(?=[A-Za-z(])]/gim, '');
}
