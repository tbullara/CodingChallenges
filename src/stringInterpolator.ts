export class StringInterpolator {
    readonly template: string;
    readonly variableMap: Map<string, any>;

    constructor(template: string, variableMap: Map<string, any>) {
        this.template = template;
        this.variableMap = variableMap;
    }

    formatData(): string {
        // throw error if template uses a var not assigned in the map
        const templateArray: string[] = this.template.split(' ');

        this.variableMap.forEach((value, key) => {
            const templateKey = '${' + key + '}';
            // includes ensures we have a valid template enclosure
            const indexToReplace = templateArray.findIndex(item => item.includes(templateKey));
            if (indexToReplace === -1) {
                throw new Error(`Key ${key} does not exist in the provided template: ${this.template}`);
            } else if (value === null || value === undefined) {
                throw new Error(`No value provided for ${key}`);
            }
            else {
                templateArray[indexToReplace] = this.substitute(templateArray[indexToReplace], key, value);
            }
        });

        return templateArray.join(' ');
    }

    substitute(variable: string, key: string, replacement: any): string {
        // match key between ${} inclusive
        const pattern = new RegExp('\\$\\{' + key + '\\}', 'g');
        if (replacement instanceof Object) {
            replacement = replacement.toString();
        }
        return variable.replace(pattern, replacement);
    }
}


