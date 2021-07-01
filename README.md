# 첫 리액트 프로젝트(4주차 개인과제) - 나만의 단어장
## 첫 리액트 프로젝트
항해99 4주차 개인 과제로 나만의 단어장을 리액트를 이용해 만들었다.
https://github.com/endol007/week4_project

#### 흐름도
![](https://images.velog.io/images/endol007/post/65b437bf-0e40-40d5-a973-ab8683c00e2f/7DA9560D-A9E3-4AF4-B8B2-031D2D1CB835.jpeg)
전체적인 동작 구성이다.

App.js에서 각 컴포넌트끼리 라우팅을 해줬고 첫 메인화면에는 Dictionary.js 컴포넌트가 화면에 나오며 현재 저장되 있는 데이터(단어, 단어의 뜻, 단어의 예시)값을 카드로 각각 띄워서 화면에 띄운다. Dictionary 컴포넌트에서 데이터들을 불러오는 코드이다 
```
const word_list = useSelector(state => state.word.list);
//생략
{word_list.map((list, index) => {
                return(
                    <WordCard 
                    key={index}
                    onClick={() => {
                            props.history.push("/worddata/"+index)
                    }}
                    >
                    <p>단어</p>
                    <span>{list.word}</span>
                    <p>설명</p>
                    <span>{list.explain}</span>
                    <p>예시</p>
                    <span style={{color: "#289AFF"}}>{list.example+" "}</span>
                    
                    </WordCard>
                )
            })}
```
word_list에 단어들을 받아서 map함수를 이용해 각 단어별로 카드를 만들어서 띄우는 형태이다.

AddWord.js는 단어를 추가하는 컴포넌트이다. 단어, 설명, 예시 3개의 데이터를 추가해야 하므로 input을 3개 추가했다. 
```
const [inputs, setInputs] = useState({
        word: "",
        explain: "",
        example: ""
    });
    const { word, explain, example} = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        });
    };
    const onReset = () => {
        setInputs({
            word: "",
            expalin: "",
            example: ""
        });
    };
```
inputs값에 3개의 값을 넣고 이 inputs값을 
```
onClick={() =>{
                    onReset();
                    dispatch(addWordFB(inputs));
                    alert(`${word}단어를 추가합니다`)
                    props.history.goBack();
                }}
```
버튼을 클릭하면 dispatch를 이용해 값을 넘겨준다.
그리고 나서 리덕스 모듈로 넘어가면
```
const CREATE = "word/CREATE";

export function updateWord(word) {
  return { type: UPDATE, word };
}

export const addWordFB = (word) => {
  return function (dispatch) {
    let word_data = word;
    word_db.add(word_data).then((res) => {
    })
    dispatch(createWord(word_data));
  }
}

case "word/CREATE":{
          const new_word_list = [...state.list, action.word];
          return { list: new_word_list }
      }
```
모듈로 넘어가서 db에 저장을하고 action.word를 통해 new_word_list에 단어를 추가한 새 값이 담겨서 다시 Dictionary.js(메인화면)에 데이터가 뿌려지게 된다.
WordData.js도 AddWord.js와 거의 비슷한 맥락으로 데이터를 업데이트하고 받아오는 형태로 되어있다.

### 정리
- 리덕스 모듈의 동작은 action, dispatch, reducer로 이루어짐
- 상태를 불러올때 useSelector를 이용해 각 컴포넌트마다 데이터를 받아 올수 있고 dispatch를 이용해 상태를 스토어에 전달 가능

전체적인 흐름으로 따지자면 UI에서 버튼이벤트를 발생시키면dispatch 에서 스토어로 넘어가기 전에 action/thunk형태로 api에 요청을 하고 받은 응답으로 action을 디스패치를 통해 스토어로 전달하고 이 액션을 리듀서를 통해 실행시킨다. 그리고 새로 반영된 state값을 다시 UI에 넘겨주는 방식이다.

