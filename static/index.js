// JavaScript code for handling API requests and displaying data will go here????
import {API_ID} from './config.js'
import {API_KEY} from './config.js'
var query = "";

$(document).ready(function () {
  $('#searchButton').click(function (event) {
      // Prevent the default form submission
      event.preventDefault();
      
      //grabbing the query from the user
      query = document.getElementById('foodInput').value;
      console.log(query)
      //where we are going to parse the api information
      fetchAPI()

      // Add your logic for handling the form submission here
      // For example, you can trigger an AJAX request to fetch and display the recipe data
      // based on the input in the 'foodInput' field.
  });
});

async function fetchAPI() {
  let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=20`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  populateContainer(data.hits);
  console.log(data);
}

function populateContainer(results) {
  let recipeItem = "";
  results.map((result) => {
    recipeItem += `
    <div class="recipeItem col-md-3 mx-5">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h2 class="title">${result.recipe.label}</h2>
            <a href="${result.recipe.url}" class="viewButton">View Recipe</a>
        </div>
        <p class="Item-data p-1">
            calories: ${result.recipe.calories.toFixed(0)}
        </p>
    </div>`;
  });

  $(".api-container").html(recipeItem);
}