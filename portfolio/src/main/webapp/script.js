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

/*
 * Adds a random fun fact to the page.
 */
function addRandomFact() {
  const facts =
      ['I love soccer!', 'I do not like fruit desserts.', 'I love the color blue!',
       'I do not like math.', 'I love writing and reading short stories!', 
       'I do not like hot summers.', 'I love the mountains!', 'I do not like scary movies.',
       'I am a twin and my little sisters are twins!', 'Once, both of my arms were broken at the same time.',
       'I collect mini soccer balls!', 'I am deathly afraid of heights.', 'My favorite word is oatmeal!',
       'I do not like the sound of styrofoam.', 'My favorite food is watermelon!'];

  // Picks a random fact
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Places fact on the page
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

/*
 * Fetches comments from the server, builds list of comments, and adds them to the DOM.
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((commentsObject) => {
    const commentListElement = document.getElementById('comments-container');
    const commentLimit = document.getElementById('comment-limit');
    for (var i = 0; i < commentLimit; i++) {
      const comment = commentsObject[i];
      commentListElement.appendChild(createListElement(comment));
    }
    location.reload();
  });
}

/* 
 * Creates a <li> element containing text. 
 */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/*
 * Translate input into new language.
 */
function getTranslation() {

  // Get text to be translated and target language from user input
  const text = document.getElementById('text-field').value;
  const languageCode = document.getElementById('languages').value;

  // Set output to be input text field
  const resultContainer = document.getElementById('text-field');

  // Add text and target language to query string
  const params = new URLSearchParams();
  params.append('text', text);
  params.append('languageCode', languageCode);

  // Send information to translation servlet to perform translation and
  // display translated message on page
  fetch('/translate', {
    method: 'POST',
    body: params
  }).then(response => response.text())
  .then((translatedMessage) => {
    resultContainer.innerText = translatedMessage;
  });
}
