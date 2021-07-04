const fs = require('fs');
const path = require('path');
const util = require('util');

import {
  getEnrichedXML,
  getMappedName,
  getParsedXML,
  getStateHash
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
  const collection = getStateHash(data);
  const parsedXML = await getParsedXML(source);

  const rootEl = parsedXML.rootElement;

  for (let el of rootEl.rootElements[0].flowElements) {
    let mappedName = getMappedName(el.name);

    if (mappedName) {
      el.set('status', collection.get(mappedName));
    }
  }

  const enrichedSource = await getEnrichedXML(rootEl);
  return enrichedSource.xml;
};
