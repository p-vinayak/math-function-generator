# Math Function Generator

Math Function Generator is a Typescript library that can be used to generate various types of math functions (E.g. Linear, Quadratic, Trigonometric) with random coefficient and constant values.

# Installation

```
npm install math-function-generator

OR

yarn add math-function-generator
```

# Usage

```typescript
import { LinearFunction, QuadraticFunction } from 'math-function-generator';

const randomLinearEquations = new LinearFunction().getEquations();
const randomQuadraticEquations = new QuadraticFunction({
  subType: 'vertex',
  randRange: { min: 2, max: 10 },
}).getEquations();
```

# Authors

- [Vinayak Prataap](https://github.com/p-vinayak)

# License

[MIT](https://choosealicense.com/licenses/mit/)
