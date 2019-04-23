import { Router } from 'express';
import { GetAll, GetById, Post, Put, Delete } from './../controllers/responsavelController';

var router = Router();

router.route("/responsavel")
.post(Post)
.get(GetAll);
router.get('/responsavel/:id', GetById)
router.put('/responsavel/:id', Put)
router.delete('/responsavel/:id', Delete);

export default router;