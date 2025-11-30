const Meal = require("../models/meal.model");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/meals",
            handler: async (request, h) => {
                try {
                    return await Meal.find();
                } catch(err) {
                    return h.response("Error with get-route: " + err).code(500);
                }
            }
        },
        {
            method: "POST",
            path: "/meals",
            handler: async (request, h) => {
                try {
                    const meal = new Meal(request.payload);
                    return await meal.save();
                } catch(err) {
                    return h.response("Error with post-route: " + err).code(500);
                }
            }
        }
    ])
}