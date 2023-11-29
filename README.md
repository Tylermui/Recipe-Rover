# Recipe Rover
Welcome to Recipe Rover, the culminating project for CS362 Computer Organization and Architecture. This application serves as a user-friendly landing site where individuals can input their ingredients or cooking times and receive personalized recipes tailored to their preferences.

## How Recipe Rover Works
Recipe Rover is currently deployed on Cloudflare Pages with a D1 database that stores the API Key and API ID. Doing this allows them to stay hidden from the user. When a user queries and submits, a GET request is sent to the database that fetches the ID and Key. It then proceeds to read the API call and populate the container the the user to view.

## Getting Started Locally
To ensure smooth functioning of this project, follow these steps to set up your environment:

### Step 1: Setting Up config.js File
To properly use and run this project, you must create a `config.js` file within the project's static folder.

### Step 2: Defining Variables
Inside the file, name two variables:

```plaintext
export const API_ID = //your_API_id
export const API_KEY = //your_api_key
```
This will allow the index.js file to import the key and id from the API and allow for proper searching.

### Step 3: Proper Comments
When trying to run this locally, uncomment the two imports at the top of the `index.js` file and comment out the first three lines in the fetchAPI() function. 

### Enjoy
Once the proper commenting is done, you can enjoy your own version of Recipe Rover on your local environment.
