import {addTagsAC, removeTagAC, tagsReducer, TagsType} from "../tagsReducer";

test('correct tag should be deleted from correct array', () => {
  const startState: TagsType = {
    "noteId1": [
      { id: "1", tag: "#shop"},
      { id: "2", tag: "#minsk"},
      { id: "3", tag: "#food"}
    ],
    "noteId2": [
      { id: "1", tag: "#good"},
      { id: "2", tag: "like"},
      { id: "3", tag: "live"}
    ]
  };

  const action = removeTagAC("noteId2" ,"2");
  const endState = tagsReducer(startState, action)

  expect(endState["noteId1"].length).toBe(3);
  expect(endState["noteId2"].length).toBe(2);
  expect(endState["noteId2"].every(t => t.id !== "2")).toBeTruthy();
  expect(endState["noteId2"][0].id).toBe("1");
  expect(endState["noteId2"][1].id).toBe("3");

});

test('correct tag should be added to correct array', () => {
  const startState: TagsType = {
    "noteId1": [
      { id: "1", tag: "#shop"},
      { id: "2", tag: "#minsk"},
      { id: "3", tag: "#food"}
    ],
    "noteId2": [
      { id: "1", tag: "#good"},
      { id: "2", tag: "like"},
      { id: "3", tag: "live"}
    ]
  };

  const newTags = [{id: "4", tag: "#newTag"}]
  const action = addTagsAC(newTags, "noteId2");
  const endState = tagsReducer(startState, action)

  expect(endState["noteId1"].length).toBe(3);
  expect(endState["noteId2"].length).toBe(4);
  expect(endState["noteId2"][0].id).toBeDefined();
  expect(endState["noteId2"][3].tag).toBe("#newTag");
})




