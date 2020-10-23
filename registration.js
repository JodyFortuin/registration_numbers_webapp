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
          await pool.query(INSERT_QUERY, [params, params.town_id]);
          
        /*  const idValue = ('select id from towns where value = $1',[]);
          const INSERT_ID = 'insert into regnumbers(town_id) value($1)'
          var idIndex = idValue.rows[0].id;
          if(idValue.rowCount > 0){
            await pool.query(INSERT_ID, [idIndex]);
          }*/
          
        }

        async function getReg(){

          const regs = await pool.query('select reg, town_id from regnumbers');
          return regs.rows;
        }

        async function resetBtn(){
          const DELETE_QUERY = 'delete from regnumbers';
          await pool.query(DELETE_QUERY);
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
      
        function regex(plateInput) {
          var plateRegex = /C[AYL] \d{4,6}$/;
          if (plateInput !== ""){
            // var sub = plateInput.substring(0, 2);
            var newPlate = plateInput.replace(plateRegex, "");
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
          regex,
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