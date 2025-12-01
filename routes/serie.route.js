const serieController = require("../controllers/serie.controller");
const Joi = require("joi");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/meals",
            handler: serieController.getSeries
        },
        {
            method: "POST",
            path: "/meals",
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
        }
    ])
}