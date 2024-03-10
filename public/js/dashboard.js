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