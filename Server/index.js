const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DB_connection = require('./Config/DB-Config/DB-Config');
const router = require('./routers/Routers');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
// api endpoint
app.get('/',(req,res)=>{
    res.send('welcome');
})
app.use('/api',router)

DB_connection().then(()=>{
    
    app.listen(PORT,()=>{
        console.log('listening on port',PORT);
    })
})

