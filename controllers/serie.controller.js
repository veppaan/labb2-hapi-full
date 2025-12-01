const Serie = require("../models/serie.model");

//Hämta alla serier
exports.getSeries = async(request, h) => {
    try {
        return await Serie.find();
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}
//Hämta en serie
exports.getOneSerie = async(request, h) => {
    try {
        return await Serie.findById(request.params.id);
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}
//Lägg till en serie
exports.addSerie = async(request, h) => {
    try {
        const serie = new Serie(request.payload);
        return await serie.save();
    } catch(err) {
        return h.response("Error with post-route: " + err).code(500);
    }
}

//Uppdatera serie
exports.updateSerie = async(request, h) => {
    try {
        return await Serie.findByIdAndUpdate(request.params.id, request.payload,{ new: true, runValidators: true });
    } catch(err) {
        return h.response("Error with update-route: " + err).code(500);
    }
}

//Radera serie
exports.deleteSerie = async(request, h) => {
    try {
        return await Serie.findByIdAndDelete(request.params.id);
    } catch(err) {
        return h.response("Error with delete-route: " + err).code(500);
    }
}