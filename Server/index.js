import { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import cookieParser from 'cookie-parser';
import DB_connection from './Config/DB-Config/DB-Config.js';

import router from './routers/Routers.js';
import {app,server} from './Socket/Socket.js';
import Ai_router from './routers/Ai_Router.js';
//const app = express();

const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));
// api endpoint
app.get('/',(req,res)=>{
    res.send('welcome');
})
app.use('/api',router)
app.use('/ai',Ai_router)
DB_connection().then(()=>{
    
    server.listen(PORT,()=>{
        console.log('listening on port',PORT);
    })
})

