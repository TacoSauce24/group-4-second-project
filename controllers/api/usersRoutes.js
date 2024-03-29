//Ian
const router = require('express').Router();
const { users } = require('../../models');
const withAuth = require('../../utils/auth');

// test get
router.get('/', async (req, res) => {
    try {
        const allUsers = await users.findAll();
        res.status(200).json(allUsers);
    } catch(err) {
        res.status(400).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        newUser = await users.create(req.body);
        if(!newUser) {
            res.status(500).json({ message: 'duplicate email, user not created' });
            return;
        }

        //creates session data for the created user
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.json({ user: newUser, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        if (req.session.user_id === parseInt(req.params.id)) {
            const updateUser = await users.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            if (!updateUser) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }

            res.status(200).json(updateUser);
        } else {
            res.status(401).json({ message: 'you are not this user, cannot update' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        if (req.session.user_id === parseInt(req.params.id)) {
            const deleteUser = await users.destroy({
                where: {
                    id: req.params.id,
                },
            });

            if (!deleteUser) {
                res.status(404).json({ message: 'no user found with this id' });
                return;
            }

            res.status(200).json(deleteUser);
        } else {
            res.status(401).json({ message: 'you are not this user, cannot delete' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//login routes
router.post('/login', async (req, res) => {
    try {
        // Find the user by email address, if none are found throws and error
        const userData = await users.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //verifies password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        //creates session data
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;