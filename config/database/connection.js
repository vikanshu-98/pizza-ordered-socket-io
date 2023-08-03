import mongoose from 'mongoose' 
import { DB_URL } from '..'
mongoose.connect(DB_URL)
const db = mongoose.connection
db.on('error',console.error.bind(console,'coonnecwerrr'))
db.once("connected",()=>{
    console.log('connected..')
})
