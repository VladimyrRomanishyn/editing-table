const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/client/src')));

app.listen(3000, 'localhost', ()=>{
    console.log('Use localhost:3000');
});