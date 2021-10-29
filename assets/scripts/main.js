// main.js

// Here is where the recipes that you will fetch.
// Feel free to add your own here for part 2, if they are local files simply add their path as a string.
const recipes = [
  'https://introweb.tech/assets/json/ghostCookies.json',
  'https://introweb.tech/assets/json/birthdayCake.json',
  'https://introweb.tech/assets/json/chocolateChip.json',
  'assets/recipes/pho.json',
  'assets/recipes/rice_cake.json',
  'assets/recipes/carbonara.json'
];

// Once all of the recipes that were specified above have been fetched, their
// data will be added to this object below. You may use whatever you like for the
// keys as long as it's unique, one suggestion might but the URL itself
const recipeData = {};

const extraRecipes = {};

window.addEventListener('DOMContentLoaded', init);

// This is the first function to be called, so when you are tracing your code start here.
async function init() {
  // fetch the recipes and wait for them to load
  let fetchSuccessful = await fetchRecipes();
  // if they didn't successfully load, quit the function
  if (!fetchSuccessful) {
    console.log('Recipe fetch unsuccessful');
    return;
  };
  // Add the first three recipe cards to the page
  createRecipeCards();
  // Make the "Show more" button functional
  bindShowMore();
}

async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    // This function is called for you up above
    // From this function, you are going to fetch each of the recipes in the 'recipes' array above.
    // Once you have that data, store it in the 'recipeData' object. You can use whatever you like
    // for the keys. Once everything in the array has been successfully fetched, call the resolve(true)
    // callback function to resolve this promise. If there's any error fetching any of the items, call
    // the reject(false) function.

    // For part 2 - note that you can fetch local files as well, so store any JSON files you'd like to fetch
    // in the recipes folder and fetch them from there. You'll need to add their paths to the recipes array.

    // Part 1 Expose - TODO
    const array = [];

    // Fetch the links and add them to the recipeData object
    recipes.forEach((link, index) => {
      array.push(
        fetch(link)
          .then(response => response.json())
          .then(data => { 
            recipeData[link] = data;
          })
          .catch(() => {reject(false)})
      );
    });

    // If the array contains no promises, then we can resolve it.
    Promise.all(array).then(
      () => {resolve(true);}
    );

  });
}

function createRecipeCards() {
  // This function is called for you up above.
  // From within this function you can access the recipe data from the JSON 
  // files with the recipeData Object above. Make sure you only display the 
  // three recipes we give you, you'll use the bindShowMore() function to
  // show any others you've added when the user clicks on the "Show more" button.

  // Part 1 Expose - TODO
  let mainElem = document.querySelector('main');
  // Create <recipe-card> custom elements for each recipe link
  for (let i = 0; i < 3; i++){
    let element = document.createElement('recipe-card');
    element.data = recipeData[recipes[i]];
    // Attach those <recipe-card> custom elements to main element
    mainElem.append(element);
  }
}

function bindShowMore() {
  // This function is also called for you up above.
  // Use this to add the event listener to the "Show more" button, from within 
  // that listener you can then create recipe cards for the rest of the .json files
  // that were fetched. You should fetch every recipe in the beginning, whether you
  // display it or not, so you don't need to fetch them again. Simply access them
  // in the recipeData object where you stored them/

  // Part 2 Explore - TODO
  let button = document.querySelector('button');
  let mainElem = document.querySelector('main');

  button.addEventListener('click', (event) =>{
    if(button.textContent == "Show more"){
      button.textContent = 'Show less';

      // Go through the last 3 recipes and append them to the webpage
      for (let i = 3; i < recipes.length; i++){
        let element = document.createElement('recipe-card');
        element.data = recipeData[recipes[i]];
        mainElem.append(element);
      }
    }
    else{
      button.textContent = 'Show more';

      // Delete everything in main -> Blank page again
      mainElem.innerHTML = "";

      // Append only the first 3 recipes
      createRecipeCards();
    }
  });
}