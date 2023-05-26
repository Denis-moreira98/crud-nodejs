const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route params = /Curso/2
// Request body = { nome: 'NodeJS, tipo: 'Backend' }

const cursos = ["Node JS", "Javascript", "React Native"];

server.use((req, res, next) => {
   console.log(`URL CHAMADA: ${req.url}`);

   return next();
});

function checkCursos(req, res, next) {
   if (!req.body.name) {
      return res.status(400).json({ error: "Nome do curso é obrigatorio" });
   }

   return next();
}

function checkIndexCurso(req, res, next) {
   const curso = cursos[req.params.index];
   if (!curso) {
      return res.status(400).json({ error: "O curso não existe" });
   }

   req.curso = curso;

   return next();
}
// Listagem de cursos
server.get("/cursos", (req, res) => {
   return res.json(cursos);
});

//listagem de um curso
server.get("/cursos/:index", checkIndexCurso, (req, res) => {
   return res.json(req.curso);
});

//Criando um novo curso
server.post("/cursos/", checkCursos, (req, res) => {
   const { name } = req.body;
   cursos.push(name);

   return res.json(cursos);
});

//Atualizando o curso
server.put("/cursos/:index", checkCursos, checkIndexCurso, (req, res) => {
   const { index } = req.params;
   const { name } = req.body;

   cursos[index] = name;

   return res.json(cursos);
});

//Excluindo o curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
   const { index } = req.params;

   cursos.splice(index, 1);
   return res.send();
});

server.listen(3000);
