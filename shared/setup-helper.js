import BpmnModdle from 'bpmn-moddle';

export async function getEnrichedXML(json) {
  const moddle = new BpmnModdle();
  return moddle.toXML(json);
}

export async function getParsedXML(source) {
  const moddle = new BpmnModdle();
  return moddle.fromXML(source);
}

export function getMappedName(name) {
  if (name) { name = name.trim(); }
  let mappedName;

  switch (name) {
    case 'Parse' || 'parse':
      mappedName = 'parse';
      break;
    case 'Transform' || 'transform':
      mappedName = 'transform';
      break;
    case 'Enrich' || 'enrich':
      mappedName = 'enrich';
      break;
    case 'Validate' || 'validate':
      mappedName = 'validate';
      break;
    case 'Send To Adaptiv' || 'sendToAdaptiv':
      mappedName = 'sendToAdaptiv';
      break;
    default:
      mappedName = null;
      break;
  }

  return mappedName;
}

export function getStateHash(data) {
  const collection = new Map();
  for (let item of data) {
    collection.set(item.id, getTaskState(item.state));
  }

  return collection;
};

export function getStroke(state) {
  let stroke;

  switch (state) {
    case 'OK':
      stroke = '#2a9d8f';
      break;
    case 'FAILED':
      stroke = '#e63946';
      break;
    case 'PENDING':
      stroke = '#1e88e5';
      break;
  }

  return stroke;
}

export function getFill(state) {
  let fill;

  switch (state) {
    case 'OK':
      fill = '#e3eae3';
      break;
    case 'FAILED':
      fill = '#ffe4e1';
      break;
    case 'PENDING':
      fill = '#bbdefb';
      break;
  }

  return fill;
}

export function getTaskState(state) {
  let taskState;

  switch (state) {
    case 'completed':
      taskState = 'OK';
      break;
    case 'failed':
      taskState = 'FAILED';
      break;
    case 'waiting':
      taskState = 'PENDING';
      break;
    default:
      taskState = 'FAILED';
      break;
  }

  return taskState;
};