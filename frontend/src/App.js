import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import background from './assets/bg.jpg';
import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */

function App() {

    const [projects, setProjects] = useState([]);

    /**
     * useEffect recebe 2 parametros 
     * 1 - Qual funcao eu quero disparar 
     * 2 - Quando eu quero disparar 
     */
    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    /**
     * useState retorna uma array com 2 posicoes 
     * 1 - Variavel com o seu valor inicial
     * 2 - Funcao para atualizar o valor
     *  */


    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Ze'
        })

        const project = response.data;
        setProjects([...projects, project]);

    }

    return (
        <>
            <Header title="Projetos" />

            {/* <img src={background} width="300" /> */}

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type='button' onClick={handleAddProject}>Add Projeto</button>

        </>
    );
}

export default App;