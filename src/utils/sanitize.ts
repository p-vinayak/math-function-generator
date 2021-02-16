import { replace } from 'lodash';

export function sanitizeMathFunctionString(fn: string[]): string[] {
    const sanitizedMathFunctions: string[] = fn;
    sanitizedMathFunctions.map((mathFunction: string, index: number) => {
        sanitizedMathFunctions[index] = sanitize(mathFunction);
    });
    return sanitizedMathFunctions;
}

function sanitize(fn: string): string {
    let sanitizedMathFunction: string = fn;

    sanitizedMathFunction = replaceMinusMinus(sanitizedMathFunction);
    sanitizedMathFunction = replacePlusPlus(sanitizedMathFunction);
    sanitizedMathFunction = replacePlusMinus(sanitizedMathFunction);
    sanitizedMathFunction = replaceMinusPlus(sanitizedMathFunction);
    sanitizedMathFunction = replaceOne(sanitizedMathFunction);

    return sanitizedMathFunction;
}

function replaceMinusPlus(fn: string): string {
    return replace(fn, /\-\040*\+/gim, '- ');
}

function replacePlusMinus(fn: string): string {
    return replace(fn, /\+\040*\-/gim, '- ');
}

function replacePlusPlus(fn: string): string {
    return replace(fn, /\+\040*\+/gim, '+ ');
}

function replaceMinusMinus(fn: string): string {
    return replace(fn, /\-\040*\-/gim, '+ ');
}

function replaceOne(fn: string): string {
    return replace(fn, /1(?=[A-Za-z(])]/gim, '');
}
