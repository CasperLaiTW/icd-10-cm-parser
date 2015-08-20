import Parser from './parser';

const parser = new Parser(__dirname + '/data.xls');
let rows = parser.parse();
