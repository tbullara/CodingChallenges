"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInterpolator = void 0;
var StringInterpolator = /** @class */ (function () {
    function StringInterpolator(template, variableMap) {
        this.template = template;
        this.variableMap = variableMap;
    }
    StringInterpolator.prototype.interpolateTemplate = function () {
        var _this = this;
        if (!this.template || !this.variableMap)
            throw new Error('Please provide a value for template and variable map');
        var matches = this.template.match(this.getInteriorPattern());
        this.variableMap.forEach(function (value, key) {
            // values can be booleans so truthy check will not work
            if (value === null || value === undefined) {
                throw new Error("No value provided for ".concat(key));
            }
            if (!matches.some(function (match) { return match.includes(key); })) {
                throw new Error("The provided template contains a variable not present in the map. " +
                    "Current template: ".concat(_this.template));
            }
            else {
                _this.substitute(key, value);
            }
            // remove match replaced in template
            matches = matches.filter(function (match) { return !match.includes(key); });
        });
        // if there are any matches left, then the template contained a key not provided in the map
        if (matches.length > 0) {
            throw new Error("The provided template contains a variable not present in the map. " +
                "Current template: ".concat(this.template));
        }
        return this.template;
    };
    StringInterpolator.prototype.substitute = function (key, replacement) {
        if (replacement instanceof Object) {
            replacement = replacement.toString();
        }
        var pattern = this.getPattern(key);
        this.template = this.template.replace(pattern, replacement);
    };
    StringInterpolator.prototype.getPattern = function (variableBetweenBrackets) {
        // match variable name between ${} inclusive
        return new RegExp('\\$\\{' + variableBetweenBrackets + '\\}', 'g');
    };
    StringInterpolator.prototype.getInteriorPattern = function () {
        return new RegExp('\\${(.*?)}', 'g');
    };
    return StringInterpolator;
}());
exports.StringInterpolator = StringInterpolator;
//# sourceMappingURL=stringInterpolator.js.map