import {StateType} from "../store";
import {v1} from "uuid";


export const noteReducer = (state: StateType[], action: ActionType): StateType[] => {
  switch (action.type) {
    case 'ADD-NOTE':
      const newNote = {
        id: v1(),
        text: action.text,
        // teg: ''
      }
    return [
        ...state,
        newNote
    ]
    case "DELETE-NOTE":
      return state.filter(note => note.id !== action.id)
    case "UPDATE-NOTE-TEXT":
      return state.map(note => note.id === action.id ? {...note, text: action.text} : note)
    default:
      return state
  }
}

export const addNoteAC = (text: string) => {
  return {type: 'ADD-NOTE', text} as const
}
export const deleteNoteAC = (id: string) => {
  return {type: 'DELETE-NOTE', id} as const
}
export const updateNoteTextAC = (text: string, id: string) => {
  return {type: 'UPDATE-NOTE-TEXT', text, id} as const
}


export type ActionType = AddNote | DeleteNote | UpdateNoteText

export type AddNote = ReturnType<typeof addNoteAC>
export type DeleteNote = ReturnType<typeof deleteNoteAC>
export type UpdateNoteText = ReturnType<typeof updateNoteTextAC>
