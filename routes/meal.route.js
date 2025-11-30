const mealController = require("../controllers/meal.controller");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/meals",
            handler: mealController.getMeals
        },
        {
            method: "POST",
            path: "/meals",
            handler: mealController.addMeal
        }
    ])
}