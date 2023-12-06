//These imports are for running it locally
// import {API_ID} from './config.js'
// import {API_KEY} from './config.js'
var query = "";

async function performSearch() {
  // Grabbing the query from the user
  query = $('#foodInput').val();
  // Where we are going to parse the API information
  await fetchAPI();
}

$(document).ready(function () {
  $('#searchButton').click(async function() {
      await performSearch();

  });
  $('#foodInput').keypress(function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.which === 13) {
      // Call the search function when Enter is pressed
      performSearch();
    }
  });

  //change view of recipes
  var status="boxStatus";
  $(document).on("click",".menu-icon",function(){
      if(status=="boxStatus"){
        status=="barStatus";
        $(".box").find("hr").remove();
      }
      else{
        status=="boxStatus";
        $(".box").find("div").after($("<hr>"));
      } 

      $(".box").toggleClass("recipeItem col-md-3 mx-5 recipeItemBar");
      $(".box").children().each(function(){
        $(this).toggleClass("blockInline");
      });
      $(".box").find("img").toggleClass("imgBar");
      $(".box").find("#h2").toggleClass("h2Bar");
      $(".box").find("#p").toggleClass("pBar");
      $(".box").find("#a").toggleClass("aBar");
  });
});

async function fetchAPI() {
  //Calling into the db to grab the information
  var results = await getData()
  //Get the ID from the db
  var API_ID = results.results[0].id
  //Get the key from the db
  var API_KEY = results.results[0].key
  
  let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=20`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  populateContainer(data.hits);
}

function populateContainer(results) {
  let recipeItem = "";
  results.map((result) => {
    calculateScore(result)
    recipeItem += `
    <div class="recipeItem col-md-3 mx-5 box">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container" id="h2">
            <h2 class="title">${result.recipe.label}</h2>
        </div>
        <hr>
        <div id="p">
          <p class="Item-data p-1">
              calories: ${result.recipe.calories.toFixed(0)} <br>
              score: ${calculateScore(result).toFixed(0)}
          </p>
        </div>
        <div id="a">
          <a href="${result.recipe.url}" class="viewButton">View Recipe</a>
        </div>
    </div>`;
  });

  $(".api-container").html(recipeItem);
}


function calculateScore(result){
  let carbs = result.recipe.totalNutrients.CHOCDF.quantity
  let fats = result.recipe.totalNutrients.FAT.quantity
  let protein = result.recipe.totalNutrients.PROCNT.quantity
  let sugars = result.recipe.totalNutrients.SUGAR.quantity
  let calcium = result.recipe.totalNutrients.CA.quantity
  let cholesterol = result.recipe.totalNutrients.CHOLE.quantity
  let fiber = result.recipe.totalNutrients.FIBTG.quantity
  let potassium = result.recipe.totalNutrients.K.quantity
  let saturated_fat = result.recipe.totalNutrients.FASAT.quantity
  let sodium = result.recipe.totalNutrients.NA.quantity
  let servings = result.recipe.yield

  var score = 0;

  /**scores*/
  let carb_score = (carbs/275)*10  
  let fat_score = (fats/78)*10  
  let protein_score = (protein/50)*10  
  let sugar_score = (sugars/50)*10  
  let calcium_score = (calcium/1300)*10  
  let cholesterol_score = (cholesterol/300)*10  
  let fiber_score = (fiber/28)*10  
  let potassium_score = (potassium/4700)*10  
  let saturated_fat_score = (saturated_fat/20)*10  
  let sodium_score = (sodium/2300)*10  

  score = carb_score + fat_score + protein_score + sugar_score + calcium_score + cholesterol_score + fiber_score + potassium_score + saturated_fat_score + sodium_score
  score = score/servings
  return score
}

//Fetching the data from the Cloudflare D1 Database
function getData() {
  const url = 'https://recipe-rover.pages.dev/form';

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error getting data:', error);
      throw error;
    });
}