const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const data = require("../data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app-promise-all";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const createdRecipe = Recipe.create({
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

    const dataRecipes = Recipe.insertMany(data);

    Promise.all([createdRecipe, dataRecipes])
      .then((createdRecipes) => {
        console.log(
          `${createdRecipes[0].title}'s recipe created successfully!`
        );
        console.log(
          `${createdRecipes[1].length} recipes created successfully:`,
          createdRecipes[1].map((recipe) => recipe.title)
        );
      })
      .then(() => {
        const modifiedRecipe = Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        );

        const deletedRecipe = Recipe.deleteOne({ title: "Carrot Cake" });

        Promise.all([modifiedRecipe, deletedRecipe])
          .then((modifiedRecipes) => {
            console.log(
              `${modifiedRecipes[0].title}'s duration modified successfully!`
            );
            console.log(
              `${modifiedRecipes[1].deletedCount} recipe deleted successfully!`
            );
          })
          .then(() => {
            mongoose.connection.close();
            console.log("Database closed successfully!");
          })
          .catch((err) => {
            console.log("Error editing the recipes: ", err);
          });
      })
      .catch((err) => {
        console.log("Error creating the recipes: ", err);
      });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });
