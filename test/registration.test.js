let assert = require("assert");
let regFact = require("../registration");

describe("Registration Database Unit Test", function () {

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';
  const pool = new Pool({
    connectionString
  });

  beforeEach(async function () {
    await pool.query("delete from regnumbers");
  });

  it("should be able to insert a registration number", async function () {

    let regFactory = regFact(pool);
    const INSERT_QUERY = await regFactory.addReg("CA 123456", 1);
 
    assert.deepEqual([{"reg": "CA 123456", "town_id": 1}], await regFactory.getReg());

});

it("should be able to delete all registration numbers from the database", async function () {

  let regFactory = regFact(pool);

  const INSERT_QUERY = await regFactory.addReg("CA 123456", 1);
  const INSERT_QUERY2 = await regFactory.addReg("CY 123456", 2);
  const INSERT_QUERY3 = await regFactory.addReg("CL 123456", 3);
  const DELETE_QUERY = await regFactory.resetBtn();

  assert.deepEqual([], await regFactory.getReg());

});

it("should be able to check for duplicates", async function () {

  let regFactory = regFact(pool);

  const INSERT_QUERY = await regFactory.addReg("CA 123456", 1);
  const INSERT_QUERY2 = await regFactory.addReg("CA 123456", 1);

  assert.deepEqual(true, await regFactory.duplicate());

});

it("should be able to display all registration numbers when 'All' is selected", async function () {

    let regFactory = regFact(pool);

    const INSERT_QUERY = await regFactory.addReg("CA123456", 1);
    const INSERT_QUERY2 = await regFactory.addReg("CY432432", 2);
    const INSERT_QUERY3 = await regFactory.addReg("CL542333", 3);

    assert.deepEqual([{"reg": "CA123456"},
    {"reg": "CY432432"},
    {"reg": "CL542333"}], await regFactory.filter("All"));

});

it("should be able to display all registration numbers for Cape Town when 'Cape Town' is selected", async function () {

    let regFactory = regFact(pool);

    const INSERT_QUERY = await regFactory.addReg("CA123456", 1);
    const INSERT_QUERY2 = await regFactory.addReg("CA432432", 1);
    const INSERT_QUERY3 = await regFactory.addReg("CL542333", 3);
    const INSERT_QUERY4 = await regFactory.addReg("CY111111", 2);
    const INSERT_QUERY5 = await regFactory.addReg("CL222222", 3);
    const INSERT_QUERY6 = await regFactory.addReg("CY463749", 2);
    const INSERT_QUERY7 = await regFactory.addReg("CL958473", 3);
    
    assert.deepEqual([{"reg": "CA123456"},
    {"reg": "CA432432"}], await regFactory.filter("1"));

});

it("should be able to display all registration numbers for Bellville when 'Bellville' is selected", async function () {

    let regFactory = regFact(pool);

    const INSERT_QUERY = await regFactory.addReg("CA123456", 1);
    const INSERT_QUERY2 = await regFactory.addReg("CY555555", 2);
    const INSERT_QUERY3 = await regFactory.addReg("CY444444", 2);
    const INSERT_QUERY4 = await regFactory.addReg("CY432432", 2);
    const INSERT_QUERY5 = await regFactory.addReg("CL542333", 3);

    assert.deepEqual([{"reg": "CY555555"},
    {"reg": "CY444444"},
    {"reg": "CY432432"}], await regFactory.filter("2"));

});

it("should be able to display all registration numbers for Stellenbosch when 'Stellenbosch' is selected", async function () {

    let regFactory = regFact(pool);

    const INSERT_QUERY = await regFactory.addReg("CA123456", 1);
    const INSERT_QUERY2 = await regFactory.addReg("CY432432", 2);
    const INSERT_QUERY3 = await regFactory.addReg("CL333333", 3);
    const INSERT_QUERY4 = await regFactory.addReg("CL333222", 3);
    const INSERT_QUERY5 = await regFactory.addReg("CL542333", 3);
    const INSERT_QUERY6 = await regFactory.addReg("CA978767", 1);
    const INSERT_QUERY7 = await regFactory.addReg("CY858090", 2);
    const INSERT_QUERY8 = await regFactory.addReg("CY797679", 2);

    assert.deepEqual([{"reg": "CL333333"},
    {"reg": "CL333222"},
    {"reg": "CL542333"}], await regFactory.filter("3"));

});

});
