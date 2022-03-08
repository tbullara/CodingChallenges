export class StringInterpolator {
    template: string;
    readonly variableMap: Map<string, any>;

    constructor(template: string, variableMap: Map<string, any>) {
        this.template = template;
        this.variableMap = variableMap;
    }

    interpolateTemplate(): string {
        if (!this.template || !this.variableMap)
            throw new Error('Please provide a value for template and variable map');

        let matches = this.template.match(this.getInteriorPattern());

        this.variableMap.forEach((value, key) => {
            // values can be booleans so truthy check will not work
            if (value === null || value === undefined) {
                throw new Error(`No value provided for ${key}`);
            }

            if (!matches.some(match => match.includes(key))) {
                throw new Error(`The provided template contains a variable not present in the map. ` +
                    `Current template: ${this.template}`);
            } else {
                this.substitute(key, value);
            }

            // remove match replaced in template
            matches = matches.filter(match => !match.includes(key));
        });

        // if there are any matches left, then the template contained a key not provided in the map
        if (matches.length > 0) {
            throw new Error(`The provided template contains a variable not present in the map. ` +
                `Current template: ${this.template}`);
        }

        return this.template;
    }

    private substitute(key: string, replacement: any): void {
        if (replacement instanceof Object) {
            replacement = replacement.toString();
        }

        const pattern = this.getPattern(key);
        this.template = this.template.replace(pattern, replacement);
    }

    private getPattern(variableBetweenBrackets: string): RegExp {
        // match variable name between ${} inclusive
        return new RegExp('\\$\\{' + variableBetweenBrackets + '\\}', 'g');
    }

    private getInteriorPattern(): RegExp {
        return new RegExp('\\${(.*?)}', 'g');
    }
}

