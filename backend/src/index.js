const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');
const app = express();

app.use(cors());
app.use(express.json());


/**
 * Tipos de parâmetros
 * 
 * Query Params - Filtro e paginação
 * Route Params - Identificados de recursos (Atualizar / Deletar)
 * Request Body - Conteúdo JSON para criar ou editar um recurso
 */

/**
 * Middleware
 * 
 * Interceptador de requisições 
 *  - Pode iterromper totalmente uma requisição 
 *  - Alterar dados da requisição
 *  
 */

const projects = [];

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);
    next();
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response.status(400).json({ error: "ID de projeto inválido" });
    }

    return next();

}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { title } = request.query;
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner }
    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Projeto não encontrado" });
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(projects[projectIndex]);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({ error: "Projeto não encontrado" });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).json();

});

app.listen(3333);
