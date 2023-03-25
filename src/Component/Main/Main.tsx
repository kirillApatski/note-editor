import React, {useReducer, useState} from 'react';
import s from './Main.module.scss'
import Note from "./Note/Note";
import {
  addNoteAC,
  deleteNoteAC,
  noteReducer, searchTagAC, TagType,
  updateNoteTextAC
} from "../../reducers/noteReduser";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
export const initialState: StateType[] = []

export type StateType = {
  id: string
  text: string
  tags: TagType[]
}


const Main = () => {
  const [state, dispatchNote] = useReducer(noteReducer, initialState)
  const [valueInputText, setValueInputText] = useState('')
  const [searchTag, setSearchTag] = useState('')
  console.log(state)
  const onChangeHandler = (text: string) => {
    setValueInputText(text)
  }
  const onChangeSearchHandler = (text: string) => {
    setSearchTag(text)
  }
  const a = () => {
    dispatchNote(searchTagAC(searchTag))
  }
  const addNewNote = () => {
    if(valueInputText.trim().length !== 0){
      dispatchNote(addNoteAC(valueInputText))
      setValueInputText('')
    }
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
            onChangeText={onChangeSearchHandler}
            onEnter={onKeyPressHandler}
            value={searchTag}
          />
          <Button onClick={a} type="button">Search</Button>
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
                  tags={note.tags}
                  dispatchNote={dispatchNote}
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