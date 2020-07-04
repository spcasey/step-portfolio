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
 * Creates and populates a data table, instantiates a pie chart, 
 * passes in the data, and draws it.
 */
function drawPieChart() {

  // Create the data table
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Activity');
  data.addColumn('number', 'Hours');
  data.addRows([
    ['Working hours', 10],
    ['Sleeping hours', 8],
    ['Socializing hours', 3],
    ['Reading hours', 2],
    ['Eating hours', 1]
  ]);

  // Set chart options
  var options = {'title':'Sean Daily Schedule',
    'width':600,
    'height':400};

  // Instantiate and draw chart, passing in some options
  var chart = new google.visualization.PieChart(document.getElementById('pie-chart-container'));
  chart.draw(data, options);
}

/* 
 * Creates and populates a data table, instantiates an org chart, 
 * passes in the data, and draws it.
 */
function drawOrgChart() {

  // Create the data table
  var orgData = new google.visualization.DataTable();
  orgData.addColumn('string', 'Name');
  orgData.addColumn('string', 'Manager');
  orgData.addColumn('string', 'ToolTip');

  // Add people to org chart
  orgData.addRows([
    ['Abbey', '', 'Senior Director of Principal Operations'],
    ['Courtenay', 'Abbey', 'Director of Scheduling'],
    ['Matt', 'Abbey', 'Director of Advance'],
    ['Derrek', 'Abbey', 'Director of Briefings and Correspondence'],
    ['Tess', 'Abbey', 'Spouse Chief of Staff'],
    ['Max', 'Abbey', 'Director of Candidate Operations'],
    ['Emily A.', 'Abbey', 'Surrogates Chief of Staff'],
    ['Ebba', 'Courtenay', 'Principal Scheduler']
    ['Sean', 'Courtenay', 'Principal Operations Associate'],
    ['Juliana', 'Matt', 'Advance Desk'],
    ['Kabir', 'Matt', 'Advance Lead'],
    ['Cambria', 'Matt', 'Advance Lead'],
    ['Tori', 'Matt', 'Advance Lead'],
    ['David', 'Derrek', 'Correspondence Manager'],
    ['Deion', 'Tess', 'Spouse Scheduler'],
    ['Emily V.', 'Tess', 'Spouse Special Assistant'],
    ['Nina', 'Max', 'Traveling Press Secretary'],
    ['Saralena', 'Max', 'Special Assistant to the Candidate'],
    ['Chuck', 'Max', 'Traveling Photographer'],
    ['Constance', 'Emily A.', 'Surrogates Communications Director'],
    ['Catherine', 'Emily A.', 'Surrogates Scheduler'],
    ['Heather', 'Emily A.', 'Surrogates Travel Manager'],
    ['DJ', 'Emily A.', 'Surrogates Digital Director']
  ]);

  // Create the chart
  var chart = new google.visualization.OrgChart(document.getElementById('org-chart-container'));
        
  // Draw the chart, setting the allowHtml option to true for tooltips
  chart.draw(orgData, {'allowHtml':true});
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
