import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroController {

    async criar(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            if (!titulo || !autor || !isbn || !anoPublicacao) {
                return res.status(400).json({ erro: "Campos obrigatórios: titulo, autor, isbn, anoPublicacao" });
            }

            const livro = LivroRepository.create({
                titulo,
                autor,
                isbn,
                anoPublicacao,
                disponivel: disponivel ?? true
            });

            const resultado = await LivroRepository.save(livro);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao criar livro" });
        }
    }

    async listarTodos(req: Request, res: Response) {
        try {
            const livros = await LivroRepository.find();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao buscar livros" });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const livro = await LivroRepository.findOneBy({ id });

            if (!livro) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }

            return res.json(livro);
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao buscar livro" });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const livro = await LivroRepository.findOneBy({ id });

            if (!livro) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }

            LivroRepository.merge(livro, req.body);
            const resultado = await LivroRepository.save(livro);
            return res.json(resultado);
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao atualizar livro" });
        }
    }

    async excluir(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const livro = await LivroRepository.findOneBy({ id });

            if (!livro) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }

            await LivroRepository.remove(livro);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ erro: "Erro ao excluir livro" });
        }
    }
}