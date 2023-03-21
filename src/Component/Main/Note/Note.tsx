import React, {ChangeEvent, FC, useState} from 'react';
import s from './Note.module.scss'
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import Button from "../../../common/Button/Button";
import ConfirmIcon from "../../../assets/icons/ConfirmIcon";

type NotePropsType = {
  text: string
  id: string
  deleteNote: (id: string) => void
  updateNoteText: (text: string, id: string) => void
}

const Note: FC<NotePropsType> = ({text, id, deleteNote, updateNoteText}) => {
  const [editMode, setEditMode] = useState(false)
  const [valueTextarea, setValueTextarea] = useState(text)

  const onChangeHandlerTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.currentTarget.value
    setValueTextarea(textareaValue)
    updateNoteText(textareaValue, id)
  }
  const onClickHandlerDelete = () => {
    deleteNote(id)
  }
  const onClickHandlerEditMode = (mode: boolean) => {
    setEditMode(mode)
  }
  return (
    <div className={s.noteWrapper}>
      <div className={s.notePanel}>
        <Button
          onClick={onClickHandlerDelete}
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
          ? <p className={s.noteText}>{text}</p>
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