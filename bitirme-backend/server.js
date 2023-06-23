const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const puppeteer = require('puppeteer')
const Sequelize = require('sequelize');
const request = require('request');
const bcrypt = require("bcrypt")
var words = require("naughty-words");
var multer = require('multer');
const { JSON } = require("sequelize");
const openGeocoder = require('node-open-geocoder');





//const { default: App } = require("../bitirme-frontend/mon-app/src/App.js");






var upload = multer({ dest: '../bitirme-frontend/mon-app/public/cities_img' });
//var upload1 = multer({ dest: '../bitirme-frontend/mon-app/public/places' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../bitirme-frontend/mon-app/public/cities_img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage })

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../bitirme-frontend/mon-app/public/places');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload1 = multer({ storage: storage1 })

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../bitirme-frontend/mon-app/public/extra_images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload2 = multer({ storage: storage2 })


/*const { DataTypes } = Sequelize;
const sequelize = new Sequelize('db', 'root', 'root', {
    dialect: 'mysql',

});*/
require('./db.js');
var count = 0
async function scrape() {

    if (count === 1) { return } else {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0);

        await page.goto('https://tr.usembassy.gov/covid-19-information-2/', { waitUntil: 'load' })

        /*var element = await page.waitForSelector("#main > div > div > main > article > div.entry-content > p:nth-child(8)")
    
        var text = await page.evaluate(element => element.textContent, element)*/


        const titles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".entry-content p ")).map(x => x.textContent)
        })


        const elements = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".entry-content ul ")).map(x => x.textContent)
        })
        console.log(titles)
        //console.log(elements)
        await page.close()

        await browser.close()
        const obj = {};
        titles.forEach((element, index) => {
            /* if (element == 'Education') {
                 obj[element] = text
             } else {
                 obj[element] = elements[index];
             }*/
            obj[element] = elements[index];
        });
        count++

        console.log('done')
        console.log((obj))
        return obj


    }
}


const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

function comparePassword(plaintextPassword, hash) {
    return bool = bcrypt.compareSync(plaintextPassword, hash)

}
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password);
    /*User.findOne({
        where: { username: username }
    }).then(c => {
        const data=c.toJSON()
        console.log("heş")
        console.log(comparePassword(password,data.password))
        if (c ) {
            console.log(c.toJSON())
            res.send({ state: 'success', role: c.role });
        } else {
            res.send({ state: 'error' })
        }

    })*/
    User.findAll({
        raw: true,
        where: { username: username }
    }).then(c => {
        var element = c.find(function (element) { return comparePassword(password, element.password) })
        if (element) {
            console.log(element.role)
            res.send({ state: 'success', role: element.role, user_id: element.user_id });
        } else {
            res.send({ state: 'error' })
        }
    }

    )
})

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone_number = req.body.phone_number;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {
            console.log(hash)
            User.create({
                username: username,
                password: hash,
                email_address:email,
                phone_number:phone_number

            })
                .then(a => {
                    console.log(a.toJSON())
                    res.send("kaydedildi")
                })
        });
    })

})

//news page
app.get('/news', (req, res) => {

    scrape().then(text => res.json(text))
})

//destination page
app.get('/destination', (req, res) => {

    Destination.findAll({

        raw: true
    }).then(c => {
        res.send(c)

    })

})
app.get('/map', (req, res) => {
    Location.findAll({
        include: [{
            model: Destination,
            as: 'Destination',

        }],
        raw: true
    }).then(c => {
        console.log(c)
        res.send(c)
    })

})
app.post('/place', (req, res) => {
    const id = req.body.id;
    places.findAll({

        // where: { place_id: id },
        include: [
            {
                model: Favourite,
                as: 'Favourite',
                required: true,
                include: [
                    {
                        model: User,
                        as: "User",
                        required: true
                    }]
            }], raw: true
    }).then(c => {
        places.findAll({
            raw: true
        }).then(s => {
            Adress.findAll({
                raw: true
            }).then(d => {
                console.log(c)
                //console.log(d)
                res.json({ places: s, adress: d, favourite: c })
            })
        })



    })

})
app.get('/placess', (req, res) => {
    places.findAll({
        raw: true

    }).then(c => {
        Adress.findAll({
            raw: true
        }).then(d => {
            console.log(c)
            //console.log(d)
            res.json({ places: c, adress: d })
        })
    })

})
//app.get('/place1', (req, res) => {})
/*var type = upload.single('selectedFile');*/
app.post('/destination/upload', upload.any(), (req, res) => {
    if (req.files.length != 0) {
        var imgname = req.files[0].filename;

        const myArray = imgname.split(".");
        const img_name = myArray[0]
        const img = myArray[1]
        console.log(img_name, img)
        console.log(req.body.name)
        Destination.create({
            img_name: img_name,
            img: img,
            city_name: req.body.name
        })
            .then(a => {
                /*console.log(a.toJSON())*/
                res.send("kaydedildi")
            })
    }
})

app.post('/destination/upload1', upload1.any(), (req, res) => {
    console.log(req.files)
    if (req.files.length != 0) {
        var imgname = req.files[0].filename;
        console.log(imgname)
        const myArray = imgname.split(".");
        const img_name = myArray[0]
        const img = myArray[1]

        places.create({
            place_name: req.body.name,
            category: req.body.category,
            destination_id: req.body.id,
            img_name: img_name,
            img: img,


        })
            .then(a => {
                Adress.create({
                    adress: req.body.address,
                    place_id: a.place_id,

                }).then(a => {
                    console.log("kaydedildi")
                })



            })
    }
})

app.post('/detail/upload', upload2.any(), (req, res) => {
    console.log(req.files)
    if (req.files.length != 0) {
        var imgname = req.files[0].filename;
        console.log(imgname)
        console.log(req.body.id)


        Image_table.create({
            source: imgname,
            place_id: req.body.id


        })
            .then(a => {

                res.send("saved")


            })
    }
})
app.post('/coordinates', (req, res) => {
    console.log(req.body.cityname)

    var city = req.body.cityname;
    request.get({
        url: 'https://api.api-ninjas.com/v1/geocoding?city=' + city,
        headers: {
            'X-Api-Key': '59eXdN73ABaTdZEEfAzBpw==1n1ZussKYyIhkbvE'
        },
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            console.log(body)
            const data = JSON.parse(body)
            console.log(data[0].latitude)
            Location.create({
                lat: data[0].latitude,
                long: data[0].longitude,

            })
        }
    });
})
app.post('/detail', (req, res) => {

    const id = req.body.id;
    console.log(req.body.category)
    // console.log(req.body.address)
    if (req.body.category === "hotels") {


        places.findAll({
            required: false,
            where: { place_id: id },
            include: [
                {
                    model: Places_hotel_propreties,
                    as: 'Places_hotel_propreties',
                    required: true,
                    include: [
                        {
                            model: Hotel_propreties,
                            as: "Hotel_propreties"
                        }]
                }], raw: true

        }).then(c => {
            Hotel_propreties.findAll()
                .then(a => {
                    Image_table.findAll({
                        where: { place_id: id }
                    }).then(d => {

                        res.send({ data: c, images: d, propreties: a })
                    })
                })


        });


    }
    else {
        Image_table.findAll({
            required: false,
            include: [
                {
                    model: places,
                    as: 'places',
                    required: true,
                    include: [
                        {
                            model: Place_detail,
                            as: "Place_detail",
                           
                           
                        }]
                }],where: { place_id: id }, raw: true
        }).then(c => {
            opening_hours.findAll({
                where: { place_id: id },
                raw: true
            }).then(d => {
console.log(c)
                res.send({ data: c, hours: d })


            })

        })

    }
})

app.post("/Detail/add", (req, res) => {
    console.log(req.body.text)
    console.log(req.body.place_id)
    obj=[]
    var  texts=req.body.text.split("\n")
    texts=texts.filter((val) => val != "")
    texts.map(t=>{
        obj.push( {
            text: t,
            place_id: req.body.place_id
        })
    })
    console.log(texts)
    Place_detail.findAll(
        {
            where: { place_id: req.body.place_id },
            raw: true
        }).then(x => {
            if (x.length == 0) {
                Place_detail.bulkCreate(
                   obj
                   )
            } else {
                Place_detail.destroy(
                    {
                        where: {
                            place_id: req.body.place_id
                        }

                    })
                Place_detail.bulkCreate(
                   obj)
            }
        })

})


app.post("/delete", (req, res) => {
    Destination.destroy({
        where: { destination_id: req.body.id }

    })
    Location.destroy({
        where: { destination_id: req.body.id }
    })
    places.destroy({
        where: { destination_id: req.body.id }
    })
})
app.post("/image/delete", (req, res) => {
    Image_table.destroy({
        where: { image_id: req.body.id },
        restartIdentity: true

    })

})
app.post("/Faq/delete", (req, res) => {
    Question.destroy({
        where: { question_id: req.body.id },
        restartIdentity: true

    })

})
//faq page
app.post('/accordionQ', (req, res) => {
    const question = req.body.question;

    Question.create({
        question_text: question
    })

})

app.post('/accordionA', (req, res) => {
    const answer = req.body.answer;
    const questionid = req.body.questionid;

    Answer.create({
        answer_text: answer,
        question_id: questionid
    })

})
app.get('/faq', (req, res) => {
    /*Question.findAll({

        raw: true
    }).then(c => {
        const co = c 
       
        res.send(c)
        
       
    })*/


    Question.findAll({
        include: [{
            model: Answer,
            as: 'Answer',
        }], raw: true
    }).then(c => {
        res.send(c);
        console.log(c)
    })
})

app.post("/confirmation", (req, res) => {
    const confirmation = req.body.confirmation;
    const question_id = req.body.questionid;
    Question.update({ confirmation: confirmation }, {
        where: { question_id: question_id }
    })
})


app.get("/suggestion1", (req, res) => {
    Suggestion.findAll({
        raw: true,

    }).then(c => {
        res.send(c)
    })
})
app.post("/favourite", (req, res) => {
    console.log(req.body.id)
    console.log(req.body.favourite)
    places.update(
        { favourite: req.body.favourite },
        { where: { place_id: req.body.id } }
    )
    if (req.body.favourite) {
        Favourite.create({
            user_id: req.body.userId,
            place_id: req.body.id,

        })

    }
    else { Favourite.destroy({ where: { place_id: req.body.id } }) }


})

//home page suggestion
app.post('/suggestiondetail', (req, res) => {

    const id = req.body.id;

    Place_detail.findAll({
        include: [
            {
                model: Suggestion,
                as: 'Suggestion',
                required: true,
                include: [
                    {
                        model: Image_table,
                        as: "Image",

                        /*required:true,*/
                    }]


            }], where: { suggestion_id: id }, raw: true


    }).then(c => {
        console.log(c)
        res.send(c)
    })
})
app.post('/favouriteList', (req, res) => {
    Favourite.findAll({
        where: { user_id: req.body.userId },
        include: [
            {
                model: places,
                as: 'places',
                required: true,
                include: [{
                    model: Destination,
                    as: 'Destination',
                    required: true,
                }]
            },
        ], raw: true
    }).then(c => res.send(c))
})


//comment part
const CommentControl = (comment) => {
    var boolean = false
    var com = comment
//console.log(words.en)
    badwords = words.en

    badwords.map(x => {
      
        position = com.includes(x)
       // console.log(position)
        if (position) {
            boolean = true
            return boolean
        }
    })

    return boolean
}

app.post('/comment', (req, res) => {
    const comment = req.body.comment
    const starsRate = req.body.stars_rate
    const userId = req.body.userId
    const placeId = req.body.placeId
    //console.log(CommentControl(comment))
    if (CommentControl(comment)) { res.send("fail") }

    else {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        const today = date + "-" + month + "-" + year
        console.log(today)
        console.log(placeId)
    
       Comment.create({
            comment_text: comment,
            star_rating: starsRate,
            user_id: userId,
            place_id: placeId,
            date: today

        }).then(res.send("success"))


    }

})

app.post("/CommentList", (req, res) => {

    const placeId = req.body.placeId
    Comment.findAll({
        where: { place_id: placeId },
        include: [
            {
                model: User,
                as: 'User',
                required: true
            }], raw: true
    }).then((c) => {
        res.send(c)
    })
})

app.get("/CommentList", (req, res) => {


    Comment.findAll({

        include: [
            {
                model: User,
                as: 'User',
                required: true
            }], raw: true
    }).then((c) => {
        res.send(c)
    })
})

app.get("/placetype", (req, res) => {
    place_type.findAll({
        raw: true
    }).then((c) => {
        res.send(c)
        console.log(c)
    })
})

app.post("/hotel/add",(req,res)=>{
    obj=[]
   
    
    req.body.selected.map(t=>{
        obj.push( {
            propreties_id: t,
            place_id: req.body.place_id
        })
    })
    Places_hotel_propreties.findAll(
        {
            where: { place_id: req.body.place_id },
            raw: true
        }).then(x => {
            if (x.length == 0) {
                Places_hotel_propreties.bulkCreate(
                   obj
                   ).then(c=>res.send("done"))
            } else {
                Places_hotel_propreties.destroy(
                    {
                        where: {
                            place_id: req.body.place_id
                        }

                    })
                    Places_hotel_propreties.bulkCreate(
                   obj).then(c=>res.send("done"))
            }
})
})
app.get("/user", (req, res) => {
    User.findAll({
        raw: true
    }).then(c => {
        res.send(c)
        console.log(c)
    })
})
app.post("/userupdates", (req, res) => {
    User.update(
        {
            username: req.body.username,
            phone_number: req.body.phone_number,
            email_address: req.body.email_address
        },
        { where: { user_id: req.body.user_id } }
    )
})

app.listen(3001, () => {
    console.log('app is running ')
})