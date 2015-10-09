import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Poisoning extends Generator {

  static file = path.join(__dirname, '../xls/poisoning.xls');
  static output = 'poisoning.json';
  static title = '中毒';

  constructor() {
    super(Poisoning.file, Poisoning.title, Poisoning.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.firstRow;
    return {
      medical: firstRow[4],
      substance: firstRow[5],
      substanceDetail: firstRow[6],
      secondLevelOfSubstance: firstRow[7],
      intention: firstRow[8],
    }
  }

  get data() {
    return {
      data: this.icd10,
      medical: this.medical,
      substance: this.substance,
      substanceDetail: this.substanceDetail,
      secondLevelOfSubstance: this.secondLevelOfSubstance,
      intention: this.intention,
      menus: this.menus,
    }
  }

  generate() {
    this._compileMedical();
    this._compileSubstance();
    this._compileSubstanceDetail();
    this._compileSecondLevelOfSubstance();
    this._compileIntention();
    this._compileICD();
  }

  _compileMedical() {
    this.medical = this.compile(4);
  }

  _compileSubstance() {
    this.substance = this.compile(5);
  }

  _compileSubstanceDetail() {
    this.substanceDetail = this.compile(6)
  }

  _compileSecondLevelOfSubstance() {
    this.secondLevelOfSubstance = this.compile(7);
  }

  _compileIntention() {
    this.intention = this.compile(8);
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
        substance: _.get(this.substance, value[5]),
        substanceDetail: _.get(this.substanceDetail, value[6]),
        secondLevelOfSubstance: _.get(this.secondLevelOfSubstance, value[7]),
        intention: _.get(this.intention, value[8]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Poisoning();