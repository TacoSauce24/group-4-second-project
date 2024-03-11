// const express = require("express");
// const router = express.Router();
// const { users } = require("../models");
// const withAuth = require("../utils/auth");

// // Handle GET request for the main homepage
// router.get("/", async (req, res) => {
//   try {
//     // Render the homepage.handlebars template with necessary data
//     res.render("homepage", {
//       pageTitle: "Animals Seen Blog",
//       animalImageUrl: "images/animals.jpg",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Handle GET request for the login page
// router.get("/login", async (req, res) => {
//   try {
//     // Fetch user-specific data if needed
//     const user = await users.findByPk(req.session.user_id);

//     // Render the login-signup.handlebars template with necessary data
//     res.render("login-signup", {
//       pageTitle: "Log In or Sign Up",
//       animalImageUrl: "images/animals.jpg",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Handle GET request for the signup page
// router.get("/signup", async (req, res) => {
//   try {
//     // Fetch user-specific data if needed
//     const user = await users.findByPk(req.session.user_id);

//     // Render the login-signup.handlebars template with necessary data
//     res.render("login-signup", {
//       pageTitle: "Log In or Sign Up",
//       // animalImageUrl: "images/animals.jpg",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Handle GET request for the dashboard page
// router.get("/dashboard", withAuth, async (req, res) => {
//   try {
//     // Fetch user-specific data to render on the dashboard
//     const user = await users.findByPk(req.session.user_id);

//     if (user) {
//       // Render the dashboard.handlebars template with personalized content
//       console.log(user);
//       res.render("dashboard", {
//         pageTitle: `Welcome, ${user.name}!`,
//       });
//     } else {
//       // Handle case where the user data is not found
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { users, animals, comments } = require("../models");
const withAuth = require("../utils/auth");

// Dynamic import for node-fetch
import("node-fetch")
  .then((nodeFetch) => {
    const fetch = nodeFetch.default;

    // Handle GET request for the main homepage
    router.get("/", async (req, res) => {
      try {
        // Render the homepage.handlebars template with necessary data
        res.render("homepage", {
          pageTitle: "Animals Seen Blog",
          animalImageUrl: "images/animals.jpg",
          logged_in: req.session.logged_in,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Handle GET request for the login page
    router.get("/login", async (req, res) => {
      try {
        // Fetch user-specific data if needed
        const user = await users.findByPk(req.session.user_id);

        // Render the login-signup.handlebars template with necessary data
        res.render("login-signup", {
          pageTitle: "Log In or Sign Up",
          animalImageUrl: "images/animals.jpg",
          logged_in: req.session.logged_in,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Handle GET request for the signup page
    router.get("/signup", async (req, res) => {
      try {
        // Fetch user-specific data if needed
        const user = await users.findByPk(req.session.user_id);

        // Render the login-signup.handlebars template with necessary data
        res.render("login-signup", {
          pageTitle: "Log In or Sign Up",
          logged_in: req.session.logged_in,
          animalImageUrl: "images/animals.jpg",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Handle GET request for the dashboard page
    router.get("/dashboard", withAuth, async (req, res) => {
      try {
        // Fetch user-specific data to render on the dashboard
        const user = await users.findByPk(req.session.user_id);

        if (user) {
          // Render the dashboard.handlebars template with personalized content
          console.log(user);
          res.render("dashboard", {
            pageTitle: `Welcome, ${user.name}!`,
            logged_in: req.session.logged_in,
            username: user.name
          });
        } else {
          // Handle case where the user data is not found
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Handle GET request
    router.get("/allanimalcomments", /*withAuth,*/ async (req, res) => {

      // const searchTerm = req.query.searchTerm; // Get the search term from the query parameters
      

      const allAnimalCommentsData = await comments.findAll({
        attributes: ["comment_title", "comment_body"],
        include: [{
          model: animals, 
          attributes: ["animal_name"],
        },{
          model: users,
          attributes: ["name"]
        }]
      })
      const allAnimalComments = allAnimalCommentsData.map((comment) => comment.get({plain:true}));
      const allComments = allAnimalComments.map((comment) => {
        const obj = {};
        obj.animal=comment.animal.animal_name;
        obj.username=comment.user.name;
        obj.comment_title=comment.comment_title;
        obj.comment_body=comment.comment_body;
        return obj;
      })

      res.json(allComments);
    });

    router.get("/animalcomments", /*withAuth,*/ async (req, res) => {

      const searchTerm = req.query.searchTerm; // Get the search term from the query parameters


      const animalComments = await animals.findAll({
        where: {
          animal_name: searchTerm
        },
        include: {
          model: comments,
          attributes: ["id", "comment_title", "comment_body"],
          include: {
            model: users,
            attributes: ["name"]
          }
        }
      })
      res.json({ animalComments })
    });

    // Add the route handler for fetching data from the Wikipedia API here
    router.get("/fetchData", async (req, res) => {
      try {
        const searchTerm = req.query.searchTerm; // Get the search term from the query parameters
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&titles=${searchTerm}`
        );
        const data = await response.json();

        // Extract the page content from the API response
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        // Send the extracted data back as a JSON response
        res.json({ extract });
      } catch (error) {
        console.error("Error fetching data from Wikipedia:", error);
        res
          .status(500)
          .json({
            error: "An error occurred while fetching data from Wikipedia",
          });
      }
    });
  })
  .catch((error) => {
    console.error("Error importing node-fetch:", error);
  });

module.exports = router;
