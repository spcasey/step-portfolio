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

package com.google.sps;
import java.util.*;

/*
 * Returns available meeting times upon input of a collection of pre-existing meetings and a 
 * potential meeting time.
 */
public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    
    // Objects containing available and booked times for mandatory and optional attendees
    List<TimeRange> mandatoryAvailable = new ArrayList<TimeRange>();
    List<TimeRange> mandatoryBooked = new ArrayList<TimeRange>();
    List<TimeRange> optionalAvailable = new ArrayList<TimeRange>();
    List<TimeRange> optionalBooked = new ArrayList<TimeRange>();

    // Objects containing mandatory and optional attendees
    Collection<String> meetingAttendees = request.getAttendees();
    Collection<String> optionalAttendees = request.getOptionalAttendees();
    
    // Potential meeting length
    long meetingDuration = request.getDuration();

    // Returns an empty list if meeting lasts longer than 24 hours
    if (meetingDuration > TimeRange.END_OF_DAY) {
      return mandatoryAvailable;
    }

    // Iterates through all events and checks if attendees are already booked
    for (Event event : events) {
      if (!Collections.disjoint(meetingAttendees, event.getAttendees())) {
        mandatoryBooked.add(event.getWhen());
        optionalBooked.add(event.getWhen());
      } else if (!Collections.disjoint(optionalAttendees, event.getAttendees())) {
        optionalBooked.add(event.getWhen());
      }
    }

    // Uses helper method to find available times for optional and mandatory attendees
    findPossibleTimes(optionalAvailable, optionalBooked, meetingDuration);
    findPossibleTimes(mandatoryAvailable, mandatoryBooked, meetingDuration);

    // Returns available times with optional attendees if possible and mandatory attendees if not
    if (!optionalAvailable.isEmpty() || meetingAttendees.isEmpty()) {
      return optionalAvailable;
    } else {
      return mandatoryAvailable;
    }
  }

  /*
   * Finds available times for a meeting given list of booked times and a meeting length.
   */
  private static void findPossibleTimes(List<TimeRange> mandatoryAvailable, List<TimeRange> mandatoryBooked, 
    long meetingDuration) {

    // Variables containing the beginning and end of the day
    int startOfDay = TimeRange.START_OF_DAY;
    int endOfDay = TimeRange.END_OF_DAY;

    // Sorts events by start time
    Collections.sort(mandatoryBooked, TimeRange.ORDER_BY_START);

    // Iterates through all booked times and adds available times to list 
    for (TimeRange bookedTime : mandatoryBooked) {
      if (startOfDay + meetingDuration <= bookedTime.start()) {
        mandatoryAvailable.add(TimeRange.fromStartEnd(startOfDay, bookedTime.start(), false));
      }

      // Checks for superseded times
      if (bookedTime.end() > startOfDay) {
        startOfDay = bookedTime.end();
      }
    }

    // Checks for possible times that may carry into the next day
    if (startOfDay + meetingDuration <= endOfDay) {
      mandatoryAvailable.add(TimeRange.fromStartEnd(startOfDay, endOfDay, true));
    }
  }
}