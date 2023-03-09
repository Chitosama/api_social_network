
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
//Done
router.get('/', (req,res) => {
    User.find({}, (err,users) => {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json(users)
    })
})

//TODO - ROUTE THAT CREATES A NEW USER
//Done
router.post('/', (req,res)=> {
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            friends: req.body.friends,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )

});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
//Done
router.get('/:userId', (req,res) => {
    User.findOne(
        {
            _id: req.params.userId,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )

})

//TODO - ROUTE THAT UPDATES A SINGLE USER
//Done
router.put('/:userId', (req,res)=> {
    User.findOneAndUpdate(
        {
            username: req.body.username,
            email: req.body.email,
            friends: req.body.friends,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )

})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
//Done
router.delete('/:userId', (req,res)=> {
    User.findOneAndDelete(
        {
            _id: req.params.userId,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )

});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
//Done
router.put('/:userId/friends/:friendId', (req,res)=> {
    User.findOneAndUpdate(
        {
            _id: req.params.userId,
        },
        {
            $push: {
                friends: req.params.friendId,
            },
        },
        {
            new: true,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )

})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
//Done
router.delete('/:userId/friends/:friendId', (req,res)=> {
  
    User.findOneAndUpdate(
        {
            _id: req.params.userId,
        },
        {
            $pull: {
                friends: req.params.friendId,
            },
        },
        {
            new: true,
        },
        (err,user)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(user);
        }
    )
});

module.exports = router;
