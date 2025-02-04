'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/navbar.css';
import { usePathname } from 'next/navigation';
import worthylogo from '@/public/assets/images/logo_worthy_v1.png';

export default function Navbar() {
  const currentPath = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);

  function handleOpenNav() {
    setNavbarOpen((navbarOpen) => !navbarOpen);
  }
  function handleCloseNav() {
    setNavbarOpen(false);
  }

  return (
    <nav className="navbar navbar-expand-xl bg-body-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image
            alt="Logo Worthy"
            src={worthylogo}
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleOpenNav}
        >
          <span className="toggler-first-bar"></span>
          <span className="toggler-second-bar"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-0 mb-xl-0 align-center">
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/' ? 'nav-link active_nav' : 'nav-link'
                }
                href="/"
              >
                <i className="fa fa-home"></i> <span>Accueil</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/shop/clothing'
                    ? 'nav-link active_nav'
                    : 'nav-link'
                }
                href="/shop/clothing"
              >
                <i className="fa fa-vest-patches"></i> <span>Vêtements</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/shop/jewelry'
                    ? 'nav-link active_nav'
                    : 'nav-link'
                }
                href="/shop/jewelry"
              >
                <i className="fa fa-gem"></i> <span>Bijoux</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/shop/cosmetics'
                    ? 'nav-link active_nav'
                    : 'nav-link'
                }
                href="/shop/cosmetics"
              >
                <i className="fa fa-spray-can-sparkles"></i>{' '}
                <span>Cosmétiques</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/shop/candles'
                    ? 'nav-link active_nav'
                    : 'nav-link'
                }
                href="/shop/candles"
              >
                <i className="fa fa-fire-flame-simple"></i> <span>Bougies</span>
              </Link>
            </li>
          </ul>
          <br />
          <ul className="d-flex navbar-nav align-center">
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/auth/login'
                    ? 'nav-link nav-login active_nav'
                    : 'nav-link nav-login'
                }
                href="/auth/login"
              >
                <i className="fa fa-right-to-bracket"></i>{' '}
                <span>Se connecter</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className="nav-link nav-logout"
                href="#"
              >
                <i className="fa fa-right-from-bracket"></i>{' '}
                <span>Se déconnecter</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/auth/signup'
                    ? 'nav-link nav-login active_nav'
                    : 'nav-link nav-login'
                }
                href="/auth/signup"
              >
                <i className="fa fa-user-plus"></i> <span>S'inscrire</span>
              </Link>
            </li>
            <li className="nav-cart">
              <Link
                onClick={handleCloseNav}
                className={
                  currentPath === '/basket' ? 'nav-link active_nav' : 'nav-link'
                }
                href="/basket"
              >
                <span className="fa fa-bag-shopping"></span>
                <span className="number-items-cart"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
