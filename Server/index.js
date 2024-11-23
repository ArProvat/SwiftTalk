const express = require('express');
const cors = require('cors');
require('dotenv').config();
var cookieParser = require('cookie-parser')
const DB_connection = require('./Config/DB-Config/DB-Config');
const router = require('./routers/Routers');

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));
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

