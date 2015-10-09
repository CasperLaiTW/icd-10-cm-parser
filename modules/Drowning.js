import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Drowning extends Generator {

  static file = path.join(__dirname, '../xls/drowning.xls');
  static output = 'drowning.json';
  static title = '溺水';

  constructor() {
    super(Drowning.file, Drowning.title, Drowning.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      position: firstRow[5],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      position: this.position,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compilePosition();
    this._compileICD();
  }

  _compileMedical() {
    this.medical = this.compile(4);
  }

  _compilePosition() {
    this.position = this.compile(5);
  }

  /**
   * Compile ICD-10-cm data
   * @return void
   */
  _compileICD() {
    let data = new Set();
    _.each(this.rows, (value) => {

      let dest = {
        code: value[1],
        content: value[2],
        medical: _.get(this.medical, value[4]),
        position: _.get(this.position, value[5]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Drowning();