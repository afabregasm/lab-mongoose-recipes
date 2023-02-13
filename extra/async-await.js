const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const data = require("../data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app-async-await";

async function updateRecipesDB() {
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${x.connection.name}"`);

    await Recipe.deleteMany();

    const createdRecipe = await Recipe.create({
      title: "Spaghetti Carbonara",
      level: "Amateur Chef",
      ingredients: [
        "Spaghetti",
        "Bacon",
        "Cooking Cream",
        "Parmesan",
        "White Pepper",
        "Salt",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=440,400",
      duration: 35,
      creator: "Chef Andrea",
    });
    console.log(`${createdRecipe.title}'s recipe created successfully!`);

    const createdRecipes = await Recipe.insertMany(data);
    console.log(
      `${createdRecipes.length} recipes created successfully:`,
      createdRecipes.map((recipe) => recipe.title)
    );

    const modifiedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`${modifiedRecipe.title}'s duration modified successfully!`);

    const deletedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(`${deletedRecipe.deletedCount} recipe deleted successfully!`);

    await mongoose.connection.close();
    console.log("Database closed successfully!");
  } catch (err) {
    console.log("Error: ", err);
  }
}

updateRecipesDB();
