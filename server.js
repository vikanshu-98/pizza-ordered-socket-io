import express from 'express'
const app = express()
import { APP_PORT,SESSION_SECRET_KEY,DB_URL, initializePassport } from './config'
import router from './routes'
import path from 'path'
import hbs from 'hbs'
import { ErrorHandler, handleBarsHelpers } from './app'
import flash from 'express-flash'
import expressSession from 'express-session'
import passport from 'passport'
import MonoDb from 'connect-mongo'
import EventEmitter from 'events'
import Socket from 'socket.io'
const eventEmitter =new EventEmitter()

const Store =new MonoDb({mongoUrl:DB_URL,collectionName:"sessions"})
require('./config/database/connection') 
handleBarsHelpers()
hbs.registerPartials(path.join(__dirname,'/resources/views/partials'))

 
app.set('view engine','hbs') 
app.set('eventEmitter',eventEmitter)
app.set('views',path.join(__dirname,'/resources/views'))

app.use(express.static(path.join(__dirname,'/public'))); 
 

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
 
 
 
app.use(expressSession({
    saveUninitialized:false,
    resave:false,
    secret:SESSION_SECRET_KEY,
    store:Store,
    cookie:{
        maxAge:1000*60*60,
        httpOnly:true
    }
}))

initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.users=req.user
    next()
})
app.use(router) 
app.use(ErrorHandler)







const server = app.listen(APP_PORT,()=>{console.log(APP_PORT)})
const io = Socket(server)

io.on('connection',(socket)=>{
     
    socket.once('join',(order)=>{
        socket.join(order)
    })

    eventEmitter.once('newOrderAdded',(data)=>{
        io.to('adminRoom').emit('newOrder',data)
    })

    eventEmitter.once('orderUpdated',(data,cb)=>{
        io.to(data.orderId+'_order').emit('orderUpdate',data)
        cb(200)
    })
})