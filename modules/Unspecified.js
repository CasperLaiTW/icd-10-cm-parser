import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Unspecified extends Generator {

  static file = path.join(__dirname, '../xls/unspecified.xls');
  static output = 'unspecified.json';
  static title = '意圖不明';

  constructor() {
    super(Unspecified.file, Unspecified.title, Unspecified.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      reason: firstRow[5],
      reasonDetail: firstRow[6],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      reason: this.reason,
      reasonDetail: this.reasonDetail,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileReason();
    this._compileReasonDetail();
    this._compileICD();
  }

  _compileMedical() {
    this.medical = this.compile(4);
  }

  _compileReason() {
    this.reason = this.compile(5);
  }

  _compileReasonDetail() {
    this.reasonDetail = this.compile(6)
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
        reason: _.get(this.reason, value[5]),
        reasonDetail: _.get(this.reasonDetail, value[6]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Unspecified();