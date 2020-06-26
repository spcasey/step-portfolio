// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random fact to the page.
 */
function addRandomFact() {
  const facts =
      ['I love soccer!', 'I do not like fruit desserts.', 'I love the color blue!',
       'I do not like math.', 'I love writing and reading short stories!', 
       'I do not like hot summers.', 'I love the mountains!', 'I do not like scary movies.',
       'I am a twin and my little sisters are twins!', 'Once, both of my arms were broken at the same time.',
       'I collect mini soccer balls!', 'I am deathly afraid of heights.', 'My favorite word is oatmeal!',
       'I do not like the sound of styrofoam.', 'My favorite food is watermelon!'];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

/**
 * Fetches message from the server and adds it to the DOM.
 */
function getHelloWorld() {
  fetch('/data').then(response => response.txt()).then((message) => {
    document.getElementById('message-container').innerText = message;
  });
}

/**
 * Fetches comments from the server and adds them to the DOM.
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((commentsObject) => {

  // Reference provided comments JSON to generate HTML elements
  const comments = document.getElementById('comments-container');
    comments.innerHTML = '';
    comments.appendChild(
        generateElement('First Name: ' + commentsObject.firstName));
    comments.appendChild(
        generateElement('Middle Name: ' + commentsObject.middleName));
    comments.appendChild(
        generateElement('Last Name: ' + commentsObject.lastName));
  });
}

/** 
 * Creates a <li> element containing text. 
 */
function generateElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}