import express from "express";
import { AppDataSource } from "./data-source";
import livroRoutes from "./routes/LivroRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/livros", livroRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados conectado!");
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco:", error);
    });