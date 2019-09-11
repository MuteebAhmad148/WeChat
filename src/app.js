const express=require('express')
const path=require('path')
const socketIO=require('socket.io')
const app=express()
const http=require('http')

const PORT=process.env.PORT || 3000
const publicDirPath=path.join(__dirname,'../public')

const server=http.createServer(app)
const io=socketIO(server)

app.use(express.static(publicDirPath))


io.on('connection',(socket)=>{
    socket.broadcast.emit('UserActivity','New user has joined ')
    socket.on('SentMsg',(msg)=>{
        socket.broadcast.emit('NewMsg',msg)
    })
    socket.on('SentLoc',(coor)=>{
        socket.broadcast.emit('Location',"https://www.google.com/maps/embed/v1/place?key=AIzaSyD09F8FplxMPti1C4ePgGwbnoWqMxz9y0s%20&q="
            +coor.latitude+','+coor.longitude
           )
    })
    socket.on('disconnect',()=>{
        io.emit('UserActivity','User left')
    })
    socket.on('UserTyping',()=>{
        socket.broadcast.emit('UserActivity','User Typing ....')
    })
})

server.listen(PORT,()=>{
    console.log('Server running on PORT ',PORT)
})

