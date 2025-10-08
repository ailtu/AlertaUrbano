import express from "express";
import dotenv from "dotenv";
import Parse from "parse/node";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Corrigir caminhos para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Servir os arquivos estáticos
app.use(express.static(__dirname));

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

// Rotas da API
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    await user.signUp();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Parse.User.logIn(username, password);
    res.json({ message: "Login realizado com sucesso", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/reports", async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const Report = Parse.Object.extend("Report");
    const report = new Report();
    report.set("title", title);
    report.set("description", description);
    report.set("location", location);
    report.set("status", "ativo");
    await report.save();
    res.status(201).json({ message: "Report criado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const Report = Parse.Object.extend("Report");
    const query = new Parse.Query(Report);
    query.equalTo("status", "ativo");
    const results = await query.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Redirecionar para index.html se não encontrar rota da API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  // criar tela exclusiva para quando não encontrar rota
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
