import React, {useReducer, useState} from 'react';
import s from './Main.module.scss'
import Note from "./Note/Note";
import {
  addNoteAC,
  deleteNoteAC,
  noteReducer,
  updateNoteTextAC
} from "../../reducers/noteReduser";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";


export const initialState: StateType[] = []

export type StateType = {
  id: string
  text: string
}


const Main = () => {
  const [state, dispatch] = useReducer(noteReducer, initialState)
  const [valueInputText, setValueInputText] = useState('')

  const onChangeHandler = (text: string) => {
    setValueInputText(text)
  }
  const addNewNote = () => {
    valueInputText && dispatch(addNoteAC(valueInputText))
    setValueInputText('')
  }
  const onKeyPressHandler = () => {
    addNewNote()
  }
  const deleteNote = (id: string) => {
    dispatch(deleteNoteAC(id))
  }
  const updateNoteText = (newText: string, id: string) => {
    dispatch(updateNoteTextAC(newText, id))
  }
  return (
    <main className={s.main}>
      <form className={s.addNote}>
        <label htmlFor="addNote">Added Note</label>
        <Input
          form="addNote"
          type="text"
          placeholder='Enter text'
          onChangeText={onChangeHandler}
          onEnter={onKeyPressHandler}
          value={valueInputText}
        />
        <Button onClick={addNewNote}>Add</Button>
      </form>
      <div className={s.mainContent}>
        {
          !state.length
            ?
            <h2 className={s.contentTitle}>Create a note</h2>
            : state.map(note => {
              return (
                <Note
                  key={note.id}
                  idNote={note.id}
                  deleteNote={deleteNote}
                  updateNoteText={updateNoteText}
                  text={note.text}
                />
              )
            })
        }
      </div>
    </main>
  );
};

export default Main;