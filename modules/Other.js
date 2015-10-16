import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Other extends Generator {

  static file = path.join(__dirname, '../xls/other.xls');
  static output = 'other.json';
  static title = '其他事故傷害';

  constructor() {
    super(Other.file, Other.title, Other.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[5],
      type: firstRow[6],
      reason: firstRow[7],
      reasonDetail: firstRow[8],
      secondLevelOfReason: firstRow[9],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      type: this.type,
      reason: this.reason,
      reasonDetail: this.reasonDetail,
      secondLevelOfReason: this.secondLevelOfReason,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileType();
    this._compileReason();
    this._compileReasonDetail();
    this._compileSecondLevelOfReason();
    this._compileICD();
  }

  _compileMedical() {
    this.medical = this.compile(5);
  }

  _compileType() {
    this.medical = this.compile(6);
  }

  _compileReason() {
    this.reason = this.compile(7);
  }

  _compileReasonDetail() {
    this.reasonDetail = this.compile(8)
  }

  _compileSecondLevelOfReason() {
    this.secondLevelOfReason = this.compile(9);
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
        medical: _.get(this.medical, value[5]),
        type: _.get(this.type, value[6]),
        reason: _.get(this.reason, value[7]),
        reasonDetail: _.get(this.reasonDetail, value[8]),
        secondLevelOfReason: _.get(this.secondLevelOfReason, value[9]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Other();