const Serie = require("../models/serie.model");

//Ge välkomsmeddelande
exports.welcomeMsg = async(request, h) => {
    try {
        return "Välkommen till API:et, lägg till ändelsen /series för att komma till serierna";
    } catch(err) {
        return h.response("Error with welcome-route: " + err).code(500);
    }
}

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
        const serie = await Serie.findById(request.params.id);
        //Kollar om serie finns, om inte så skrivs ett felmeddelande
        if(!serie){
            return h.response({ message: "Serie med angivet id hittas inte, kontrollera och försök igen"}).code(404);
        } else {
            return await Serie.findById(request.params.id);
        }
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
        return h.response("Error with post-route: " + err.messages).code(500);
    }
}

//Uppdatera serie
exports.updateSerie = async(request, h) => {
    try {
        const serie = await Serie.findById(request.params.id);
        //Kollar om serie finns, om inte så skrivs ett felmeddelande
        if(!serie){
            return h.response({ message: "Serie med angivet id hittas inte, kontrollera och försök igen"}).code(404);
        } else {
            const updateSerie = await Serie.findByIdAndUpdate(request.params.id, request.payload,{ new: true, runValidators: true });
            if(!updateSerie){
                return h.response({ message: "Serie med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Uppdateringen lyckades med serien ${updateSerie.title}`});
            }
        }
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