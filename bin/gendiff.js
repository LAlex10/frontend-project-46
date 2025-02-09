#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { getExtension, genDiff } from '../src/index.js';
import getParse from '../src/parser.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const absolutePath1 = resolve(cwd(), filePath1);
    const absolutePath2 = resolve(cwd(), filePath2);
    const fileContent1 = readFileSync(absolutePath1, 'utf-8');
    const fileContent2 = readFileSync(absolutePath2, 'utf-8');

    const format1 = getExtension(filePath1);
    const format2 = getExtension(filePath2);

    const data1 = getParse(fileContent1, format1);
    const data2 = getParse(fileContent2, format2);

    console.log(genDiff(data1, data2));
  });
program.parse();
