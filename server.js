const express = require("express");
const path = require("path");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

// Comprime todas as respostas
app.use(compression());

// Serve arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, "dist")));

// Redireciona todas as requisições para o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
