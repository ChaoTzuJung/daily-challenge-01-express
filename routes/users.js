const express = require('express');
const router = express.Router();
const users = [{name: 'Alan'}, {name: 'Tom'}];
// use middleware ˇ
// router.use(logger);

router.get("/", (req, res) => {
    // http://localhost:3000/users?name=alan
    console.log(req.query.name);
    res.send("User List");
});

router.get("/new", (req, res) => {
    res.render("users/new", { firstName: "Test" })
});

router.post("/", (req, res) => {
    const isValid = true;
    if (isValid) {
        users.push({ name: req.body.firstName });
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.error('Create User Fail');
        res.render("/users/new", { firstName: req.body.firstName })
    }
    res.send(`Create User: ${req.body.firstName}`);
});


// router.get("/:id", (req, res) => {
//     res.send(`Get User With ID ${req.params.id}`);
// });

// router.put("/:id", (req, res) => {
//     res.send("Update New Form");
// });

// router.delete("/:id", (req, res) => {
//     res.send("Delete New Form");
// });

router
    .route("/:id")
    .get((req, res) => {
        res.send(`Get User With ID ${req.params.id} - ${JSON.stringify(req.user)}`)
    })
    .put((req, res) => {
        res.send(`Update User With ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`)
    })

//  param is middleware
router.param('id', (req, res, next, id) => {
    console.log(id);
    req.user = users[id]
    // loading -> show result
    next();
})

module.exports = router;