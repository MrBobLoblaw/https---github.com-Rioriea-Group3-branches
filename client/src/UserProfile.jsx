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
    </div>
  );
}

export default UserProfile;