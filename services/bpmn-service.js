const fs = require('fs');
const path = require('path');
const util = require('util');

import {
  getEnrichedXML,
  getFill,
  getMappedName,
  getParsedXML,
  getStateHash,
  getStroke
} from './../shared/setup-helper';

const readFile = util.promisify(fs.readFile);

export async function getSource() {
  const pathToFile = path.join(__dirname, '../', 'data', 'source.xml');
  return readFile(pathToFile, 'utf-8');
};

export async function getDynamicData() {
  const pathToFile = path.join(__dirname, '../', 'data', 'data.json');
  return readFile(pathToFile, 'utf-8');
};

export async function getEnrichedSource(source, data) {
  const stateCollection = getStateHash(data);
  const parsedXML = await getParsedXML(source);

  const rootEl = parsedXML.rootElement;
  const idCollection = new Map();

  for (let el of rootEl.rootElements[0].flowElements) {
    let mappedName = getMappedName(el.name);

    if (mappedName) {
      const status = stateCollection.get(mappedName);
      el.set('status', status);
      idCollection.set((el.id.toString() + '_di'), status);
    }
  }

  for (let el of rootEl.diagrams[0].plane.planeElement) {
    const mappedState = idCollection.get(el.id);

    if (mappedState) {
      el.set('bioc:stroke', getStroke(mappedState));
      el.set('bioc:fill', getFill(mappedState));
    }
  }

  const enrichedSource = await getEnrichedXML(rootEl);
  return enrichedSource.xml;
};
