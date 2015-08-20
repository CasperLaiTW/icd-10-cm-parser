import _ from 'lodash';
import json from 'JSON2';

export default class generator {
  constructor(rows) {
    this.rows = rows;
  }

  generate() {
    const pedestrian = this.compilePedestrian();
    const pedestrianDetail = this.compilePedestrianDetail();
    const perpetrator = this.compilePerpetrators();
    const accitdentType = this.compileAccidentType();
    const medical = this.compileMedical();
  }

  compilePedestrian() {
    return this.compile(5);
  }

  compilePedestrianDetail() {
    return this.compile(6);
  }

  compilePerpetrators() {
    return this.compile(7)
  }

  compileAccidentType() {
    return this.compile(8);
  }

  compileMedical() {
    return this.compile(9);
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
    return data;
  }
}