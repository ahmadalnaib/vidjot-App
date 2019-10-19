const express= require("express");
const exphbs  = require('express-handlebars');


const app= express();



//handlebar 

app.engine('handlebars', exphbs({
  defaultLayout:"main"
}));
app.set('view engine', 'handlebars'); 


//index route

app.get('/', (req, res) => {
  res.render("index");
});

//about route

app.get('/about', (req, res) => {
  res.send("about");
});





const PORT=3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});