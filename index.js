import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const rapidAPIKey = "d0f4b83629msh1748c058634af2fp1d4b66jsn4fa141e458b3";


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

// Route to fetch additional information for a specific recipe
app.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    });
    const recipeDetails = response.data;
    res.send(recipeDetails); // You can format this data as needed and pass it to the view
  } catch (error) {
    console.error("Error fetching recipe information:", error);
    res.status(500).send({ error: "Failed to fetch recipe information." });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
