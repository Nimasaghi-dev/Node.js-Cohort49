
/**
 * 2. Authentication
 * 
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 * 
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
const base64 = require('base-64');
const encodedCredentials = 'YWRtaW46aHZnWDhLbFZFYQ==';
const apiUrl = "https://restapiabasicauthe-sandbox.mxapps.io/api/books";

async function printBooks() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
printBooks();