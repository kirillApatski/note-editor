import React from 'react';
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.footerCopy}>&copy; Test 2023</p>
    </footer>
  );
};

export default Footer;