const express = require("express");
const app = express();

app.set("view engine", "ejs");

// use middleware
// app.use(logger);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// use middleware 2
app.get('/', logger, (req, res) => {
    // res.send('Hi');
    // res.sendStatus(500);
    // res.status(500).send('Hi');
    // res.status(500).json({ message: "Error" });
    // res.download('server.js')
    res.render("index", { text: "World" })
});

const userRouter = require('./routes/users');

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log(req.originalUrl)
}

app.listen(3000);