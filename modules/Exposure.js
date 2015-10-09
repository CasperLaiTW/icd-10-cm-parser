import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Exposure extends Generator {

  static file = path.join(__dirname, '../xls/exposure.xls');
  static output = 'exposure.json';
  static title = '燒灼傷';

  constructor() {
    super(Exposure.file, Exposure.title, Exposure.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      reason: firstRow[5],
      reasonDetail: firstRow[6],
      secondLevelOfReason: firstRow[7],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      reason: this.reason,
      reasonDetail: this.reasonDetail,
      secondLevelOfReason: this.secondLevelOfReason,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileReason();
    this._compileReasonDetail();
    this._compileSecondLevelOfReason();
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

  _compileSecondLevelOfReason() {
    this.secondLevelOfReason = this.compile(7);
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
        secondLevelOfReason: _.get(this.secondLevelOfReason, value[7]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Exposure();