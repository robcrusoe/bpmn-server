import { Router as router } from 'express';
import { getBPMNDiagram } from './../controllers/bpmn-controller';

const routes = router();

routes.get('/bpmn/diagram', getBPMNDiagram);

export { routes };
