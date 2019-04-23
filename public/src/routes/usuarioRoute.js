import { Router } from 'express';
import { GetAll, GetById, Post, Put, Delete, Login } from '../controllers/usuarioController';
import { autorizacao } from './../services/authService';

var router = Router();

router.post('/login', Login);

router.route("/usuario")
.post(Post)
.get(autorizacao, GetAll);
//Métodos para obter ou manipular itens específicos
router.get('/usuario/:id', autorizacao, GetById)
router.put('/usuario/:id', autorizacao, Put)
router.delete('/usuario/:id', autorizacao, Delete);

export default router;