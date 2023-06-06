import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'Aplicação para usuários criarem sua lista de contatos'
    },
    servers: [
      {
        url: 'http://localhost:3000' 
      }
    ]
  },
  apis: ['./src/routes/index.ts'] 
}

const specs = swaggerJsDoc(options)

export default specs
