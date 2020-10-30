let express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const regFactory = require('./registration');

let app = express();


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';

const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
     connectionString
});
const regFact = regFactory(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
     secret: "<add a secret string here>",
     resave: false,
     saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async function (req, res) {

     const getReg = await regFact.getReg();

     res.render('index', 
      {display: getReg}
     
     );
});

app.post('/reg_number', async function (req, res) {

const params = req.body.textNumItem.toUpperCase();
console.log(params);
const regexPlate = await regFact.regex(params);

if(params){
const addReg = await regFact.addReg(regexPlate);
req.flash('info', 'Registration succesfully added!');
} 


/*const plate = req.body.plateInput;
const valid = await regFact.valid(plate);
if(valid == false){
     req.flash('info', 'Registration invalid');
}*/


const getReg = await regFact.getReg();

 const error = await regFact.error(params);
 if (error) {
      req.flash('info', 'No Registration number entered');
 }

     res.render('index', {
          display: getReg,
     });
});

app.get('/reg_number', async function (req, res) {
const dropDown = req.query.dropDown;
console.log(dropDown);

const filter = await regFact.filter(dropDown);
     console.log(filter)
     res.render('index', {
           display2: filter
     });
});

app.post("/reset", async function (req, res) {
     await regFact.resetBtn();

     res.redirect("/");
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
     console.log('App starting on port', PORT);
});


/*
let express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const regFactory = require('./registration');

let app = express();


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';

const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
     connectionString
});
const regFact = regFactory(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
     secret: "<add a secret string here>",
     resave: false,
     saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async function (req, res) {

     const getReg = await regFact.getReg();

     res.render('index', 
      {display: getReg}
     
     );
});

app.post('/reg_number', async function (req, res) {

const params = req.body.textNumItem;

const regexPlate = await regFact.regex(params);

if(params){
const addReg = await regFact.addReg(regexPlate);
//req.flash('info', 'Success');
}

const getReg = await regFact.getReg();
// console.log(getReg)
 const error = await regFact.error(params);
 if (error) {
      req.flash('info', 'No Registration number entered');
 }

     res.render('index', {
          display: getReg,
     });
});

app.get('/reg_number', async function (req, res) {
const dropDown = req.query.dropDown;
console.log(dropDown);

const filter = await regFact.filter(dropDown);
     console.log(filter)
     res.render('index', {
           display2: filter
     });
});

app.post("/reset", async function (req, res) {
     await regFact.resetBtn();

     res.redirect("/");
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
     console.log('App starting on port', PORT);
});
*/