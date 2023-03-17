
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
//Done
router.get('/', (req,res)=> {
    Thought.find({}, (err,thoughts)=> {
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json(thoughts);
    }
)
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
//Done
router.put('/:thoughtId', (req,res)=> {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId,
        },
        {
            thoughtText: req.body.thoughtText,
            username: req.body.username,
        },
        (err,thought)=> {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            else
            Thought.findById(
                {_id: req.params.thoughtId,},
                (err, thought)=> 
                {
                    return res.json(thought);
                })
        }
    )
})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
// Done
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
            if(thought === null){
            return res.json({message:"Thought no longer exists"});
            }
        }
    )

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
//Done
router.post('/:thoughtId/reactions', (req,res)=> {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId,
        },
        {
            $push: {
                reactions: {
                    //reactionId: req.body.reactionId,
                    reactionBody: req.body.reactionBody,
                    username: req.body.username,
                }
            }
        },
        {
            runValidators: true,
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
//Done
router.delete('/:thoughtId/reactions/:reactionId', (req,res)=> {
    Thought.findOneAndUpdate(
        {
            _id: req.params.thoughtId,
        },
        {$pull:{
            reactions: {
                _id: req.params.reactionId,
            }
        }},
        {runValidators: true, new: true},
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
