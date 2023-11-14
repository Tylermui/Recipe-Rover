# Recipe Rover
Welcome to Recipe-Rover, the culminating project for CS362 Computer Architecture. This application serves as a user-friendly landing site where individuals can input their ingredients and receive personalized recipes tailored to their preferences.

## Getting Started
To ensure smooth functioning of this project, follow these steps to set up your environment:

### Step 1: Setting Up config.js File
To properly use and run this project, you must create a `config.js` file within the project's static folder.

### Step 2: Defining Variables
Inside the file, name two variables:

```plaintext
export const API_ID = //your_API_id
export const API_KEY = //your_api_key

This will allow the index.js file to import the key and id from the API and allow for proper searching.