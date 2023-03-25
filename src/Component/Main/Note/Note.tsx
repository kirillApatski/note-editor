import React, {ChangeEvent, FC, useState} from 'react';
import s from './Note.module.scss'
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import Button from "../../../common/Button/Button";
import ConfirmIcon from "../../../assets/icons/ConfirmIcon";
import {v1} from "uuid";
import {ActionNoteType, addTagsAC, removeTagAC, TagType} from "../../../reducers/noteReduser";
import DeleteIconMin from "../../../assets/icons/DeleteIconMin";

type NotePropsType = {
  text: string
  idNote: string
  tags: TagType[]
  dispatchNote: (value: ActionNoteType) => void
  deleteNote: (id: string) => void
  updateNoteText: (text: string, id: string) => void
}

const Note: FC<NotePropsType> = (
  {text,tags, idNote, deleteNote, updateNoteText, dispatchNote}
) => {
  const [editMode, setEditMode] = useState(false)
  const [valueTextarea, setValueTextarea] = useState(text)

  const onChangeHandlerTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.currentTarget.value
    setValueTextarea(textareaValue)
    updateNoteText(textareaValue, idNote)
  }
  const onClickHandlerDeleteNote = () => {
    deleteNote(idNote)
  }
  const onClickHandlerDeleteTag = (idTag: string) => {
    dispatchNote(removeTagAC(idNote, idTag))
  }
  const onClickHandlerEditMode = (mode: boolean) => {
    setEditMode(mode)
    addTeg(valueTextarea)
  }
  const addTeg = (value: string) => {
    let val = value.split(/(#[a-z\d-]+)/ig);
    const arrTags = []
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        const obg = {
          tag: val[i],
          id: v1()
        } as TagType
        arrTags.push(obg)
        dispatchNote(addTagsAC(arrTags, idNote))
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
            <ul className={s.tagsBox}>
              {

                tags.map(tag => {
                  return (
                    <React.Fragment key={tag.id}>
                      <li>
                        {tag.tag}
                        <Button className={s.button} onClick={() => onClickHandlerDeleteTag(tag.id)}>
                          <DeleteIconMin/>
                        </Button>
                      </li>
                    </React.Fragment>
                  )
                })
              }
            </ul>
          </>
          : <div className={s.updateBox}>
            <textarea
              autoFocus={true}
              className={s.textarea}
              value={valueTextarea}
              onBlur={() => onClickHandlerEditMode(false)}
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