module.exports = function(app, shopData) {
//get all books from database
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
        res.redirect('./'); 
        }
         let newData = Object.assign({}, shopData, {availableBooks:result});
        console.log(newData)
        res.render("list.ejs", newData)
        });
        });
        
    //Same as list but sqlQuery only get from under 20(£20)    
    app.get('/bargainbooks', function(req, res) {
        // query database to get all the books less than 20
        let sqlquery = "SELECT * FROM books WHERE price < 20"; 
    // execute sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
        res.redirect('./'); 
        }
        let newData = Object.assign({}, shopData, {availableBooks:result});
        console.log(newData)
        res.render("bargainbooks.ejs", newData)
        });
        });
    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    app.get('/addbook',function(req,res){
        res.render('addbook.ejs', shopData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        res.send("You searched for: " + req.query.keyword);
    });
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });                                                                                                 
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    }); 
    //when books are added they go into the Database
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }
        else {
            // when the book is added the name and price is shown
        res.send(' This book is added to database, name: '
         + req.body.name + ' price '+ req.body.price);
        }
        });
        });
}
