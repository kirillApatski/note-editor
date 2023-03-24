type TagsType = {
  [key: string] : Array<TagType>
}
export type TagType = {
  id: string
  tag: string
}
export const tagsReducer = (state: TagsType, action: ActionType): TagsType => {
  switch (action.type) {
    case "ADD-TAG":
      return {
        ...state,
        [action.idNote]: action.tags
      }
    case "DELETE-TAG":
      return {
        ...state,
        [action.idNote]: state[action.idNote].filter(tag => tag.id !== action.idTag)
      }
    default:
      return state
  }
}

export const addTagsAC = (tags: Array<TagType>, idNote: string) => {
  return {type: 'ADD-TAG', tags, idNote} as const
}
export const deleteTagAC = (idNote: string, idTag: string ) => {
  return {type: 'DELETE-TAG', idNote, idTag} as const
}

export type ActionType = AddTagAC | DeleteTagAC

export type AddTagAC = ReturnType<typeof addTagsAC>
export type DeleteTagAC = ReturnType<typeof deleteTagAC>

