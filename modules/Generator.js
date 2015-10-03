import fs from 'fs';
import path from 'path';
import json from 'JSON2';
import _ from 'lodash';
import Parser from '../parser';

export default class Generator {

  static dist = '../dist';

  constructor(file, title, output) {
    this.file = file;
    this.title = title;
    this.output = output;
    this.rows = this.getRows();
  }

  getRows () {
    const parser = new Parser(this.file);
    return parser.parse();
  }

  /**
   * Compile data to json
   * @param  int index
   * @return object
   */
  compile(index) {
    let rows = _.uniq(_.pluck(this.rows, index));
    let data = {};
    _.assign(data, rows);
    return _.invert(data);
  }

  make() {
    fs.writeFile(path.join(__dirname, Generator.dist, this.output), json.stringify(this.data), (error) => {
      if (error) {
        console.log('error: ' + error);
        return false;
      }

      console.log(`Compile success. [${this.output}]`);
    });
  }
}