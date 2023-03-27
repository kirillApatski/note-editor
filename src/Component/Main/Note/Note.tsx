import React, {FC, FormEvent, useState} from 'react';
import s from './Note.module.scss'
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import Button from "../../../common/Button/Button";
import ConfirmIcon from "../../../assets/icons/ConfirmIcon";
import {v1} from "uuid";
import {ActionNoteType, addTagsAC, removeTagAC, TagType} from "../../../reducers/noteReduser";
import Tag from "./Tag/Tag";

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
  const [valueUpdateText, setValueUpdateText] = useState(text)

  const setCurrentCursorPosition = (updateValue: string, e: FormEvent<HTMLParagraphElement>) => {
    const selectedText = window.getSelection()
    const selectedRange = document.createRange()
    if (selectedText && selectedRange) {
      selectedRange.setStart(e.currentTarget, selectedText.rangeCount)
      selectedText.removeAllRanges()
      selectedText.addRange(selectedRange)
      e.currentTarget.focus()
    }
  }

  const onChangeHandlerTextarea = (e: FormEvent<HTMLParagraphElement>) => {
    const updateValue = e.currentTarget.textContent

    if (updateValue) {
      setCurrentCursorPosition(updateValue, e)
      setValueUpdateText(updateValue)
      updateNoteText(updateValue, idNote)
    }
    if (updateValue?.length === 0) {
      dispatchNote(addTagsAC([], idNote))
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
    addTeg(valueUpdateText)
  }
  const addTeg = (value: string) => {
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
                    <Tag
                      key={tag.id}
                      tag={tag}
                      onClickHandlerDeleteTag={onClickHandlerDeleteTag}
                    />
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
            >
              {valueUpdateText}
            </p>

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