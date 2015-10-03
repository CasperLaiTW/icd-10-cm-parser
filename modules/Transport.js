import path from 'path';
import _ from 'lodash';
import { Set } from 'immutable';
import Generator from './generator';

class Transport extends Generator {

  static file = path.join(__dirname, '../xls/transport.xls');
  static output = 'transport.json';
  static title = '運輸事故';

  constructor() {
    super(Transport.file, Transport.title, Transport.output);
    this.generate();
  }

  get menus() {
    const firstRow = this.rows.shift();
    return {
      pedestrian: firstRow[5],
      pedestrianDetail: firstRow[6],
      perpetrator: firstRow[7],
      accidentType: firstRow[8],
      medical: firstRow[9],
    }
  }

  get data() {
    return {
      data: this.icd10,
      pedestrian: this.pedestrian,
      pedestrianDetail: this.pedestrianDetail,
      perpetrator: this.perpetrator,
      accidentType: this.accidentType,
      medical: this.medical,
      menus: this.menus,
    }
  }

  generate() {
    this._compilePedestrian();
    this._compilePedestrianDetail();
    this._compilePerpetrators();
    this._compileAccidentType();
    this._compileMedical();
    this._compileICD();
  }

  _compilePedestrian() {
    this.pedestrian = this.compile(5);
  }

  _compilePedestrianDetail() {
    this.pedestrianDetail = this.compile(6);
  }

  _compilePerpetrators() {
    this.perpetrator = this.compile(7)
  }

  _compileAccidentType() {
    this.accidentType = this.compile(8);
  }

  _compileMedical() {
    this.medical = this.compile(9);
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
        pedestrian: _.get(this.pedestrian, value[5]),
        pedestrianDetail: _.get(this.pedestrianDetail, value[6]),
        perpetrator: _.get(this.perpetrator, value[7]),
        accidentType: _.get(this.accidentType, value[8]),
        medical: _.get(this.medical, value[9]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }
}

export default new Transport();