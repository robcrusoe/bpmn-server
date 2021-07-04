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