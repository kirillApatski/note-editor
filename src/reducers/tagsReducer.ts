import {AddNote} from "./noteReduser";

export type TagsType = {
  [key: string] : Array<TagType>
}
export type TagType = {
  id: string
  tag: string
}
export const tagsReducer = (state: TagsType, action: ActionTagType): TagsType => {
  switch (action.type) {
    case "ADD-TAG":
      return {
        ...state,
        [action.idNote]: action.tags
      }
    case "ADD-NOTE" :
      return {
        ...state,
        [action.idNote]: []
      }
    case "DELETE-TAG":
      return {
        ...state,
        [action.idNote]: state[action.idNote].filter(tag => tag.id !== action.idTag)
      }
    case "SEARCH-TAG":
      return {}
    default:
      return state
  }
}

export const addTagsAC = (tags: Array<TagType>, idNote: string) => {
  return {type: "ADD-TAG", tags, idNote} as const
}
export const removeTagAC = (idNote: string, idTag: string ) => {
  return {type: "DELETE-TAG", idNote, idTag} as const
}
export const searchTagAC = (text: string) => {
  return {type: "SEARCH-TAG", text} as const
}

export type ActionTagType = AddTagAC | DeleteTagAC | AddNote | SearchTagAC

export type AddTagAC = ReturnType<typeof addTagsAC>
export type DeleteTagAC = ReturnType<typeof removeTagAC>
export type SearchTagAC = ReturnType<typeof searchTagAC>

