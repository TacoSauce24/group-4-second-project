//Ian
const router = require('express').Router();
const { animals } = require('../../models');
const withAuth = require('../../utils/auth');

// test get
router.post('/:name', /*withAuth,*/ async (req, res) => {
    try{
        const animalId = await animals.findAll({
            where:{
                animal_name: req.params.name
            },
            attributes: {
                exclude: ['animal_name']
            }
        });
        res.status(200).json(animalId);
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