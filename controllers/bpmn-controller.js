import {
  getDynamicData,
  getEnrichedSource,
  getSource
} from './../services/bpmn-service';

export async function getBPMNDiagram(request, response, next) {
  try {
    const source = await getSource();
    const data = await getDynamicData();

    const body = await getEnrichedSource(source, JSON.parse(data));
    response.status(200).send(body);

    return next();
  } catch (error) {
    return next(error);
  }
};