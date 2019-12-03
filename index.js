const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
//const Bcrypt = require("bcryptjs");
const port = 5000
const multer =require("multer");
// const pusher = require('pusher');
// const app = express();

// const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());



// app.post('/multiupload',multiupload.single('file'),(req,res)=>{
//   res.json({file:'uploaded file'});
// });

// app.use((err,req,res,next)=>{
//   if(err.code==="incorrect_filetype"){
//     res.status(422).json({error:'only images are allowed'});
//     return;
//   }
// });
// app.use((err, req, res, next)=>{
//   if(err.code=="limit_file_size"){
//     res.status(422).json({error:"allowed file size is 500kb"});
//     return;
//   }
// });
// Create express app

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/static', express.static(path.join(__dirname, 'uploads')))

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   next();
// });

const dbConfig = 'mongodb://127.0.0.1:27017/abangDB';
const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




// // Set up default mongoose connection
// let db_url = 'mongodb://127.0.0.1/abangDB';
// mongoose.connect(db_url, { useNewUrlParser: true });
// // Get the default connection
// var db = mongoose.connection;
// // Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// //const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('connected to database'));


// ------------------------------------------------------------

// Import Models

// const AccountsUsers = require('./models/model.accountsUsers.js');
// const AccountsProvider = require('./models/model.accountsProvider.js');
// const Reservation = require('./models/model.reservation.js');
// const Items = require('./models/model.item.js');
//import controller
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

// const upload = multer({
//   dest: './uploads',
//   filename: function (req, file, cb) {
//     //req.body is empty...
//     //How could I get the new_file_name property sent from client here?
//     cb(null, file.name+Date.now()+'.jpg');
//   },
//   fileFilter,
//   limits: {
//     fileSize: 5000000
//   }
// });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {

      cb(null,  file.fieldname+Date.now()+'.jpg' );

  }
});
var upload = multer({ storage: storage });
const createUser = require('./controller/accountsUsers.controller.js');
//const test = require('./models/model.test.js');

// app.get('/pusher',(req,res)=>{
//    var pusher = new Pusher({
//     app_id : '906629',
//     key : '5dd0d9748bc2e0e4bb9a',
//     secret : 'a0cd9c898742534c16f3',
//     cluster : 'ap1',
//     encrypted : true
//    });
//    var data = {
//      'data': {
//        req.query
//      }
//    }
//   pusher.trigger('my-channel', 'my-event', {
//      'data':{
//        data
//      }

//   })
// })

//ADDING USERS TO DB
// app.post('/accountsUsers', async (req, res) => {
//   createUser.create(req,res)
//   console.log(req.body)
// });
app.post('/accountsUsers', function (req, res) {
  console.log(req.body)
  createUser.create(req, res);
});


app.get("/login", createUser.AllUsers);

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});



app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});

//GETTING USERS FROM DB
// app.get('/accountsUserList', (req, res) => {
//   AccountsUsers.find({}, (err, AccountsUsers) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ AccountsUsers: AccountsUsers });
//   });

// });

// //uploading files

// //ADDING PROVIDERS TO DB
// app.post('/accountsProvider', (req, res) => {
//   let accountsProviderToCreate = new AccountsProvider(
//     {
//       url: req.body.url,
//       companyName: req.body.companyName,
//       companyAddress: req.body.companyAddress,
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password
//     }
//   );
//   accountsProviderToCreate.save((err, AccountsProvider) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(AccountsProvider);
//   });

// });


// //GETTIGN RPOVIDERS FRM DB
// app.get('/accountsProviderList', (req, res) => {
//   AccountsProvider.find({}, (err, accountsProvider) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send({ accountsProvider: accountsProvider });
//   });
// });

// //ADDING RESERVATION TO DB
// app.post('/reservation', (req, res) => {
//   let reservationToCreate = new Reservation(
//     {
//       reservationID: req.body.reservationID,
//       accountID: req.body.accountID,
//       dateReserved: req.body.dateReserved,
//       dateReturned: req.body.dateReturned,
//       totalRate: req.body.totalRate,
//       status: req.body.status,
//     }
//   );
//   reservationToCreate.save((err, Reservation) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(Reservation);
//   });
// });

// //Getting reservation from DB
// app.get('/reservationList', (req, res) => {
//   Reservation.find({}, (err, reservation) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send({ reservation: reservation });
//   });
// })


// //ADDDING ITEM TO DB
// app.post('/items', upload.single("img"),(req, res) => {
//   const ItemToCreate = new Items(
//     {
//       itemID: req.body.itemID,
//       itemName: req.body.itemName,
//       url:req.file.filename,
//       companyID: req.body.companyID,
//       category: req.body.category,
//       brand: req.body.brand,
//       model: req.body.model,
//       sitingcapacity: req.body.sitingcapacity,
//       color: req.body.color,
//       location: req.body.location,
//       rate: req.body.rate,
//       status: req.body.status,

//     }
//   );
//   ItemToCreate.save((err, items) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(items);
//   });
// });

// //Getting Items form DB
// app.get('/itemList', (req, res) => {
//   Items.find({}, (err, items) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send({ items: items });
//   });
// });

// app.post('/test', async (req, res) => {
//   const testCreate = new test(
//     {
//       password: req.body.password,
//       username: req.body.username

//     }
//   );
//   testCreate.save((err, test) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(test);
//   });
// });

// app.get('/testGet', (req, res) => {
//   test.find({}, (err, test) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send({ test: test });
//   });
// });


// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});