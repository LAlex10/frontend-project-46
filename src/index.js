import _ from 'lodash';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import getParse from './parser.js';

function getExtension(pathOfFile) {
    const components = pathOfFile.split('.');
    const dataFormat = components.at(-1);
    return dataFormat;
}

const getFileContent = (pathOfFile) => readFileSync(resolve(cwd(), pathOfFile), 'utf-8');


const genDiff = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    const result = keys.map((key) => {
        if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
            return `  + ${key}: ${obj2[key]}`;
        }
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
            return `  - ${key}: ${obj1[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
        }
        return `    ${key}: ${obj1[key]}`;
    });

    return `{\n${result.join('\n')}\n}`;
};

export { getExtension }
export default genDiff