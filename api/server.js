import express, {json} from 'express'
import studentRouter from './students.js'

const server = express();

server.use(json())

server.use("/api/students", studentRouter)

export default server