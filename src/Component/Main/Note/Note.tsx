import React, {FC, FormEvent, useState} from 'react';
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
  {text, tags, idNote, deleteNote, updateNoteText, dispatchNote}
) => {
  const [editMode, setEditMode] = useState(false)
  const [valueTextarea, setValueTextarea] = useState(text)

  const onChangeHandlerTextarea = (e: FormEvent<HTMLParagraphElement>) => {
    const textareaValue = e.currentTarget.textContent
    if(textareaValue){
      let selectedText = window.getSelection();
      let selectedRange = document.createRange();
      if(selectedText && selectedRange) {
        selectedRange.setStart(e.currentTarget, selectedText.rangeCount);
        selectedRange.collapse(true);
        selectedText.removeAllRanges();
        selectedText.addRange(selectedRange);
        e.currentTarget.focus();
      }
      setValueTextarea(textareaValue)
      updateNoteText(textareaValue, idNote)
      if (textareaValue?.length === 0) {
        dispatchNote(addTagsAC([], idNote))
      }
    }
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
  const addTeg = (value: string | null) => {
    let val = value?.split(/(#[a-я\d-]+)/ig);
    const arrTags = []
    if (val) {
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
            <p
              className={s.updateText}
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={() => onClickHandlerEditMode(false)}
              onInput={onChangeHandlerTextarea}
            >{valueTextarea}</p>
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