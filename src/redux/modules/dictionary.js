import { firestore } from "../../firebase";
// const LOAD   = 'my-app/widgets/LOAD';
// const CREATE = 'my-app/widgets/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";

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

// export function updateWord(widget) {
//   return { type: UPDATE, widget };
// }

// export function removeWord(widget) {
//   return { type: REMOVE, widget };
// }

export const loadWordFB = () => {

  return function (dispatch) {

    word_db.get().then((docs) => {
      let word_data = [];
      docs.forEach((doc) => {
        if(doc.exists){
          word_data = [...word_data, doc.data()];
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
      default:
          return state;
  }
}