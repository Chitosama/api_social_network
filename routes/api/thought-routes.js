
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
//Done
router.get('/', (req,res)=> {
    Thought.find({}), (err,thoughts)=> {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json(thoughts);
    }
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
//Done
router.post('/', (req,res)=> {
    Thought.create(
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
//Done
router.get('/:thoughtId', (req,res)=> {
    Thought.findOne(
        {
            _id: req.params.thoughtId,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )
})

//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/', (req,res)=> {
    Thought.findOneAndUpdate(
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', (req,res)=> {
    Thought.findOneAndDelete(
        {
            _id: req.params.thoughtId,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', (req,res)=> {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId,
        },
        {
            $push: {
                reactions: {
                    reactionId: req.body.reactionId,
                    reactionBody: req.body.reactionBody,
                    username: req.body.username,
                }
            }
        },
        {
            new: true,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {
    Thought.findOneAndDelete(
        {
            _id: req.params.thoughtId,
            reactions: {
                reactionId: req.params.reactionId,
            }
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json(thought);
        }
    )
})

module.exports = router;
