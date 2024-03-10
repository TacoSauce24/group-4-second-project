
document.addEventListener('DOMContentLoaded', () => {
    const animalSearchForm = document.getElementById('animalSearchForm');
    const wikipediaInfo = document.getElementById('wikipediaInfo');

    if (animalSearchForm && wikipediaInfo) {
        animalSearchForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const animalNameInput = document.getElementById('animalName');
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
                console.error('Error fetching data from Wikipedia:', error);
                wikipediaInfo.innerHTML = '<p>Error fetching data from Wikipedia. Please try again.</p>';
            }

            // Reset the form after processing
            animalSearchForm.reset();
        });
    } else {
        console.error('Form or Wikipedia info area not found');
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Fetch existing comments from the server
      const response = await fetch('/comments'); 
      const existingComments = await response.json();
  
      // Display existing comments in the comment boxes
      const commentBoxes = document.querySelectorAll('.column.is-one-third .box');
  
      existingComments.slice(0, 2).forEach((comment, index) => {
        const box = commentBoxes[index];
        box.querySelector('h2').textContent = comment.comment_title; 
      box.querySelector('p').textContent = comment.comment_body;
      });
    } catch (error) {
      console.error('Error fetching or displaying comments:', error);
    }
  });
  