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

     res.render('index', );
});

app.post('/reg_number', async function (req, res) {
/*const plate = req.body.plateNum;
const plate2 = req.body.plateNumber;

const add = await regFact.addButton(plate2);
const plateDisplay = await regFact.location(plate);
*/
const params = req.body.textNumItem;
console.log(params)
if(params){
const addReg = await regFact.addReg(params);
}
const getReg = await regFact.getReg();

const error = await regFact.error(req.body.textNumItem);
if (error) {
     req.flash('info', 'No Registration number entered');
}

     res.render('index', {
          display: getReg,
     });
});

app.get('/reg_number', async function (req, res) {

     
     res.render('', );
});

app.get('/counter/:nameItem', async function (req, res) {


     res.render('counter', );
});

app.post("/reset", async function (req, res) {
     await regFact.resetBtn();

     res.redirect("/");
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
     console.log('App starting on port', PORT);
});
