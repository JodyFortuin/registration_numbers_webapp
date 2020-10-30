module.exports = function regRoutes(regFact) {

    async function home(req, res) {
        const getReg = await regFact.getReg();
      
        res.render("index", { display: getReg });
      }

      async function add(req, res) {
        const params = req.body.textNumItem.toUpperCase();
        const regexPlate = await regFact.regex(params);
      
        const valid = await regFact.valid(params);
        const error = await regFact.error(params);
      
        if (valid) {
          const addReg = await regFact.addReg(regexPlate);
          req.flash("success", "Registration succesfully added!");
        } else if (error) {
           req.flash("info", "No Registration number entered");
         } else {
          req.flash("info", "Invalid registration entered");
        } 
      
        const getReg = await regFact.getReg();
      
        res.render("index", {
          display: getReg,
        });
    }

    async function filter(req, res) {
        const dropDown = req.query.dropDown;
        console.log(dropDown);
      
        const filter = await regFact.filter(dropDown);
        console.log(filter);
        res.render("index", {
          display2: filter,
        });
      }

    async function reset(req, res) {
       await regFact.resetBtn();
      
       res.redirect("/");
     }

return{
    home,
    add,
    filter,
    reset,
}
}