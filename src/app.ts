import 'express-async-errors'
import express from 'express'
import router from './routes'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import specs from '../swagger' 

import handdleError from './errors/handleError'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json())
app.use(cors())
app.use('/',router)
app.use(handdleError)

export default app