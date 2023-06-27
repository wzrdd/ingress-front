import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="navbar-custom topnav-navbar topnav-navbar-dark">
    <Head>
        <link href="/hyper/dist/saas/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <link href="/hyper/dist/saas/assets/css/app.min.css" rel="stylesheet" type="text/css" id="light-style" />
    </Head>
      <div className="container-fluid">
        <Link href="/" legacyBehavior>
          <a className="topnav-logo">
            <span className="topnav-logo-lg text-secondary">
              <h3>
                Ingress
              </h3>
            </span>
            <span className="topnav-logo-sm text-secondary">
              <h4>
                Ingress
              </h4>
            </span>
          </a>
        </Link>

        <ul className="list-unstyled topbar-menu float-end mb-0">

          <li className="dropdown notification-list d-xl-none">
            <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i class="dripicons-search noti-icon"></i>
            </a>
            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
              <i className="dripicons-search noti-icon"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
              <form className="p-3">
                <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
              </form>
            </div>
          </li>

          <li className="dropdown notification-list">
            <a className="nav-link dropdown-toggle nav-user arrow-none me-0" data-bs-toggle="dropdown" id="topbar-userdrop" href="#" role="button" aria-haspopup="true" aria-expanded="false">
              <span className="account-user-avatar"> <img src="/hyper/dist/saas/assets/images/users/avatar-1.jpg" alt="user-image" className="rounded-circle" /> </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown" aria-labelledby="topbar-userdrop">

              <div className="dropdown-header noti-title">
                <h6 className="text-overflow m-0">Bienvenido!</h6>
              </div>

              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <i className="mdi mdi-account-outline"></i>
                <span>Mi cuenta</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <i className="mdi mdi-settings-outline"></i>
                <span>Configuración</span>
              </a>

              <a href="javascript:void(0);" className="dropdown-item notify-item">
                <i className="mdi mdi-lifebuoy"></i>
                <span>Soporte</span>
              </a>

              <div className="dropdown-divider"></div>

              <Link href="/logout" legacyBehavior>
                <button className="dropdown-item notify-item" onClick={logout}>
                  <i className="mdi mdi-logout"></i>
                  <span>Cerrar sesión</span>
                </button>
              </Link>

            </div>
          </li>

        </ul>

      </div>

      <Script src="/hyper/dist/saas/assets/js/jquery.min.js"></Script>
      <Script src="/hyper/dist/saas/assets/js/vendor.min.js"></Script>
    </div>
  );
};

export default Header;
