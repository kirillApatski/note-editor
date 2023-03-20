import React from 'react';
import s from './Note.module.scss'
import DeleteIcon from "../../../assets/icons/deleteIcon";
import EditIcon from "../../../assets/icons/editIcon";

const Note = () => {
  return (
    <div className={s.noteWrapper}>
      <div className={s.notePanel}>
        <DeleteIcon/>
        <EditIcon/>
      </div>
    </div>
  );
};

export default Note;