const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let numReqs  = 0;

// Middleware GLOBAL
server.use((req, res, next) => {
  numReqs++;
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}; Número de requisições até o momento: ${numReqs}`);

  next();

  console.timeEnd('Request');
});

// Middlewares LOCAIS
function checkIdInArray(req, res, next) {
  if(!projects[req.params.id]) {
    return res.status(400).json({error: 'Project dos not exists!'});
  }

  next();
}

function checkFieldExists(req, res, next) {
  if(!req.body.title) {
    return res.status(400).json({error: 'Param not found!'});
  }

  next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const newProject = {
    'id': id,
    'title': title,
    'tasks': []
  };

  projects.push(newProject);

  res.json(projects);
});

server.get('/projects', (req, res) => {
  res.json(projects);
});

server.put('/projects/:id', checkFieldExists, checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectSelected = projects[id];

  projectSelected.title = title

  res.json(projects);
});

server.delete('/projects/:id', checkFieldExists, checkIdInArray, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  
  res.json(projects);
});

server.post('/projects/:id/tasks', checkFieldExists, checkIdInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const taskProject = projects[id].tasks;

  taskProject.push(title);
  
  res.json(projects);
});

server.listen(3000);

