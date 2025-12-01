const mongoose = require("mongoose");

//Schema för MongoDB
const seriesSchema = mongoose.Schema({
    title: String,
    points: Number,
    seen: Boolean
});

const Serie = mongoose.model("Serie", seriesSchema);

module.exports = Serie;