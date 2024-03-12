//Ian
const router = require('express').Router();
const { animals } = require('../../models');
const withAuth = require('../../utils/auth');

// test get
router.get('/:name', /*withAuth,*/ async (req, res) => {
    try{
        console.log(req.params.name)
        const animalId = await animals.findOne({
            where:{
                animal_name: req.params.name
            },
        });
        const resId = animalId.dataValues.id;
        res.status(200).json(resId);
    } catch(err) {
        res.status(400).json(err);
    }
});

// router.get('/:id', /*withAuth,*/ async (req, res) => {
//     try {
//         const oneAnimal = await animals.findByPK(req.params.id, {
//             attributes: {
//                 exclude: ['id']
//             }
//         });
//     } catch {

//     }
// });

module.exports = router;