const cors = require('cors');
const express = require('express');
const fs = require('fs');

import BpmnModdle from 'bpmn-moddle';
import { routes as bpmnRoutes } from './routes/bpmn-routes';

const app = express();
const PORT = 3001;

const moddle = new BpmnModdle();

app.use(cors());
app.use('/', bpmnRoutes);

app.listen(PORT, () => {
  console.log(`BPNM server running on port ${PORT}`);
});