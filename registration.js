module.exports = function regFactory(pool) {
  async function addReg(params) {
    if (params !== "") {
      var sub = params.substring(0, 2);

      console.log(params);

      const regValue = await pool.query("select * from regnumbers where reg = $1",[params]);
      const idValue = await pool.query("select id from towns where loc = $1", [sub]);
      var idIndex = idValue.rows[0].id;

      if (idIndex.rowCount > 0) {
        await pool.query("select * from regnumbers where reg = $1", [params]);
      }

      if (idIndex.rowCount > 0) {
        await pool.query("select * from regnumbers", [params]);
      }

      if (regValue.rowCount === 0) {
        const INSERT_QUERY ="insert into regnumbers(reg, town_id) values ($1, $2)";
        await pool.query(INSERT_QUERY, [params, idIndex]);
      }
    }
  }

  async function duplicate(params) {
    const regValue = await pool.query("select * from regnumbers where reg = $1",[params]);

    if (regValue.rowCount === 0) {
      return true;
    }
    return false;
  }

  async function filter(location) {
    if (location === "All") {
      const all = await pool.query("select reg from regnumbers");
      return all.rows;
    } else {
      const filtered = await pool.query("select reg from regnumbers where town_id = $1",[location]);
      return filtered.rows;
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
    var plateRegex = /C[AYL] \d{4,6 }$/;
    if (
      (plateInput !== "" && plateInput.startsWith("CA")) ||
      plateInput.startsWith("CY") ||
      plateInput.startsWith("CL")
    ) {
      var newPlate = plateInput.replace(plateRegex, "");
      var upperCase = newPlate.toUpperCase();
      console.log("=> " + plateInput);
      return upperCase;
    }
    return "";
  }

  function valid(plateInput) {
    if (
      plateInput.startsWith("CA") ||
      plateInput.startsWith("CY") ||
      plateInput.startsWith("CL")
    ) {
      return "valid";
    } else {
      return false;
    }
  }

  return {
    regex,
    location,
    filter,
    addReg,
    getReg,
    resetBtn,
    error,
    valid,
    duplicate,
  };
};
