
let search = false;
let commentIndex = 0;
let animalName;
document.addEventListener("DOMContentLoaded", () => {
  const animalSearchForm = document.getElementById("animalSearchForm");
  const wikipediaInfo = document.getElementById("wikipediaInfo");

  if (animalSearchForm && wikipediaInfo) {
    animalSearchForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const animalNameInput = document.getElementById("animalName");
      animalName = animalNameInput.value.trim();


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
      search = true;
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
    const response = await fetch("/allanimalcomments");
    const existingComments = await response.json();

    // Check the type of existingComments
    if (typeof existingComments === "object" && existingComments !== null) {
      // Display comments if existingComments is an object

      existingComments.forEach((comment) => {
        const container = document.querySelector('.database-comments');

        const loadComment = document.createElement('div');
        loadComment.classList.add(`existing-comment${commentIndex}`, "box");
        const errorComment = document.querySelector('.existing-comment');
        if(errorComment !== null){
          errorComment.remove();
        }
        loadComment.innerHTML = 
        `
          <h3 class="comment-title${commentIndex} has-text-centered">${comment.comment_title} - ${comment.animal}</h3>
          <p class="comment-body${commentIndex}">${comment.comment_body} - ${comment.username}</p>
        `
        container.appendChild(loadComment);
        commentIndex++;
      })
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

// Function to handle form submission and add a new comment
const handleCommentFormSubmit = async (event) => {
  event.preventDefault()

  //checks if the user has searched with a simple variable
  if(search){
    try{

    //new-comment-container

    // Get the new comment details from the form
    const comment_title = await document.getElementById(`new-comment-title`).value;
    const comment_body = await document.getElementById(`new-comment-body`).value;
    const user_id = await sessionStorage.getItem('user_id');
    const animal_id = await fetch(`/api/animals/:${animalName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(comment_title, comment_body, user_id, animal_id);

    const newCommentResponse = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_title,
        comment_body,
        user_id,
        animal_id
      })
    });

    comment = newCommentResponse;

    const newContainer = document.querySelector('.new-comment-container');

    const loadNewComment = document.createElement('div');
    loadNewComment.classList.add(`existing-comment${commentIndex}`, "box");
    const errorComment = document.querySelector('.existing-comment');
    if (errorComment !== null) {
      errorComment.remove();
    }
    loadNewComment.innerHTML =
      `
        <h3 class="comment-title${commentIndex} has-text-centered">${comment.comment_title} - ${comment.animal}</h3>
        <p class="comment-body${commentIndex}">${comment.comment_body}</p>
      `
    newContainer.appendChild(loadNewComment);
    commentIndex++;

    // Reset the form after successful submission
    document.getElementById("addCommentForm").reset();
    } catch(err) {
      alert(err);
      console.error(err);
    }
  } else {
    alert("you've not searched an animal, so you can't add a comment");
  }
};

// Add event listeners after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for form submission
  document
    .getElementById("addCommentForm")
    .addEventListener("submit", handleCommentFormSubmit);
});
