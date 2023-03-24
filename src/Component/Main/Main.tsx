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
import {tagsReducer} from "../../reducers/tagsReducer";

export const initialState: StateType[] = []

export type StateType = {
  id: string
  text: string
}


const Main = () => {
  const [state, dispatchNote] = useReducer(noteReducer, initialState)
  const [tags, dispatchTags] = useReducer(tagsReducer, {})
  const [valueInputText, setValueInputText] = useState('')

  const onChangeHandler = (text: string) => {
    setValueInputText(text)
  }
  const addNewNote = () => {
    const action = addNoteAC(valueInputText)
    dispatchNote(action)
    dispatchTags(action)
    setValueInputText('')
  }
  const onKeyPressHandler = () => {
    addNewNote()
  }
  const deleteNote = (id: string) => {
    dispatchNote(deleteNoteAC(id))
  }
  const updateNoteText = (newText: string, id: string) => {
    dispatchNote(updateNoteTextAC(newText, id))
  }
  return (
    <main className={s.main}>
      <form className={s.form}>
        <div className={s.inputContainer}>
          <label htmlFor="addNote">Added Note</label>
          <Input
            form="addNote"
            type="text"
            placeholder='Enter text'
            onChangeText={onChangeHandler}
            onEnter={onKeyPressHandler}
            value={valueInputText}
          />
          <Button type="button" onClick={addNewNote}>Add</Button>
        </div>
        <div className={s.inputContainer}>
          <label htmlFor="addNote">Tag search</label>
          <Input
            form="addNote"
            type="text"
            placeholder='Enter the tag name'
            onChangeText={() => {}}
            onEnter={onKeyPressHandler}
            value={'search'}
          />
          <Button type="button">Search</Button>
        </div>
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
                  tags={tags}
                  dispatchTags={dispatchTags}
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