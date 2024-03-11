document.addEventListener("DOMContentLoaded", () => {
  const animalSearchForm = document.getElementById("animalSearchForm");
  const wikipediaInfo = document.getElementById("wikipediaInfo");

  if (animalSearchForm && wikipediaInfo) {
    animalSearchForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const animalNameInput = document.getElementById("animalName");
      const animalName = animalNameInput.value.trim();

      // Fetch data from Wikipedia API
      try {
        const response = await fetch(`/fetchData?searchTerm=${animalName}`);
        const data = await response.json();

        // Extract the Wikipedia content
        const extract = data.extract;

        // Display the Wikipedia information in the designated area
        wikipediaInfo.innerHTML = `<p>${extract}</p>`;
      } catch (error) {
        console.error("Error fetching data from Wikipedia:", error);
        wikipediaInfo.innerHTML =
          "<p>Error fetching data from Wikipedia. Please try again.</p>";
      }

      // Reset the form after processing
      animalSearchForm.reset();
    });
  } else {
    console.error("Form or Wikipedia info area not found");
  }
});

// Function to fetch and display animal comments
const fetchAndDisplayAnimalComments = async () => {
  try {
    // Fetch existing comments from the server
    const response = await fetch("/animalcomments");
    const existingComments = await response.json();

    // Check the type of existingComments
    if (typeof existingComments === "object" && existingComments !== null) {
      // Display comments if existingComments is an object
      const commentBoxes = document.querySelectorAll(
        ".column.is-one-third .box"
      );
      let commentIndex = 0;
      for (const key in existingComments) {
        if (commentIndex >= 3) break; // Display only the first three comments
        const comment = existingComments[key];
        const box = commentBoxes[commentIndex];
        box.querySelector("h2").textContent =
          comment.comment_title || comment.comment_title || "Default Title";
        box.querySelector("p").textContent =
          comment.comment_text || comment.comment_body || "Default Content";
        commentIndex++;
      }
    } else {
      console.error(
        "Existing comments data is not in the expected format. Comments will not be displayed."
      );
    }
  } catch (error) {
    console.error("Error fetching or displaying comments:", error);
  }
};

// Call the function to fetch and display comments when the page loads
document.addEventListener("DOMContentLoaded", fetchAndDisplayAnimalComments);

// Function to display a comment in the "New Comment Box"
const displayComment = (comment) => {
  const newCommentBox = document.getElementById("newCommentBox");
  newCommentBox.querySelector("h2").textContent =
    comment.title || "New Comment";
  newCommentBox.querySelector("p").textContent = comment.text || "No content";
  console.log("Comment displayed:", comment);
};

// Function to handle form submission and add a new comment
const handleCommentFormSubmit = async (event) => {
  event.preventDefault();

  // Get the new comment details from the form
  const commentTitle = document.getElementById("commentTitle").value;
  const newCommentText = document.getElementById("newComment").value;

  console.log("New comment submitted:", {
    title: commentTitle,
    text: newCommentText,
  });

  // Display the new comment in the "New Comment Box"
  displayComment({ title: commentTitle, text: newCommentText });

  // Reset the form after successful submission
  document.getElementById("addCommentForm").reset();
};

// Add event listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for form submission
  document
    .getElementById("addCommentForm")
    .addEventListener("submit", handleCommentFormSubmit);
});
