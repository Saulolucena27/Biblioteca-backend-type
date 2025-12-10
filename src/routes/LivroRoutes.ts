import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const router = Router();
const controller = new LivroController();

router.post("/", controller.criar);
router.get("/", controller.listarTodos);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.excluir);

export default router;