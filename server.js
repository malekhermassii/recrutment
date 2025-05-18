const express = require("express");
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidV4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const mymodel = require("./app/models/blog.model");
const jobModel = require("./app/models/job.model");

// create express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// Middleware
app.use(express.static(path.join(__dirname, 'public/admin/template')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(cors());app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));xx
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Storage Setting
const storage = multer.diskStorage({
  destination: './public/images', // Directory (folder) setting
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name setting
  },
});

// Upload blog images
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only jpeg, jpg, png, and gif Image allowed'));
    }
  },
});

// Single Image Uploading
app.post('/blogs', upload.single('image'), (req, res) => {
  const file = req.file;

  // Check if a file was uploaded
  if (!file) {
    // Handle the case when no file was uploaded
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const data = {
    image: file.filename,
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    date: req.body.date,
    status: "0"
  };

  mymodel
    .create(data)
    .then((x) => {
      res.redirect('/blogs');
    })
    .catch((y) => {
      console.log(y);
      res.status(500).json({ message: 'Error adding article' });
    });
});
app.post('/jobs', upload.single('image'), (req, res) => {
  const file = req.file;

  // Check if a file was uploaded
  if (!file) {
    // Handle the case when no file was uploaded
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const data = {
    image: file.filename,
    title: req.body.title,
    locationAddress: req.body.locationAddress,
    postType: req.body.postType,
    missions: req.body.missions,
    skills: req.body.skills,
    workRequirements: req.body.workRequirements,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    domain: req.body.domain,
    salary: req.body.salary,
    postDate: req.body.postDate,
    status: "0",
  };

  jobModel
    .create(data)
    .then((x) => {
      res.redirect('/jobs');
    })
    .catch((y) => {
      console.log(y);
      res.status(500).json({ message: 'Error adding job offer' });
    });
});



// require routes
require("./app/routes/admin.routes.js")(app);
require("./app/routes/payment.routes.js")(app);
require("./app/routes/employee.routes.js")(app);
require("./app/routes/job.routes.js")(app);
require("./app/routes/reward.routes.js")(app);
require("./app/routes/policy.routes.js")(app);
require("./app/routes/applicant.routes.js")(app);
require("./app/routes/blog.routes.js")(app);
require("./app/routes/offer.routes.js")(app);
require("./app/routes/promotion.route.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/interview.routes.js")(app);
// Redirect to login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/template/simples/login.html'));
});

// Remove the existing route that redirects to the dashboard
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/template', 'index.html'));
});
app.get('/client', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client', 'index.html'));
});
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/dashboard/:room', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'template', 'stream.html'));
});

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest API By Chaaben Group." });
});


const authRoutes = require("./app/routes/user.routes");
app.use("/login", authRoutes);

const { PeerServer } = require('peer');



const roomMap = new Map();

// Socket.io Connection
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);

    // Store the roomId and associated socket id in the roomMap
    roomMap.set(roomId, socket.id);

    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      // Find the roomId associated with the disconnected socket
      let roomId = null;
      roomMap.forEach((value, key) => {
        if (value === socket.id) {
          roomId = key;
          return;
        }
      });

      if (roomId) {
        socket.to(roomId).broadcast.emit('user-disconnected', userId);

        // Remove the room association from roomMap
        roomMap.delete(roomId);
      }
    });
  });
});

// Start Stream route
app.post('/start-stream', (req, res) => {
  // Generate the roomId
  const roomId = uuidV4();

  // Emit socket.io event to notify connected clients
  io.emit('stream-started', roomId);

  // Example response
  res.json({ roomId: roomId, message: 'Stream started successfully' });
});

// Handle user logout
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secret key of your choice
    resave: false,
    saveUninitialized: false
  })
);

// Handle user logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout failed:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }

    return res.status(200).json({ message: 'Logout successful' });
  });
});

// listen for requests
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});


// Create Peer server
const peerServer = PeerServer({ port: 3002, path: '/peerjs' });

// Start Peer server
peerServer.on('connection', (client) => {
  console.log(`Client connected: ${client.getId()}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected: ${client.getId()}`);
});

