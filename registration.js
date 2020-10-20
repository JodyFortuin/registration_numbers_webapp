module.exports = function regFactory(pool) {

    function regNumFactory() {
        var mainRegList = {};
    }

      /*function addButton(plateNumber){
          // var regValue = ""
      
          if (plateNumber!=="") {
            mainRegList.push(plateNumber);
          } else if (plateNumber == ""){
            errorTextElem.innerHTML = "please enter reg number";
          }
        }*/

        async function addReg(params){

          const INSERT_QUERY = 'insert into regnumbers(reg, town_id) values ($1, $2)';
          const INSERT_TOWNS = 'insert into towns(town_name, loc) values ($1, $2)';
          await pool.query(INSERT_QUERY, [params, params.town_id]);
          
          const q = 'SELECT loc FROM towns INNER JOIN regnumbers ON towns.id = regnumbers.town_id';
          await pool.query(q);

          /*if(params.startsWith("CA")){
              await pool.query(INSERT_TOWNS, ["Cape Town", "CA"]);
          } else if (params.startsWith("CY")){
              await pool.query(INSERT_TOWNS, ["Bellville", "CY"]);
          } else if(params.startsWith("CL")){
              await pool.query(INSERT_TOWNS, ["Stellenbosch", "CL"]);
          }*/
        }

        async function getReg(){

          const regs = await pool.query('select reg, town_id from regnumbers');
          return regs.rows;
        }

        async function resetBtn(){
          const DELETE_QUERY = 'delete from regnumbers';
          const DELETE_TOWNS = 'delete from towns';
          await pool.query(DELETE_QUERY);
          await pool.query(DELETE_TOWNS);
        }

        function error(plateInput){
          if (plateInput === ""){
              return "no reg number";
          }
        }

        function location(plateNum) {
          if (plateNum !== "") {
            regPlate = plateNum;
          }
          return regPlate;
        }
      
        function regNumRegex(plateInput) {
          var chars = /[^A-Za-z0-9]/g;
          if (plateInput !== "") {
            var newPlate = plateInput.replace(chars, "");  
            var upperCase = newPlate.toUpperCase();
            return upperCase;
            }
            return "";     
         }
      
        function filter(loc) {
          const filtered = {};
          for (var i = 0; i < mainRegList.length; i++) {
            var newReg = mainRegList[i];
            console.log(newReg)
            if (newReg.startsWith(loc)) {
              filtered.push(newReg);
            }
          }
          
          console.log(newReg)
          return filtered;
        }
      
        
      
      function allRegs(){
      
        return mainRegList;
      }
        return {
          regNumFactory,
          regNumRegex,
          location,
          filter,
          addReg,
          getReg,
          allRegs,
          resetBtn,
          error
        };
      }

      
//insert into towns (id, town_name, loc) values (1, 'Cape Town', 'CA');
//insert into towns (id, town_name, loc) values (2, 'Bellville', 'CY');
//insert into towns (id, town_name, loc) values (3, 'Stellenbosch', 'CL');

//alter table regnumbers add foreign key (town_id) references towns(id);