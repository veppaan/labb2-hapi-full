const Meal = require("../models/serie.model");

exports.getSeries = async(request, h) => {
    try {
        return await Meal.find();
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}

exports.addSerie = async(request, h) => {
    try {
        const meal = new Meal(request.payload);
        return await meal.save();
    } catch(err) {
        return h.response("Error with post-route: " + err).code(500);
    }
}