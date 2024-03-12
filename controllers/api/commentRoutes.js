//Ian
const router = require('express').Router();
const { comments } = require('../../models');
const withAuth = require('../../utils/auth');

//test get
// router.get('/', withAuth, async (req, res) => {
//     const allcomments = await comment.findAll();
//     res.status(200).json(allcomments);
// });

router.post('/', /*withAuth,*/ async (req, res) => {
    try {
        if (req.session.user_id) {
        console.log(req.body);
        const newComment = await comments.create(
            {
            ...req.body,
            user_id: req.session.user_id
            });
            
        res.status(200).json(newComment);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await comments.update(
            {
                ...req.body
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );
        if (!updateComment) {
            res.status(404).json({ message: 'no comment found with this id' });
            return;
        }

        res.status(200).json(updateComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteComment = await comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!deleteComment) {
            res.status(404).json({ message: 'no comment found with this id' });
            return;
        }

        res.status(200).json(deleteComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// // New route for fetching all comments
// router.get('/comments', withAuth, async (req, res) => {
//     try {
//         const allComments = await comments.findAll();
//         res.status(200).json(allComments);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
module.exports = router;