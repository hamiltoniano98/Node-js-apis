import express from 'express';
import cors from 'cors';

const app = express()

app.disable('x-powered-by')

app.get('/',(req,res)=>{
    res.json({message:'Hola'})
})

export default app