import {StringInterpolator} from "../src/stringInterpolator";

describe('interpolate simple', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('My name is ${name} and my job is ${job}',
            new Map<string, string>([['name', 'tucker'], ['job', 'programmer']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'My name is tucker and my job is programmer');
    })
})

describe('interpolate edge', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('My name is ${name} and my job is ${${job}}',
            new Map<string, string>([['name', 'tucker'], ['job', 'programmer']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'My name is tucker and my job is ${programmer}');
    })
})

describe('interpolate edge 2', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('My name is ${name} and my job is ${${${job}}}',
            new Map<string, string>([['name', 'tucker'], ['job', 'programmer']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'My name is tucker and my job is ${${programmer}}');
    })
})

describe('interpolate weird', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('${${}${name}}',
            new Map<string, string>([['name', 'tucker']]));
        const result = interpolator.formatData();
        expect(result).toBe( '${${}tucker}');
    })
})


describe('interpolate weird 2', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('${${}${name}}',
            new Map<string, string>([['name', 'tucker'], ['', 'tucker']]));
        const result = interpolator.formatData();
        expect(result).toBe( '${tuckertucker}');
    })
})

describe('multiple squashed together', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('${x}${y}${z}${a}${b}${c}',
            new Map<string, string>([['x', 'x'], ['y', 'y'], ['z', 'z'], ['a', 'a'], ['b', 'b'], ['c', 'c']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'xyzabc');
    })
})

describe('multiple in a sentence', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('This ${x} is ${y} a ${z}${a} random ${b} test ${c}',
            new Map<string, string>([['x', 'x'], ['y', 'y'], ['z', 'z'], ['a', 'a'], ['b', 'b'], ['c', 'c']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'This x is y a za random b test c');
    })
})

describe('part word part interpolated', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('interp${x}',
            new Map<string, string>([['x', 'olater']]));
        const result = interpolator.formatData();
        expect(result).toBe( 'interpolater');
    })
})

describe('number key', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('Test #${x}',
            new Map<string, number>([['x', 10]]));
        const result = interpolator.formatData();
        expect(result).toBe( 'Test #10');
    })
})

describe('object key', () => {
    class Pair {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        toString = () : string => {
            return `(${this.x}, ${this.y})`;
        }
    }
    it('substitute', () => {
        const interpolator = new StringInterpolator('Test #${x}',
            new Map<string, object>([['x', new Pair(1, 2)]]));
        const result = interpolator.formatData();
        expect(result).toBe('Test #(1, 2)');
    })
})

describe('Test nonexistent template key error', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('${y}',
            new Map<string, string>([['x', 'test']]));
        try {
            interpolator.formatData();
        } catch(error) {
            expect(error.message).toBe('Key x does not exist in the provided template: ${y}');
        }
    })
})


describe('Test nonexistent key error', () => {
    it('substitute', () => {
        const interpolator = new StringInterpolator('${x}',
            new Map<string, string>([['x', undefined]]));
        try {
            interpolator.formatData();
        } catch(error) {
            expect(error.message).toBe('No value provided for x');
        }
    })
})