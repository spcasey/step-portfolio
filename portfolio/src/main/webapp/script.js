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

/*
 * Creates a map of South Bend (night mode) and adds it to the page.
 */ 
function generateMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.6764, lng: -86.2520}, zoom: 6,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {featureType: 'administrative.locality', elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]},
      {featureType: 'poi', elementType: 'labels.text.fill', 
        stylers: [{color: '#d59563'}]},
      {featureType: 'poi.park', elementType: 'geometry',
        stylers: [{color: '#263c3f'}]},
      {featureType: 'poi.park', elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]},
      {featureType: 'road', elementType: 'geometry',
        stylers: [{color: '#38414e'}]},
      {featureType: 'road', elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]},
      {featureType: 'road', elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]},
      {featureType: 'road.highway', elementType: 'geometry',
        stylers: [{color: '#746855'}]},
      {featureType: 'road.highway', elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]},
      {featureType: 'road.highway', elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]},
      {featureType: 'transit', elementType: 'geometry',
        stylers: [{color: '#2f3948'}]},
      {featureType: 'transit.station', elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]},
      {featureType: 'water', elementType: 'geometry',
        stylers: [{color: '#17263c'}]},
      {featureType: 'water', elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]},
      {featureType: 'water', elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]}
    ]
    
  });
  
  const houseMarker = new google.maps.Marker({
    position: {lat: 41.750880, lng: -86.146510},
    map: map,
    title: 'My House'
  });

  const HighSchoolMarker = new google.maps.Marker({
    position: {lat: 41.681751, lng: -86.238419},
    map: map,
    title: 'My High School'
  });

  const PFAHQMarker = new google.maps.Marker({
    position: {lat: 41.674830, lng: -86.249850},
    map: map,
    title: 'PFA Headquarters'
  });
}
