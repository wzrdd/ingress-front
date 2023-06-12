import { useState, useEffect } from 'react';

export default function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost:3300/api/v1/user/users',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer $2b$10$Lcdfn07NvPv3ML/BpMfggemfixFoJz.lJ0lDY.MT2Ezmts.SRLSTO'
        }
      }
    )
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <>
      {/* TODO this should be a table with material UI */}
      {users && users.map(user => {
        return (
          <span key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </span>
        )
      })}
    </>
  );
}
