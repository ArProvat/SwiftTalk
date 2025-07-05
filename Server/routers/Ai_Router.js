import { Router } from 'express'
import Ai_controller from '../Controller/AI.controller/AI_controller.js'
const Ai_router = Router()

Ai_router.get('/get_result',Ai_controller)


export default Ai_router