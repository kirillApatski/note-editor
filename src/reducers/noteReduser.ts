import {v1} from "uuid";
import {StateType} from "../Component/Main/Main";

export type TagType = {
  id: string
  tag: string
}
export const noteReducer = (state: StateType[], action: ActionNoteType): StateType[] => {
  switch (action.type) {
    case "ADD-NOTE":
      const newNote = {
        id: action.idNote,
        text: action.text,
        tags: []
      }
      return [
        ...state,
        newNote
      ]
    case "ADD-TAG" :
      return state.map(note => note.id === action.idNote ? {...note, tags: action.tags} : note)
    case "DELETE-TAG":
      return state.map(note => note.id === action.idNote ? {...note, tags: note.tags.filter(tag => tag.id !== action.idTag)} : note)
    case "DELETE-NOTE":
      return state.filter(note => note.id !== action.idNote)
    case "UPDATE-NOTE-TEXT":
      return state.map(note => note.id === action.idNote ? {...note, text: action.text} : note)
    case "SEARCH-TAG":
      return []
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
export const addTagsAC = (tags: Array<TagType>, idNote: string) => {
  return {type: "ADD-TAG", tags, idNote} as const
}
export const searchTagAC = (text: string) => {
  return {type: "SEARCH-TAG", text} as const
}
export const removeTagAC = (idNote: string, idTag: string ) => {
  return {type: "DELETE-TAG", idNote, idTag} as const
}

export type ActionNoteType = AddNote | DeleteNote | UpdateNoteText | AddTagsAC | DeleteTagAC | SearchTagAC

export type AddNote = ReturnType<typeof addNoteAC>
export type DeleteNote = ReturnType<typeof deleteNoteAC>
export type UpdateNoteText = ReturnType<typeof updateNoteTextAC>
export type AddTagsAC = ReturnType<typeof addTagsAC>
export type DeleteTagAC = ReturnType<typeof removeTagAC>
export type SearchTagAC = ReturnType<typeof searchTagAC>

