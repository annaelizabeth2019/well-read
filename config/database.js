var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { reconnectInterval: 500, useNewUrlParser: true });

//database connection event ${process.env.DATABASE_URL}
mongoose.connection.on('connected', function() {
    console.log(`mongoose connected.`);
});

module.exports = mongoose;