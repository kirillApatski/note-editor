import React, {ChangeEvent, FC, useReducer, useState} from 'react';
import s from './Note.module.scss'
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import Button from "../../../common/Button/Button";
import ConfirmIcon from "../../../assets/icons/ConfirmIcon";
import {addTagsAC, deleteTagAC, tagsReducer, TagType} from "../../../reducers/tagsReducer";
import {v1} from "uuid";
import DeleteIconMin from "../../../assets/icons/DeleteIconMin";

type NotePropsType = {
  text: string
  idNote: string
  deleteNote: (id: string) => void
  updateNoteText: (text: string, id: string) => void
}

const Note: FC<NotePropsType> = ({text, idNote, deleteNote, updateNoteText}) => {
  const [editMode, setEditMode] = useState(false)
  const [valueTextarea, setValueTextarea] = useState(text)
  const [tags, dispatch] = useReducer(tagsReducer, {})

  const onChangeHandlerTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.currentTarget.value
    setValueTextarea(textareaValue)
    updateNoteText(textareaValue, idNote)
  }
  const onClickHandlerDeleteNote = () => {
    deleteNote(idNote)
  }
  const onClickHandlerDeleteTag = (idTag: string) => {
    dispatch(deleteTagAC(idNote, idTag))
  }
  const onClickHandlerEditMode = (mode: boolean) => {
    setEditMode(mode)
    addTeg(valueTextarea)
  }
  const addTeg = (value: string) => {
    let val = value.split(/(#[a-z\d-]+)/ig);
    const arr = []
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        const obg = {
          tag: val[i],
          id: v1()
        } as TagType
        arr.push(obg)
        dispatch(addTagsAC(arr, idNote))
      }
    }
  }
  return (
    <div className={s.noteWrapper}>
      <div className={s.notePanel}>
        <Button
          onClick={onClickHandlerDeleteNote}
          className={s.button}
        >
          <DeleteIcon/>
        </Button>
        <Button
          onClick={() => onClickHandlerEditMode(true)}
          className={s.button}
        >
          <EditIcon/>
        </Button>
      </div>
      {
        !editMode
          ? <>
            <p className={s.noteText}>{text}</p>
            {
              tags[idNote]?.map(tag => {
                return (
                  <ul key={tag.id} className={s.tagsBox}>
                    <li>
                      {tag.tag}
                    </li>
                    <Button className={s.button} onClick={() =>onClickHandlerDeleteTag(tag.id)}>
                      <DeleteIconMin/>
                    </Button>
                  </ul>
                )
              })
            }
          </>
          : <div className={s.updateBox}>
            <textarea
              autoFocus={true}
              className={s.textarea}
              value={valueTextarea}
              onChange={onChangeHandlerTextarea}
            />
            <Button
              className={s.button}
              onClick={() => onClickHandlerEditMode(false)}
            >
              <ConfirmIcon/>
            </Button>
          </div>
      }
    </div>
  );
};

export default Note;