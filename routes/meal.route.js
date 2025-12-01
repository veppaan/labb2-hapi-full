const mealController = require("../controllers/meal.controller");
const Joi = require("joi");

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
            handler: mealController.addMeal,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().min(3).max(20).required(),
                        price: Joi.number().min(1).max(200).required(),
                        lactose: Joi.boolean()
                    }),
                    failAction: (request, h, error) => {
                        console.log('Validation error:', error);
                        throw error;
                    }
                }
            }
        }
    ])
}