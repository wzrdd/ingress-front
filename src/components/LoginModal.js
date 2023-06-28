import React, { useState } from 'react';

import Head from 'next/head';
import Script from 'next/script';

// CSS para el modal
const modalStyles = {
  position: 'fixed',
  width: '25%',
};

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Email y password no pueden estar vacíos.');
      return;
    }

    postLoginCredentials();
  };

  const postLoginCredentials = async () => {
    const url = 'http://localhost:3300/api/v1/auth/sign-in';
    const userCredentials = { email, password };
    console.log(userCredentials);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });

    const parsedResponse = await response.json();
    if (parsedResponse.auth && parsedResponse.auth.token) {
      localStorage.setItem('token', parsedResponse.auth.token);
      localStorage.setItem('userId', parsedResponse.auth.userId);

      // Recargar la página
      window.location.replace("/");
    }
    else {
      alert('Email y password incorrectos.');
    }
  };

  return (
    <>
      <div className="row justify-content-md-center">
        <Head>
          <link href="/hyper/dist/saas/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
          <link href="/hyper/dist/saas/assets/css/app.min.css" rel="stylesheet" type="text/css" id="light-style" />
        </Head>
        <div className="col-md-auto">
          <button
            className=' btn btn-danger'
            onClick={handleOpen}
          >
            Login
          </button>
        </div>
      </div>

      {open && (
        <div style={modalStyles}>
          <div className="card">
            <div className="card-header pt-4 pb-4 text-center bg-primary">
              <button className='btn btn-primary' onClick={handleClose}>&times;</button>
              <span><h2 className='text-dark'>Ingress</h2></span>
            </div>

            <div className="card-body p-4">

              <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                <p className="text-muted mb-4">Enter your email address and password to access admin panel.</p>
              </div>

              <form action="#">

                <div className="mb-3">
                  <label for="email" className="form-label">Email</label>
                  <input className="form-control" type="text" id="email" required="" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label for="password" className="form-label">Password</label>
                  <div className="input-group input-group-merge">
                    <input type="password" id="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="input-group-text" data-password="false">
                      <span className="password-eye"></span>
                    </div>
                  </div>
                </div>

                <div className="mb-3 mb-0 text-center">
                  <button className="btn btn-primary" onClick={handleLogin}> Entrar </button>
                </div>

              </form>
            </div>
          </div>
          <Script src="/hyper/dist/saas/assets/js/jquery.min.js"></Script>
          <Script src="/hyper/dist/saas/assets/js/vendor.min.js"></Script>
          <Script src="/hyper/dist/saas/assets/js/app.min.js"></Script>
        </div>
      )}
    </>
  );
}
