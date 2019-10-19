const express= require("express");

const app= express();


//index route

app.get('/', (req, res) => {
  res.send("index page");
});

//about route

app.get('/about', (req, res) => {
  res.send("about");
});





const PORT=3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});