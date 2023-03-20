import React from 'react';
import s from './Header.module.scss'

const Header = () => {
  return (
    <header className={s.header}>
      <h1 className={s.title}>Text editor of notes with tags</h1>
    </header>
  );
};

export default Header;