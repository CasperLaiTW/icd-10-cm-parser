import fs from 'fs';
import _ from 'lodash';
import Immutable from 'immutable';
import json from 'JSON2';

export default class generator {
  constructor(rows) {
    this.rows = rows;
  }

  generate() {
    this.compilePedestrian();
    this.compilePedestrianDetail();
    this.compilePerpetrators();
    this.compileAccidentType();
    this.compileMedical();
    this.compileICD();
  }

  /**
   * Compile ICD-10-cm data
   * @return void
   */
  compileICD() {
    let data = Immutable.Set();
    _.each(this.rows, (value) => {

      let dest = {
        code: value[1],
        content: value[2],
        pedestrian: _.get(this.pedestrian, value[5]),
        pedestrianDetail: _.get(this.pedestrianDetail, value[6]),
        perpetrator: _.get(this.perpetrator, value[7]),
        accitdentType: _.get(this.accitdentType, value[8]),
        medical: _.get(this.medical, value[9]),
      };
      data = data.add(dest);
    });
    this.icd10 = data;
  }

  make(path) {
    const data = {
      data: this.icd10,
      pedestrian: this.pedestrian,
      pedestrianDetail: this.pedestrianDetail,
      perpetrator: this.perpetrator,
      accitdentType: this.accitdentType,
      medical: this.medical,
    }
    fs.writeFile(path, json.stringify(data), (error) => {
      if (error) {
        console.log('error: ' + error);
        return false;
      }

      console.log('Compile success.');
    });
  }

  compilePedestrian() {
    this.pedestrian = this.compile(5);
  }

  compilePedestrianDetail() {
    this.pedestrianDetail = this.compile(6);
  }

  compilePerpetrators() {
    this.perpetrator = this.compile(7)
  }

  compileAccidentType() {
    this.accitdentType = this.compile(8);
  }

  compileMedical() {
    this.medical = this.compile(9);
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
}