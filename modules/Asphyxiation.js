import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Asphyxiation extends Generator {

  static file = path.join(__dirname, '../xls/asphyxiation.xls');
  static output = 'asphyxiation.json';
  static title = '窒息';

  constructor() {
    super(Asphyxiation.file, Asphyxiation.title, Asphyxiation.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      reason: firstRow[5],
      reasonDetail: firstRow[6],
      intention: firstRow[7],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      reason: this.reason,
      reasonDetail: this.reasonDetail,
      intention: this.intention,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileReason();
    this._compileReasonDetail();
    this._compileIntention();
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

  _compileIntention() {
    this.intention = this.compile(7);
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
        intention: _.get(this.intention, value[7]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Asphyxiation();