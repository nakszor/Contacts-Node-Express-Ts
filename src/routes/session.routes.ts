import { Router } from 'express'
import { createSessionController } from '../controllers/session.controller'
import { validateSchemaMiddleware, verifyUserExists } from '../middlewares'
import { userLoginSchema } from '../schemas/user.schemas'

const sessionRouter = Router()
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Criar sessão de login
 *     description: Cria uma sessão de login com base nos dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Sessão de login criada com sucesso
 *       400:
 *         description: Erro ao criar a sessão de login
 *       401:
 *         description: Credenciais inválidas
 */
sessionRouter.post('', validateSchemaMiddleware(userLoginSchema), createSessionController)

export default sessionRouter