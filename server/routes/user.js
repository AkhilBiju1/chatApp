var express = require('express');
var { Signup, Login, getAllUsers, getAllRoomId, getRoomId } = require("../helpers/userHelper")


var router = express.Router();

router.post("/signin", (req, res) => {
    

    console.log(req.body);
    Signup(req.body).then((response) => {
        res.json(response)
    })
    
})
router.post("/login", (req, res) => {
    req.session.Loggedin=false
        
        req.session.user=null
    
    Login(req.body).then((response) => {
        

        if (response.user) {
            req.session.Loggedin = true
            req.session.user= response.user
        }

        res.json(response)

    })
    
})
router.get("/session", (req, res) => {
   
    if (req.session.user) {
        console.log("session :"+req.session.user);
        res.json( req.session.user)

    } else {
        console.log("helo"); 
        res.json(null)
        
    }
})
router.get("/logout", (req, res) => {
    req.session.Loggedin = false

    req.session.user = null
    res.json(null)

})
router.get("/all-user",async (req, res) => {
    if (req.session.user) {
        getAllUsers(req.session.user._id).then((response) => {

            res.json({ users: response })

        })
    } 
    
    
})


router.post("/room", (req, res) => {
    console.log();
    getRoomId(req.body ,req.session.user._id).then((response) => {
        res.json(response)
    })
})
router.get("/all-rooms", (req, res) => {
    getAllRoomId( req.session.user._id).then((response) => {
        res.json(response)
    })

})

module.exports = router;