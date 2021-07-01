import { firestore } from "../../firebase";
// const LOAD   = 'my-app/widgets/LOAD';
// const CREATE = 'my-app/widgets/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";
const DELETE = "word/DELETE";
const UPDATE = "word/update";

const initialState = {
    //   list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
    list: [
      { word: "water", explain: "물", example: "this is water" },
      { word: "coke", explain: "콜라", example: "this is coke"},
      { word: "cake", explain: "케이크", example: "this is cake" },
    ],
  };
const word_db = firestore.collection("word");
// Action Creators
export function loadWord(word) {
  return { type: LOAD, word };
}

export function createWord(word) {
  return { type: CREATE, word };
}

export function updateWord(word) {
  return { type: UPDATE, word };
}

export function deleteWord(word) {
  return { type: DELETE, word };
}

export const loadWordFB = () => {

  return function (dispatch) {

    word_db.get().then((docs) => {
      let word_data = [];
      docs.forEach((doc) => {
        if(doc.exists){
          word_data = [...word_data, {id: doc.id, ...doc.data()}];
        }
      });
      dispatch(loadWord(word_data))
    });
  }
}
export const addWordFB = (word) => {
  return function (dispatch) {
    let word_data = word;
    word_db.add(word_data).then((res) => {
    })
    dispatch(createWord(word_data));
  }
}
export const deleteWordFB = (index) => {
  return function (dispatch, getState) {
    let word_data = getState().word.list[index];
    word_db.doc(word_data.id).delete().then((res) => {
      dispatch(deleteWord(index));
    })

    // word_db.ref(word_data[index]).set(null).then((res) => {})
    // dispatch(deleteWord(index));
  }
}
export const updateWordFB = (index) => {
  console.log(index[0])
  return function (dispatch, getState){
    let _word_data = getState().word.list[index[0]];
    let {example} = _word_data;
    let new_example = [];
    if(typeof(example)== "string" || example.length < 2){
      new_example = [example, index[1]]
    }else{
      new_example = [...example, index[1]];
    }
    let word_data = {..._word_data, example: new_example}
    word_db.doc(_word_data.id).update(word_data).then((res) => {
      dispatch(updateWord(index));
    })
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
      case "word/LOAD":{
          if(action.word.length > 0){
            return {list: action.word};
          }
          return state;
      }
      case "word/CREATE":{
          const new_word_list = [...state.list, action.word];
          return { list: new_word_list }
      }
      case "word/DELETE":{
          const word_list = state.list.filter((l, idx) => {
            if(idx == action.word){
              l = null;
            };
            console.log(l);
            return l
          });
          return {list: word_list};
      }
      case "word/UPDATE":{
        return state
      }
      default:
          return state;
  }
}