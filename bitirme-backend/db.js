const { Sequelize, Model } = require("sequelize");




const sequelize = new Sequelize('db', 'root', 'root', {
    dialect: 'mysql',

});
places = require("./models/place2")(sequelize, Sequelize)
Destination = require("./models/destination")(sequelize, Sequelize)
User = require("./models/user")(sequelize, Sequelize)
Answer = require("./models/answer")(sequelize, Sequelize)
Question = require("./models/question")(sequelize, Sequelize)
Location = require("./models/location")(sequelize, Sequelize)
Suggestion = require("./models/suggestion")(sequelize, Sequelize)
Place_detail = require("./models/place_detail")(sequelize, Sequelize)
Image_table = require("./models/image")(sequelize, Sequelize)
Adress = require("./models/adress")(sequelize, Sequelize)
Comment = require("./models/comment")(sequelize, Sequelize)
Favourite = require("./models/favourite")(sequelize, Sequelize)
opening_hours = require("./models/Opening_hours")(sequelize, Sequelize)
Hotel_propreties = require("./models/Hotel_propreties")(sequelize, Sequelize)
Places_hotel_propreties = require("./models/places_hotel_propreties")(sequelize, Sequelize)
place_type = require("./models/place_type")(sequelize, Sequelize)
places_has_place_type = require("./models/places_has_place_type")(sequelize, Sequelize)

Destination.hasMany(places, {
    as: "places",
    foreignKey: "destination_id"
});

places.belongsTo(Destination,
    {
        as: "Destination",
        foreignKey: "destination_id"
    });

Question.hasMany(Answer,
    {
        as: "Answer",
        foreignKey: "question_id"
    })

Answer.belongsTo(Question, {
    as: "Question",
    foreignKey: "question_id"
})

places.hasMany(Image_table, {
    as: "Image",
    foreignKey: "place_id"
});

Image_table.belongsTo(places,
    {
        as: "places",
        foreignKey: "place_id"
    });

places.hasMany(Place_detail, {
    as: "Place_detail",
    foreignKey: "place_id"
});

Place_detail.belongsTo(places,
    {
        as: "places",
        foreignKey: "place_id"
    });
places.hasMany(Adress, {
    as: "adress",
    foreignKey: "place_id"
});

Adress.belongsTo(places,
    {
        as: "places",
        foreignKey: "place_id"
    });
Suggestion.hasMany(Place_detail, {
    as: "Place_detail",
    //foreignKey: "suggestion_id",
    foreignKey: {
        name: 'suggestion_id',
        allowNull: true
      }
});

Place_detail.belongsTo(Suggestion,
    {
        as: "Suggestion",
       //foreignKey: "suggestion_id",
    foreignKey: {
        name: 'suggestion_id',
        allowNull: true
      }
    });
Suggestion.hasMany(Image_table, {
    as: "Image",

    foreignKey: "suggestion_id"
});

Image_table.belongsTo(Suggestion,
    {
        as: "Suggestion",
        foreignKey: "suggestion_id"
    });


User.hasMany(Comment, {
    as: "comment",
    foreignKey: "user_id"
});

Comment.belongsTo(User,
    {
        as: "User",

        foreignKey: "user_id"
    });
User.hasMany(Favourite, {
    as: "Favourite",
    foreignKey: "user_id"
});

Favourite.belongsTo(User,
    {
        as: "User",

        foreignKey: "user_id"
    });
Favourite.belongsTo(places,
    {
        as: "places",

        foreignKey: "place_id"
    });
places.hasMany(Favourite,
    {
        as: "Favourite",

        foreignKey: "place_id"
    });
opening_hours.belongsTo(places,
    {
        as: "places",
        foreignKey: "place_id"
    })
places.hasMany(opening_hours,
    {
        as: "Opening_hours",
        foreignKey: "place_id"
    })
Hotel_propreties.hasMany(Places_hotel_propreties,
    {

        as: "Places_hotel_propreties",
        foreignKey: "propreties_id"
    })
Places_hotel_propreties.belongsTo(Hotel_propreties, {
    as: "Hotel_propreties",
    foreignKey: "propreties_id"
})

places.hasMany(Places_hotel_propreties,
    {

        as: "Places_hotel_propreties",
        foreignKey: "place_id"
    })
Places_hotel_propreties.belongsTo(places, {
    as: "places",
    foreignKey: "place_id"
})
Location.belongsTo(Destination, {
    as: "Destination",
    foreignKey: "destination_id"
})
Destination.belongsTo(Location, {
    as: "Location",
    foreignKey: "destination_id"
})

place_type.hasMany(places_has_place_type,
    {

        as: "places_has_place_type",
        foreignKey: "type_id"
    })
places_has_place_type.belongsTo(place_type, {
    as: "place_type",
    foreignKey: "type_id"
})

places.hasMany(places_has_place_type,
    {

        as: "places_has_place_type",
        foreignKey: "place_id"
    })
    places_has_place_type.belongsTo(places, {
    as: "places",
    foreignKey: "place_id"
})


module.exports = sequelize
global.sequelize = sequelize

