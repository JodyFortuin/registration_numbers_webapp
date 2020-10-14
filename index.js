let express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const regFactory = require('./registration');

let app = express();

const pg = require("pg");
const Pool = pg.Pool;

//const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings';

const pool = new Pool({
     connectionString
});
const reg = regFactory(pool);

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

});

app.post('/greet', async function (req, res) {


     res.render('index', );
});

app.get('/greeted', async function (req, res) {

     res.render('greeted', );
});

app.get('/counter/:nameItem', async function (req, res) {


     res.render('counter', );
});

app.post("/reset", async function (req, res) {

     res.redirect("/");
})

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
     console.log('App starting on port', PORT);
});
