const serieController = require("../controllers/serie.controller");
const Joi = require("joi");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/series",
            handler: serieController.getSeries
        },
        {
            method: "GET",
            path: "/series/{id}",
            handler: serieController.getOneSerie
        },
        {
            method: "POST",
            path: "/series",
            handler: serieController.addSerie,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().min(3).max(20).required(),
                        points: Joi.number().min(1).max(10).required(),
                        seen: Joi.boolean()
                    })
                }
            }
        },
        {
            method: "UPDATE",
            path: "/series/{id}",
            handler: serieController.updateSerie
        },
        {
            method: "DELETE",
            path: "/series/{id}",
            handler: serieController.deleteSerie
        }
    ])
}