import React from 'react';
import s from './Main.module.scss'
import Note from "./Note/Note";


const Main = () => {

  return (
    <main className={s.main}>
      <div className={s.addNote}>
        <label htmlFor="addNote">Added Note</label>
        <input form="addNote" type="text"/>
        <button>Add</button>
      </div>
      <div className={s.mainContent}>
          <Note/>
      </div>
    </main>
  );
};

export default Main;