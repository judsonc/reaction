const express = require('express')
const app = express()
const path = require('path')

app.get('/', (_, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.use('/assets', express.static('assets'));

app.listen(8000)
console.log('8000 é a porta mágica!')