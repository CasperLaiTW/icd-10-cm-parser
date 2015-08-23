

import Parser from './parser';
import Generator from './generator';

const parser = new Parser(__dirname + '/data.xls');
let rows = parser.parse();

const generator = new Generator(rows);
generator.generate();
generator.make('./dest/icd.json');