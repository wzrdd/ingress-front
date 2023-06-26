// Import from Library
import Swal from 'sweetalert2'

// MaterialUI
import Button from '@mui/material/Button';

export default function LoginModal() {
  const loginModal = async () => {
    const inputForm = await Swal.fire({
      title: 'Login Form',
      html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
      confirmButtonText: 'Entrar',
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value
        const password = Swal.getPopup().querySelector('#password').value
        if (!email || !password) {
          Swal.showValidationMessage(`Email y password no pueden estar vacíos.`)
        }
        return { email, password }
      }
    })

    const postLoginCredentials = async () => {
      const url = `http://localhost:3300/api/v1/auth/sign-in`;

      const { email, password } = inputForm.value
      const userCredentials = { email, password }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
      })

      const parsedResponse = await response.json()
      localStorage.setItem('token', parsedResponse.auth.token)
      localStorage.setItem('userId', parsedResponse.auth.userId)
      // TODO handle error
    }

    if (inputForm.isConfirmed) {
      postLoginCredentials()
    }
  }

  return (
    <>
      <Button
        sx={{ mr: 2, mt: 2, mb: 2 }}
        color='error'
        variant="contained"
        onClick={() => loginModal()}
      >
        Login
      </Button>

    </>
  )
}

