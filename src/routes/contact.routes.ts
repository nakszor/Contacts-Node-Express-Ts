import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares';
import { createContactSchema } from '../schemas/contact.schemas';
import {
  verifyTokenIsValidMiddleware,
  verifyContactIsNotDuplicatedMiddleware,
  verifyUserExists,
  verifyContactExists,
  verifyAuthorizationMiddleware,
  verifyContactPhoneNumberIsValid,
  verifyContactEmailIsValid,
} from '../middlewares'
import {
  createContactController,
  listContactsController,
  retrieveContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.controller'

const contactRouter = Router();

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Criar contato
 *     description: Cria um novo contato com base nos dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contato criado com sucesso
 *       400:
 *         description: Erro ao criar o contato
 *       409:
 *         description: Contato duplicado
 */
contactRouter.post('', validateSchemaMiddleware(createContactSchema), verifyTokenIsValidMiddleware, verifyContactIsNotDuplicatedMiddleware, createContactController);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Listar contatos
 *     description: Retorna a lista de contatos
 *     responses:
 *       200:
 *         description: Sucesso
 */
contactRouter.get('', verifyTokenIsValidMiddleware, listContactsController);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Obter dados do contato
 *     description: Retorna os dados do contato com base no ID fornecido
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
 *         description: Contato não encontrado
 */
contactRouter.get('/:id', verifyTokenIsValidMiddleware, verifyUserExists, verifyContactExists, verifyAuthorizationMiddleware, retrieveContactController);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Atualizar contato
 *     description: Atualiza os dados do contato com base no ID fornecido
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
 *             $ref: '#/components/schemas/ContactUpdate'
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o contato
 *       404:
 *         description: Contato não encontrado
 */
contactRouter.patch('/:id', verifyTokenIsValidMiddleware, verifyUserExists, verifyContactExists, verifyAuthorizationMiddleware, verifyContactPhoneNumberIsValid, verifyContactEmailIsValid, updateContactController);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Excluir contato
 *     description: Exclui o contato com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contato excluído com sucesso
 *       404:
 *         description: Contato não encontrado
 */
contactRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyUserExists, verifyContactExists, verifyAuthorizationMiddleware, deleteContactController);

export default contactRouter;
