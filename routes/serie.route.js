const serieController = require("../controllers/serie.controller");
const Joi = require("joi");

module.exports = (server) => {
    //Felhantering som visar mina specifika meddelanden
    const failAction = (request, h, error) => {
        return h.response({
          success: false,
          error: error.details[0].message
        }).code(400).takeover();
      };
    server.route([
        {
            //GET-route för välkomstmeddelande
            method: "GET",
            path: "/",
            handler: serieController.welcomeMsg
        },
        {
            //GET-route för att hämta alla serier
            method: "GET",
            path: "/series",
            handler: serieController.getSeries
        },
        {
            //GET-route för angivet id
            method: "GET",
            path: "/series/{id}",
            handler: serieController.getOneSerie
        },
        {
            //POST-route med valideringar och meddelanden
            method: "POST",
            path: "/series",
            handler: serieController.addSerie,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().min(3).max(50).required()
                        .messages({
                            'string.empty': 'Titel får inte vara tomt!',
                            'any.required': 'Titel är obligatorisk att fylla i!',
                            'string.base': 'Titel måste vara en sträng!',
                            'string.min': 'Titel får inte vara mindre än 3 tecken!',
                            'string.max': 'Titel får inte vara längre än 50 tecken!'
                        }),
                        points: Joi.number().precision(1).min(1).max(10).required()
                        .messages({
                            'number.base': 'Poäng måste vara ett nummer!',
                            'number.precision': 'Poängen får bara ha ett decimaltal, exempelvis 7.5!',
                            'any.required': 'Poäng är obligatorisk att fylla i!',
                            'number.min': 'Poäng får inte vara mindre än 1!',
                            'number.max': 'Poäng får inte vara högre än 10!'
                        }),
                        seen: Joi.boolean().required()
                        .messages({
                            'boolean.base': 'Seen/Sedd måste vara true eller false!',
                            'any.required': 'Seen/Sedd är obligatorisk att fylla i!'
                        }),
                    }),
                    failAction: failAction
                },
            }
        },
        {
            method: "PUT",
            path: "/series/{id}",
            handler: serieController.updateSerie,
            options: {
                validate: {
                    payload: Joi.object({
                        title: Joi.string().min(3).max(50).required()
                        .messages({
                            'string.empty': 'Titel får inte vara tomt!',
                            'any.required': 'Titel är obligatorisk att fylla i!',
                            'string.base': 'Titel måste vara en sträng!',
                            'string.min': 'Titel får inte vara mindre än 3 tecken!',
                            'string.max': 'Titel får inte vara längre än 50 tecken!'
                        }),
                        points: Joi.number().precision(1).min(1).max(10).required()
                        .messages({
                            'number.base': 'Poäng måste vara ett nummer!',
                            'number.precision': 'Poängen får bara ha ett decimaltal, exempelvis 7.5!',
                            'any.required': 'Poäng är obligatorisk att fylla i!',
                            'number.min': 'Poäng får inte vara mindre än 1!',
                            'number.max': 'Poäng får inte vara högre än 10!'
                        }),
                        seen: Joi.boolean().required()
                        .messages({
                            'boolean.base': '"Seen" måste vara true eller false!',
                            'any.required': '"Seen" är obligatorisk att fylla i!',
                            'number.min': 'Poäng får inte vara mindre än 1!',
                            'number.max': 'Poäng får inte vara högre än 10!'
                        }),
                    }),
                    failAction: failAction
                },
            }
        },
        {
            method: "DELETE",
            path: "/series/{id}",
            handler: serieController.deleteSerie
        }
    ])
}