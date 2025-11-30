const mongoose = require("mongoose");

//Schema för MongoDB
const mealSchema = mongoose.Schema({
    title: String,
    price: Number,
    lactose: Boolean
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;