import {v1} from "uuid";
import {StateType} from "../Component/Main/Main";

export const noteReducer = (state: StateType[], action: ActionNoteType): StateType[] => {
  switch (action.type) {
    case "ADD-NOTE":
      const newNote = {
        id: action.idNote,
        text: action.text,
      }
      return [
        ...state,
        newNote
      ]
    case "DELETE-NOTE":
      return state.filter(note => note.id !== action.idNote)
    case "UPDATE-NOTE-TEXT":
      return state.map(note => note.id === action.idNote ? {...note, text: action.text} : note)
    default:
      return state
  }
}

export const addNoteAC = (text: string) => {
  return {type: "ADD-NOTE", text, idNote: v1()} as const
}
export const deleteNoteAC = (idNote: string) => {
  return {type: "DELETE-NOTE", idNote} as const
}
export const updateNoteTextAC = (text: string, idNote: string) => {
  return {type: "UPDATE-NOTE-TEXT", text, idNote} as const
}


export type ActionNoteType = AddNote | DeleteNote | UpdateNoteText

export type AddNote = ReturnType<typeof addNoteAC>
export type DeleteNote = ReturnType<typeof deleteNoteAC>
export type UpdateNoteText = ReturnType<typeof updateNoteTextAC>
