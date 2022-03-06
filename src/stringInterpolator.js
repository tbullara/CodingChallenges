"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringInterpolator = void 0;
var StringInterpolator = /** @class */ (function () {
    function StringInterpolator(template, variableMap) {
        this.template = template;
        this.variableMap = variableMap;
    }
    // TODO: handle {} or ${
    StringInterpolator.prototype.formatData = function () {
        var _this = this;
        // throw error if template uses a var not assigned in the map
        var templateArray = this.template.split(' ');
        this.variableMap.forEach(function (value, key) {
            var templateKey = '${' + key + '}';
            // includes ensures we have a valid template enclosure
            var indexToReplace = templateArray.findIndex(function (item) { return item.includes(templateKey); });
            if (indexToReplace === -1) {
                throw new Error("Key ".concat(key, " does not exist in the provided template: ").concat(_this.template));
            }
            else if (value === null || value === undefined) {
                throw new Error("No value provided for ".concat(key));
            }
            else {
                templateArray[indexToReplace] = _this.substitute(templateArray[indexToReplace], key, value);
            }
        });
        return templateArray.join(' ');
    };
    StringInterpolator.prototype.substitute = function (variable, key, replacement) {
        // match key between ${} inclusive
        var pattern = new RegExp('\\$\\{' + key + '\\}', 'g');
        if (replacement instanceof Object) {
            replacement = replacement.toString();
        }
        return variable.replace(pattern, replacement);
    };
    return StringInterpolator;
}());
exports.StringInterpolator = StringInterpolator;
//# sourceMappingURL=stringInterpolator.js.map