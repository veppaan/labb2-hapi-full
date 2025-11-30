'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {

    const server = Hapi.server({
        port: 5001,
        host: '0.0.0.0'
    });

    //Anslut till Mongodb
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Connected to MongoDB")
    }).catch((error) => {
        console.error("Error connecting to database: " + error);
    });

    //Model för MongoDB
    const Meal = mongoose.model("Meal", {
        title: String,
        price: Number,
        lactose: Boolean
    });
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

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();