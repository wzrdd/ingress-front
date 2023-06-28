import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ListUsers() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const [filter, setFilter] = useState('');

  const searchParams = useSearchParams();
  const role = searchParams.get('rol')

  let url = 'http://localhost:3300/api/v1/user/users'
  if (role) {
    url = url + '?' + new URLSearchParams({ rol: role })
    console.log(url)
  }

  const fetchUsers = async (authorization) => {
    let url = 'http://localhost:3300/api/v1/user/users'
    if (role) {
      url = url + '?' + new URLSearchParams({ rol: role })
      console.log(url)
    }

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      }
    );

    if (response.status === 200) {
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
      setUsersFetched(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authorization = `Bearer ${token}`;
    fetchUsers(authorization);
  }, [router.query]);

  useEffect(() => {
    filterUsers();
  }, [users, filter]);

  const filterUsers = () => {
    if (filter === 'Cliente') {
      setFilteredUsers(users.filter(user => user.role === 'Cliente'));
    } else if (filter === 'Logístico') {
      setFilteredUsers(users.filter(user => user.role === 'Logístico'));
    } else if (filter === 'Admin') {
      setFilteredUsers(users.filter(user => user.role === 'Admin'));
    } else if (filter === 'Operario') {
      setFilteredUsers(users.filter(user => user.role === 'Operario'));
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <>
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
          <div class="row">
            <div class="col-3">
              <div class="btn btn-primary">
                <Link class="text-dark" href="/users?rol=Cliente" passHref>Cliente</Link>
              </div>
            </div>
            <div class="col-3">
              <div class="btn btn-warning">
                <Link class="text-dark" href="/users?rol=Logistico">Logístico</Link>
              </div>
            </div>
            <div class="col-3">
              <div class="btn btn-danger">
                <Link class="text-dark" href="/users?rol=Admin">Admin</Link>
              </div>
            </div>
            <div class="col-3">
              <div class="btn btn-success">
                <Link class="text-dark" href="/users?rol=Operario">Operario</Link>
              </div>
            </div>
          </div>
          <div class="mx-auto mt-2">
            <div class="btn btn-success">
              <Link class="text-dark" href="/users">Borrar</Link>
            </div>
          </div>
        </div>


      </div>
      <br />
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
          <table class="table table-bordered border-primary table-striped table-centered mb-0">
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (

                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Link href={`/users/${user.id}`}>
                      {user.name} {user.lastName}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br/>

          <div class="btn btn-primary">
            <Link class="text-dark" href="/users/create">Crear Usuario</Link>
          </div>
        </div>
      </div>
    </>
  );
}
