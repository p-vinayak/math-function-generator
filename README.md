# Math Function Generator

Math Function Generator is a Typescript library that can be used to generate various types of math functions (E.g. Linear, Quadratic, Trigonometric) with random coefficient and constant values.

## Installation

```bash
npm install math-function-generator
```

## Usage

### Without Options

```ts
import { LinearFunctionGenerator, MathFunction } from 'math-function-generator';

const linearGenerator: LinearFunctionGenerator = new LinearFunctionGenerator();
const randomLinearFunction: MathFunction = linearGenerator.generate();
```

### With Options

```ts
import { QuadraticFunctionGenerator, MathFunction } from 'math-function-generator';

const quadraticGenerator: QuadraticFunctionGenerator = new QuadraticFunctionGenerator();
const randomQuadraticFunction: MathFunction = quadraticGenerator.generate({
    format: 'vertex',
    randRange: { min: 2, max: 20 },
});
```

## Authors

-   [Vinayak Prataap](https://p-vinayak.dev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
