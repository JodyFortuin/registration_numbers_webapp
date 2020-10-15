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
          await pool.query(INSERT_QUERY, [params.reg,params.town_id]);
        }

        async function getReg(){

          const regs = await pool.query('select reg, town_id from regnumbers');
          return regs.rows;
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
        };
      }