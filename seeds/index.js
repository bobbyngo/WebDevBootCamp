const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose
    .connect('mongodb://localhost:27017/yelp-camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Database Open');
    })
    .catch((err) => {
        console.log('Database Failed');
        console.log(err);
    });

//This function will access one of the element of the array in seedHelpers
const open = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    const price = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '611d4da61b426945442ecd28',
            title: `${open(descriptors)}, ${open(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dz6heoawt/image/upload/v1629580942/YelpCamp/bc4kub0h8xhkh11uw9rr.jpg',
                    filename: 'YelpCamp/bc4kub0h8xhkh11uw9rr',
                },
                {
                    url: 'https://res.cloudinary.com/dz6heoawt/image/upload/v1629580942/YelpCamp/njwprcs4sovvmmr0enzu.jpg',
                    filename: 'YelpCamp/njwprcs4sovvmmr0enzu',
                },
            ],
            price: price,
            description: 'Ba da bing',
        });
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close();
});
