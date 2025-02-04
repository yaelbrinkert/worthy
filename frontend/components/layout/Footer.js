'use client';
import React from 'react';
import Image from 'next/image';
import Logo from '@/public/assets/images/logo_worthy_v1.png';

function Footer() {
  return (
    <footer className="wrapper__footer">
      <Image
        className="wrapper__footer__logo"
        src={Logo}
        priority
        alt="Logo Worthy"
        width="auto"
        height="auto"
      />
      <div className="wrapper__links__copyright">
        <div className="links__footer">
          <li>
            <a href="#">Politique de Confidentialité</a>
          </li>
          <hr />
          <li>
            <a href="#">Mentions Légales</a>
          </li>
          <hr />
          <li>
            <a href="#">Politique de Cookies</a>
          </li>
          <hr />
          <li>
            <a href="#">Conditions Générales de Vente</a>
          </li>
          <hr />
          <li>
            <a href="#">Nous contacter</a>
          </li>
        </div>
        <div className="copyright__footer">
          <p>Copyright © 2025 Worthy Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
