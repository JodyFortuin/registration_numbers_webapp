module.exports = function regFactory(pool) {

  async function addReg(params) {
    var plateRegex = /C[AYL] \d{4,6}$/;
    // if (plateRegex){

    var sub = params.substring(0, 2);
    // console.log(sub)
    
    console.log(params);
    const regValue = await pool.query('select * from regnumbers where reg = $1', [params]);
    const idValue = await pool.query('select id from towns where loc = $1', [sub]);
    var idIndex = idValue.rows[0].id;
    //console.log(idIndex.rowCount)
    if (idIndex.rowCount > 0) {
      await pool.query("select * from regnumbers where reg = $1", [params]);
    }
    
    if (regValue.rowCount === 0) {
      const INSERT_QUERY = "insert into regnumbers(reg, town_id) values ($1, $2)";
      await pool.query(INSERT_QUERY, [params, idIndex]);
    }
    // }
  }

  async function filter(location){
    if (location = "All"){
        await pool.query('select reg from regnumbers')
      }
       else {
        await pool.query("select reg from regnumbers where town_id = $1",[location]);
      }
    }

  async function getReg() {
    const regs = await pool.query("select reg, town_id from regnumbers");
    return regs.rows;
  }

  async function resetBtn() {
    const DELETE_QUERY = "delete from regnumbers";
    await pool.query(DELETE_QUERY);
  }

  function error(plateInput) {
    if (plateInput === "") {
      return "no reg number";
    }
  }

  function location(plateNum) {
    if (plateNum !== "") {
      regPlate = plateNum;
    }
    return regPlate;
  }

  function regex(plateInput) {
    var plateRegex = /C[AYL] \d{4,6}$/;
    if (plateInput !== "") {
      var newPlate = plateInput.replace(plateRegex, "");
      var upperCase = newPlate.toUpperCase();
      // console.log(plateInput)
      return upperCase;
    }
    return "";
  }

  return {
    regex,
    location,
    filter,
    addReg,
    getReg,
    resetBtn,
    error,
  };
};

//insert into towns (id, town_name, loc) values (1, 'Cape Town', 'CA');
//insert into towns (id, town_name, loc) values (2, 'Bellville', 'CY');
//insert into towns (id, town_name, loc) values (3, 'Stellenbosch', 'CL');

//alter table regnumbers add foreign key (town_id) references towns(id);
