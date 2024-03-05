//Ian
// const router = require('express').Router();
// const { animals } = require('../../models');
// const withAuth = require('../../utils/auth');

//test get
// router.get('/', /*withAuth,*/ async (req, res) => {
//     try{
//         const allAnimals = await animals.findAll({
//             attributes: {
//                 exclude: ['id']
//             }
//         });
//         res.status(200).json(allAnimals);
//     } catch(err) {
//         res.status(400).json(err);
//     }
// });

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