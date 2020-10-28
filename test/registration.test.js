let assert = require("assert");
let regFact = require("../registration");

describe("Registration Database Unit Test", function () {

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';
  const pool = new Pool({
    connectionString
  });

  const INSERT_QUERY = "insert into regnumbers(reg, town_id) values ($1, $2)";

  beforeEach(async function () {
    await pool.query("delete from regnumbers");
  });

  it("should be able to insert a registration number", async function () {

    let regFactory = regFact(pool);

    await pool.query(INSERT_QUERY, ["CA123456", 1]);

    assert.deepEqual([{"reg": "CA123456", "town_id": 1}], await regFactory.getReg());

});


it("should be able to display all registration numbers when 'All' is selected", async function () {

    let regFactory = regFact(pool);

    await pool.query(INSERT_QUERY, ["CA123456", "1"]);
    await pool.query(INSERT_QUERY, ["CY432432", "2"]);
    await pool.query(INSERT_QUERY, ["CL542333", "3"]);
    
    assert.deepEqual([{"reg": "CA123456"},
    {"reg": "CY432432"},
    {"reg": "CL542333"}], await regFactory.filter("All"));

});

it("should be able to display all registration numbers for Cape Town when 'Cape Town' is selected", async function () {

    let regFactory = regFact(pool);

    await pool.query(INSERT_QUERY, ["CA123456", "1"]);
    await pool.query(INSERT_QUERY, ["CA432432", "1"]);
    await pool.query(INSERT_QUERY, ["CL542333", "3"]);
    await pool.query(INSERT_QUERY, ["CY111111", "2"]);
    await pool.query(INSERT_QUERY, ["CL222222", "3"]);
    await pool.query(INSERT_QUERY, ["CY463749", "2"]);
    await pool.query(INSERT_QUERY, ["CL958473", "3"]);
    
    assert.deepEqual([{"reg": "CA123456"},
    {"reg": "CA432432"}], await regFactory.filter("1"));

});

it("should be able to display all registration numbers for Bellville when 'Bellville' is selected", async function () {

    let regFactory = regFact(pool);

    await pool.query(INSERT_QUERY, ["CA123456", "1"]);
    await pool.query(INSERT_QUERY, ["CY555555", "2"]);
    await pool.query(INSERT_QUERY, ["CY444444", "2"]);
    await pool.query(INSERT_QUERY, ["CY432432", "2"]);
    await pool.query(INSERT_QUERY, ["CL542333", "3"]);

    assert.deepEqual([{"reg": "CY555555"},
    {"reg": "CY444444"},
    {"reg": "CY432432"}], await regFactory.filter("2"));

});

it("should be able to display all registration numbers for Stellenbosch when 'Stellenbosch' is selected", async function () {

    let regFactory = regFact(pool);

    await pool.query(INSERT_QUERY, ["CA123456", "1"]);
    await pool.query(INSERT_QUERY, ["CY432432", "2"]);
    await pool.query(INSERT_QUERY, ["CL333333", "3"]);
    await pool.query(INSERT_QUERY, ["CL333222", "3"]);
    await pool.query(INSERT_QUERY, ["CL542333", "3"]);
    await pool.query(INSERT_QUERY, ["CA978767", "1"]);
    await pool.query(INSERT_QUERY, ["CY858090", "2"]);
    await pool.query(INSERT_QUERY, ["CY797679", "2"]);
    
    assert.deepEqual([{"reg": "CL333333"},
    {"reg": "CL333222"},
    {"reg": "CL542333"}], await regFactory.filter("3"));

});

});
