//Ian
const router = require('express').Router();
const { tag } = require('../../models');
// const withAuth = require('../../utils/auth');

//test get
router.get('/', /*withAuth,*/ async (req, res) => {
    try {
        const allTags = await tag.findAll();
        res.status(200).json(allTags);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/', /*withAuth,*/ async (req, res) => {
    try {
        const newTag = await tag.create(req.body);

        res.status(200).json(newTag);
    } catch(err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteTag = await tag.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!deleteTag) {
            res.status(404).json({ message: 'no tag found with this id' });
            return;
        }

        res.status(200).json(deleteTag);
    } catch(err) {
        res.status(500).json(err);
    }
});