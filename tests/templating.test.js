"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringInterpolator_1 = require("../src/stringInterpolator");
describe('interpolate simple', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('My name is ${name} and my job is ${job}', new Map([['name', 'tucker'], ['job', 'programmer']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('My name is tucker and my job is programmer');
    });
});
describe('interpolate edge', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('My name is ${name} and my job is ${${job}}', new Map([['name', 'tucker'], ['job', 'programmer']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('My name is tucker and my job is ${programmer}');
    });
});
describe('interpolate edge 2', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('My name is ${name} and my job is ${${${job}}}', new Map([['name', 'tucker'], ['job', 'programmer']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('My name is tucker and my job is ${${programmer}}');
    });
});
describe('interpolate weird', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${${test}${name}}', new Map([['name', 'tucker']]));
        try {
            interpolator.interpolateTemplate();
        }
        catch (error) {
            expect(error.message).toBe('The provided template contains a variable not present in the map. Current template: ${${test}tucker}');
        }
    });
});
describe('interpolate weird 2', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${${}${name}}', new Map([['name', 'tucker'], ['', 'tucker']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('${tuckertucker}');
    });
});
describe('multiple squashed together', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${x}${y}${z}${a}${b}${c}', new Map([['x', 'x'], ['y', 'y'], ['z', 'z'], ['a', 'a'], ['b', 'b'], ['c', 'c']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('xyzabc');
    });
});
describe('multiple same squashed together', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${x}${x}${x}${x}${x}${x}${x}${x}', new Map([['x', 'x']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('xxxxxxxx');
    });
});
describe('multiple in a sentence', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('This ${x} is ${y} a ${z}${a} random ${b} test ${c}', new Map([['x', 'x'], ['y', 'y'], ['z', 'z'], ['a', 'a'], ['b', 'b'], ['c', 'c']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('This x is y a za random b test c');
    });
});
describe('part word part interpolated', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('interp${x}', new Map([['x', 'olater']]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('interpolater');
    });
});
describe('number key', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('Test #${x}', new Map([['x', 10]]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('Test #10');
    });
});
describe('boolean key', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('Test ${x}', new Map([['x', false]]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('Test false');
    });
});
describe('object key', function () {
    var Pair = /** @class */ (function () {
        function Pair(x, y) {
            var _this = this;
            this.toString = function () {
                return "(".concat(_this.x, ", ").concat(_this.y, ")");
            };
            this.x = x;
            this.y = y;
        }
        return Pair;
    }());
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('Test #${x}', new Map([['x', new Pair(1, 2)]]));
        var result = interpolator.interpolateTemplate();
        expect(result).toBe('Test #(1, 2)');
    });
});
describe('Test nonexistent template key error', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${y}', new Map([['x', 'test']]));
        try {
            interpolator.interpolateTemplate();
        }
        catch (error) {
            expect(error.message).toBe('The provided template contains a variable not present in the map. Current template: ${y}');
        }
    });
});
describe('Test nonexistent map variable in template error', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${x} and ${y}', new Map([['x', 'test']]));
        try {
            interpolator.interpolateTemplate();
        }
        catch (error) {
            expect(error.message).toBe('The provided template contains a variable not present in the map. Current template: test and ${y}');
        }
    });
});
describe('Test nonexistent key error', function () {
    it('substitute', function () {
        var interpolator = new stringInterpolator_1.StringInterpolator('${x}', new Map([['x', undefined]]));
        try {
            interpolator.interpolateTemplate();
        }
        catch (error) {
            expect(error.message).toBe('No value provided for x');
        }
    });
});
//# sourceMappingURL=templating.test.js.map