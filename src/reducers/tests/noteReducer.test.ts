import {tagsReducer, TagsType} from "../tagsReducer";
import {StateType} from "../../Component/Main/Main";
import {addNoteAC, noteReducer} from "../noteReduser";

test('ids should be equals', () => {
  const startTagsState: TagsType = {};
  const startNoteState: Array<StateType> = [];

  const action = addNoteAC("new note");
  const endTagsState = tagsReducer(startTagsState, action)
  const endNoteState = noteReducer(startNoteState, action)

  const keys = Object.keys(endTagsState);
  const idFromTags = keys[0];
  const idFromNote = endNoteState[0].id;

  expect(idFromTags).toBe(action.idNote);
  expect(idFromNote).toBe(action.idNote);
});