const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
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
  })
  .then((createdRecipe) => {
    console.log(`${createdRecipe.title}'s recipe created successfully!`);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((createdRecipes) => {
    console.log(
      `${createdRecipes.length} recipes created successfully:`,
      createdRecipes.map((recipe) => recipe.title)
    );
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((modifiedRecipe) => {
    console.log(`${modifiedRecipe.title}'s duration modified successfully!`);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log(`${deletedRecipe.deletedCount} recipe deleted successfully!`);
  })
  .then(() => {
    mongoose.connection.close();
    console.log("Database closed successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
