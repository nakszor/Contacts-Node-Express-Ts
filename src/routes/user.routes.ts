import { Router } from 'express'
import { createUserController, deleteUserController, retrieveUserController, updateUserController } from '../controllers/user.controllers'
import { validateSchemaMiddleware, verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists, verifyUserExists, verifyUserPermissionMiddleware } from '../middlewares'
import { createUserSchema, userUpdateSchema } from '../schemas/user.schemas'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValidMiddleware'

const userRouter = Router()

userRouter.post('',validateSchemaMiddleware(createUserSchema), verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists, createUserController)
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com base nos dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar o usuário
 *       409:
 *         description: E-mail ou número de telefone já existe
 */
userRouter.get('/:id', verifyTokenIsValidMiddleware, verifyUserExists, verifyUserPermissionMiddleware, retrieveUserController)
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obter dados do usuário
 *     description: Retorna os dados do usuário com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.patch('/:id', verifyTokenIsValidMiddleware, verifyUserExists,verifyUserPermissionMiddleware,validateSchemaMiddleware(userUpdateSchema), verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists,updateUserController)
/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados do usuário com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyUserExists,verifyUserPermissionMiddleware, deleteUserController)
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Excluir usuário
 *     description: Exclui o usuário com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
export default userRouter