import fs from 'fs';
import path from 'path';
import { Map } from 'immutable';
import _ from 'lodash';
import json from 'JSON2';
import * as Modules from './modules/';

export function work() {
  let root = new Map();
  _.each(Modules, (module) => {
    module.make();
    root = root.set(module.name, module.output);
  });
  writeRoot(root);
}

export function writeRoot(root) {
   fs.writeFile(path.join(__dirname, 'dist/root.json'), json.stringify(root.toObject()), (error) => {
    if (error) {
        console.log('error: ' + error);
        return false;
      }

      console.log(`Compile success. [root.json]`);
   });
}