import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Assault extends Generator {

  static file = path.join(__dirname, '../xls/assault.xls');
  static output = 'assault.json';
  static title = '加害';

  constructor() {
    super(Assault.file, Assault.title, Assault.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      form: firstRow[5],
      formDetail: firstRow[6],
      identity: firstRow[7],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      form: this.form,
      formDetail: this.formDetail,
      identity: this.identity,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileForm();
    this._compileFormDetail();
    this._compileIdentity();
    this._compileICD();
  }

  _compileMedical() {
    this.medical = this.compile(4);
  }

  _compileForm() {
    this.form = this.compile(5);
  }

  _compileFormDetail() {
    this.formDetail = this.compile(6)
  }

  _compileIdentity() {
    this.identity = this.compile(7);
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
        form: _.get(this.form, value[5]),
        formDetail: _.get(this.formDetail, value[6]),
        identity: _.get(this.identity, value[7]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Assault();