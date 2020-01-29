const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

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

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projectSelected = projects[id];

  projectSelected.title = title

  res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  
  res.json(projects);
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const taskProject = projects[id].tasks;

  taskProject.push(title);
  
  res.json(projects);
});

server.listen(3000);

