const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const cors       = require('cors');
const passport   = require('passport');
const mongoose   = require('mongoose');
const config     = require('./config/database');
const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);


// Connect To Database
// mongoose.connect(config.database);

// // On Connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to database '+config.database);
// });

// // On Error
// mongoose.connection.on('error', (err) => {
//   console.log('Database error: '+err);
// });


// const users    = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// require('./config/passport')(passport); passport here just in case we need it

// app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});


// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });



io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('add-message', (message) => {
    console.log(message);
    io.emit('message', {type:'new-message', text: message});    
  });
});

// Start Server
http.listen(port, () => {
  console.log('Server started on port '+port);
});
// app.listen(port, () => {
//   console.log('Server started on port '+port);
// });