let express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const regFactory = require("./registration");

let app = express();

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg123@localhost:5432/reg_numbers";

const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
});
const regFact = regFactory(pool);
const registration = require("./routes");

const regRoutes = registration(regFact);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", regRoutes.home)

app.post("/reg_number", regRoutes.add)

app.get("/reg_number", regRoutes.filter)

app.post("/reset", regRoutes.reset)

let PORT = process.env.PORT || 3080;

app.listen(PORT, function () {
  console.log("App starting on port", PORT);
});
