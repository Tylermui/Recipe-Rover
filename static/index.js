// JavaScript code for handling API requests and displaying data will go here????

var query = "";

// const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}&to=20`;
  
// fetch(apiUrl)
//   .then(response => {
//     // Check if the response status is okay (200)
//     if (response.ok) {
//       // Parse the JSON response data
//       return response.json();
//     }
//     // If response status is not okay, throw an error
//     throw new Error('Network response was not ok.');
//   })
//   .then(data => {
//     // Handle the data from the API
//     console.log(data);
//     // You can manipulate and display the data here
//   })
//   .catch(error => {
//     // Handle errors that occurred during the fetch operation
//     console.error('There has been a problem with your fetch operation:', error);
//   });


document.getElementById('searchButton').addEventListener('click', function() {
  // Grab the input value
  var foodInputValue = document.getElementById('foodInput').value;

});