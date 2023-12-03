import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import NavigationBar from './NavigationBar'


function UserProfile() {
  const [users, setUsers] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/surveys')
      .then((response) => {
        console.log(response.data);
        setSurveys(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let userSurveys = [];
  const updateSurveyList = (data) => {

    userSurveys = [];
    //users.forEach((user, uIndex) => {
      //if (user.id) { // If user id matches
        /*surveys.forEach((survey, sIndex) => {
          //if (survey.userId == user.id) { // If survey's userId matches user's id
            userSurveys.push(
              <li>
                <div>
                  <h3>{survey.schoolName + " (" + sIndex + ")"}</h3>
                  <h3>{survey.onlineClassesRating + " (" + sIndex + ")"}</h3>
                  <h3>{survey.inPersonClassesRating + " (" + sIndex + ")"}</h3>
                  <h3>{survey.productivityRating + " (" + sIndex + ")"}</h3>
                  <button id="Read">View</button>
                  <button id="Update">Edit</button>
                  <button id="Delete">Remove</button>
                </div>
              </li>
            );
            
          //}
      
        });*/

        // Send a POST request to the server to store the survey details
    //axios .get(`${backendUrl}/surveys/submit-survey`, surveyData) .then((result) => { console.log('Survey retrieved successfully:', result.data); }) .catch((err) => { console.error('Survey retrieval error:', err); });
      //}
    //});

  };

  //updateSurveyList;

  return (
    <div>
      <NavigationBar />
      <h2>User Profile</h2>
      {
        users.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
          </div>
        ))
      }
      <br></br>
      <h3>Surveys: </h3>
      {
        surveys.map((survey) => (
          <li>
            <div key={survey._id}>
              <h3>{survey.name}</h3>
              <h3>{survey.schoolName}</h3>
              <h3>{survey.onlineClassesRating}</h3>
              <h3>{survey.inPersonClassesRating}</h3>
              <h3>{survey.productivityRating}</h3>
              <button id="Read">View</button>
              <button id="Update">Edit</button>
              <button id="Delete">Remove</button>
            </div>
          </li>
        ))
      }
      <ul>{userSurveys}</ul>
    </div>
  );
}

export default UserProfile;