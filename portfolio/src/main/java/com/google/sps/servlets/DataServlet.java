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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.util.*;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* 
 * Allows users to leave comments. 
 */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  // Initializes comments instance
  private ArrayList<String> commentsList = new ArrayList<String>();

  // Initializes persistent storage instance
  private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get user input for number of comments listed.
    int commentLimit = getCommentLimit(request);
    if (commentLimit == -1) {
      response.setContentType("text/html");
      response.getWriter().println("Please enter a valid integer");
      return;
    }

    // Loads comments from persistent storage
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);
    for (Entity storedComment : results.asIterable()) {
        String name = (String) storedComment.getProperty("Name");
        String text = (String) storedComment.getProperty("Text");
        long time = (long) storedComment.getProperty("Time");
        String entry = name + ": " + text + " (" + time + ")";
        commentsList.add(entry);
    }

    // Converts comments to JSON using Gson library
    String comments = new Gson().toJson(commentsList);
    
    // Sends new JSON as response
    response.setContentType("application/json;");
    response.getWriter().println(comments);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      
    // Reads user input to generates comment properties
    String name = request.getParameter("name-field");
    String text = request.getParameter("text-field");
    long time = System.currentTimeMillis();

    // Stores comment in persistent storage
    Entity storedComment = new Entity("Comment");
    storedComment.setProperty("Name", name);
    storedComment.setProperty("Text", text);
    storedComment.setProperty("Time", time);
    datastore.put(storedComment);

    // Redirects back to the HTML page
    response.sendRedirect("/index.html");
  }

  /*
   * Returns comment limit selected by user or -1 if input is invalid.
   */
  private int getCommentLimit(HttpServletRequest request) {
    // Get input from the form
    String commentLimitInput = request.getParameter("comment-limit");

    // Convert input to an int
    int commentLimit;
    try {
      commentLimit = Integer.parseInt(commentLimitInput);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + commentLimitInput);
      commentLimit = -1;
    }

    if (commentLimit < 0) {
      System.err.println("Input is not a nonnegative number: " + commentLimitInput);
      commentLimit = -1;
    }

    return commentLimit;
  }
}
