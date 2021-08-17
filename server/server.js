const express = require("express")
const http = require("http")
const path = require("path")
const socketIo = require("socket.io")
const firebase = require("firebase")
// const formateMessage = require('./utils/messages')

const firebaseConfig = {
    apiKey: "AIzaSyD9LY0107Cm4paMlakq_lp0OeTiDEbXP-c",
    authDomain: "super-chat-e211c.firebaseapp.com",
    projectId: "super-chat-e211c",
    storageBucket: "super-chat-e211c.appspot.com",
    messagingSenderId: "408513618263",
    appId: "1:408513618263:web:7bd6cd9d0cdb97e3ff9e12",
    measurementId: "G-TQ28RTDZN7",
};

firebase.initializeApp(firebaseConfig);

user = firebase.auth().currentUser;
db = firebase.firestore();

let c = 0
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, '../dist')));
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket) => {
    socket.on('connected', (userData) => {
        const userDetails = JSON.parse(userData);
        socket.emit("welcomeMessage", `Welcome, ${userDetails.email.split('@')[0]}`)
    })

    socket.on('typing', (email) => {
        const jsonData = JSON.stringify({
            email: email,
            typing: `typing...${c}`
        })
        c += 1
        socket.broadcast.emit("general_notification", `${jsonData}`)
    })
})

const PORT = 3000 || process.env.PORT
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))