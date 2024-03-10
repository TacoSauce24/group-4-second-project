

// document.addEventListener('DOMContentLoaded', () => {
//     //console.log('DOM Loaded');
  
//     const animalSearchForm = document.getElementById('animalSearchForm');
  
//     if (animalSearchForm) {
//       //console.log('Form found:', animalSearchForm);
  
//       animalSearchForm.addEventListener('submit', async (event) => {
//         event.preventDefault();
  
//         const animalNameInput = document.getElementById('animalName');
//         const animalName = animalNameInput.value.trim();
  
//         // fetch data from Wikipedia
//         console.log('Animal Name:', animalName);
  
//         // Reset the form after processing
//         animalSearchForm.reset();
//       });
//     } else {
//       console.error('Form not found');
//     }
//   });
  
document.addEventListener('DOMContentLoaded', () => {
    const animalSearchForm = document.getElementById('animalSearchForm');
  
    if (animalSearchForm) {
      animalSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const animalNameInput = document.getElementById('animalName');
        const animalName = animalNameInput.value.trim();
  
        try {
          // Fetch data from Wikipedia API
          const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&titles=${animalName}`);
          const data = await response.json();
  
          // Extract the page content
          const pageId = Object.keys(data.query.pages)[0];
          const extract = data.query.pages[pageId].extract;
  
          // Display the information in the designated box
          const resultBox = document.getElementById('resultBox');
          resultBox.textContent = extract;
        } catch (error) {
          console.error('Error fetching data from Wikipedia:', error);
        } finally {
          // Reset the form after processing
          animalSearchForm.reset();
        }
      });
    } else {
      console.error('Form not found');
    }
  });
  
