module.exports = function regRoutes(pool) {

    async function home(req, res) {

        const getReg = await regFact.getReg();
   
        res.render('index', 
         {display: getReg}
        
        );
   }
   







return{
    home
}
}