import express from "express";
import axios from "axios";
import bodyParser from "body-parser";



const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const rapidAPIKey = "d227a23bc2msh1eed8f473a8f31ap198f9djsn40b82305cb9d";


app.get("/", (req, res) => {
    res.render("index.ejs",{ content: "Waiting for input..." });
  });

app.post("/get-recipe", async (req, res) => {
const { minProtein, minFat, minCarbs, maxCalories } = req.body;
const params = {
  minProtein : minProtein,
  minFat : minFat,
  minCarbs : minCarbs,
  maxCalories:maxCalories,
};
const options = {
  method: "GET",
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients',
  params: params,
  headers: {
    'X-RapidAPI-Key': rapidAPIKey,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
}
try {
  const result = await axios.request(options);
  const recipes = result.data
  res.render("index.ejs", {content : recipes});
} catch (error) {
  console.error(error)
  res.render("index.ejs", { content: [] }); 
}
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });