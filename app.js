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
  const title="Welcome"
  res.render("index",{
    title:title
  });
});

//about route

app.get('/about', (req, res) => {
  res.render("about");
});





const PORT=3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});