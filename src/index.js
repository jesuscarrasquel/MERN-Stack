const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const { mongoose } = require('./database')

const app = express()

//Settings
app.set('port', process.env.PORT || 3000)
 
//Middlewares
app.use(cors())
app.use(morgan('dev')) //Para tener respuesta del servidor
app.use(express.json()) //Para que el servidor entienda formato JSON

//Routes
app.use('/api/tasks', require('./routes/tasks.routes'))

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})