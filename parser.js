import Excel from 'node-xlsx';
import _ from 'lodash';

export default class parser {
  constructor (filename) {
    this.filename = filename;
  }

  parse() {
    const obj = Excel.parse(this.filename);
    obj[0].data.shift();
    return obj[0].data;
  }
}
