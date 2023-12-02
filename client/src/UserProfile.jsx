import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import NavigationBar from './NavigationBar'


function UserProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    </div>
  );
}

export default UserProfile;