# BPMN Server

A simple middleware created using Express.js to enrich custom BPMN diagram data sets

The project was generated using Express.js version 4.17.1

## Development server

Run `npm start` for a dev server. This fires up the server on `http://localhost:3001/`. The app will automatically reload if you change any of the source files.

## Application Description

The `bpmn-routes` enlists the endpoint(s) available to the frontend for usage

The `bpmn-controller` has a single async function titled `getBPMNDiagram` to fetch (in this instance) a mock BPMN diagram XML and JSON with data for enrichment for the BPMN

The `bpmn-service` has several functions to obtain the source diagram data and enrich that using mock JSON or dynamic data in `O(N) time`

The `setup-helper` is a shared resource with several utility functions for map and array operations
