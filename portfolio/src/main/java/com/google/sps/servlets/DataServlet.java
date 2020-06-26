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

import java.util.*;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 
 * Allows users to leave comments. 
 */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Initialize comments instance and include several hard-coded values as a test
    ArrayList<String> commentsList = new ArrayList<String>();
    commentsList.add("Sean");
    commentsList.add("Patrick");
    commentsList.add("Casey");
    
    // Converts comments to JSON
    String comments = convertToJson(commentsList);

    // Send new JSON as response
    response.setContentType("application/json;");
    response.getWriter().println(comments);
  }

  /**
   * Manually converts comments into a JSON string using concatentation. 
   * (Temporary - see below)
   */
  private String convertToJson(ArrayList<String> arrList) {
    String json = "{";
    json += "\"firstName\": ";
    json += "\"" + arrList.get(0) + "\"";
    json += ", ";
    json += "\"middleName\": ";
    json += "\"" + arrList.get(1) + "\"";
    json += ", ";
    json += "\"lastName\": ";
    json += "\"" + arrList.get(2) + "\"";
    json += "}";
    return json;
  }


  /**
   * Converts comments into a JSON string using the Gson library. 
   * (Gson dependency currently broken - would prefer this method over above
   * given its flexibility)
   */
  /*private String convertToJson(ArrayList<String> arrList) {
    Gson gson = new Gson();
    String json = gson.toJson(arrList);
    return json;
  }*/
}
