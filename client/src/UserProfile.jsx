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
  users.forEach((user, uIndex) => {
    if (user.id) { // If user id matches

      surveys.forEach((survey, sIndex) => {

        if (survey.userId == user.id) { // If survey's userId matches user's id

          userSurveys.push(
            <li>
              <div>
                <h3>{survey.name + " (" + sIndex + ")"}</h3>
                <button id="Read">View</button>
                <button id="Update">Edit</button>
                <button id="Delete">Remove</button>
              </div>
            </li>
          );

        }
    
      });

    }
  });

  return (
    <div>
      <NavigationBar />
      <h2>User Profile</h2>
      {
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
          </div>
        ))
      }
      <h3>Surveys: </h3>
      <ul>{userSurveys}</ul>
    </div>
  );

}

export default UserProfile;