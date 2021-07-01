import React, {useState} from "react";
import { Button} from "@material-ui/core"
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { deleteWordFB, updateWordFB } from "./redux/modules/dictionary"

const WordData = (props) => {
    const word_list = useSelector(state => state.word.list)
    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const onReset = () => {
        setText('');
    }

    let word_index = parseInt(props.match.params.index);
    let specific_word = word_list[word_index];

    const addExample = ()=> {
        const inputs = [word_index, text]
        onReset();
        dispatch(updateWordFB(inputs));
        props.history.goBack();
    }

    const dispatch = useDispatch();
    return(
        <div>
        <WordContainer>
            <Header>
            <HeaderTitle onClick={() => {
                props.history.goBack();
            }}>Dictionary</HeaderTitle>
            <Deletebtn onClick={()=> {
                alert(`${specific_word.word}를 삭제하시겠습니까?`);
                dispatch(deleteWordFB(word_index))
                props.history.goBack();
            }}><img src="https://image.flaticon.com/icons/png/512/1345/1345925.png"/></Deletebtn></Header>
            <HeaderBoader/>
            {/* <Deletebtn onClick={()=> {
                alert(`${specific_word.word}를 삭제하시겠습니까?`);
                dispatch(deleteWordFB(word_index))
                props.history.goBack();
            }}><img src="https://image.flaticon.com/icons/png/512/1345/1345925.png"/></Deletebtn> */}
            <p>단어</p>
            <span>{specific_word.word}</span>
            <p>뜻</p>
            <span>{specific_word.explain}</span>
            <p>예시</p>
            <span style={{fontWeight: "400"}}>{specific_word.example+" "}</span>
            <ExampleInput placeholder="example" type="text"
                    onChange={onChange} value={text}/>
            <ExampleBtn onClick={addExample}>예시 추가</ExampleBtn>
            <BackButton onClick={() => {
                props.history.goBack();
            }}>이전 페이지로</BackButton>
        </WordContainer>
        </div>
    );
};

const HeaderTitle = styled.h1`
    font-size: 30px;
    font-weight: 300;
    color: #289AFF;
    display: inline;
    cursor: pointer;
`;
const Header = styled.div`
    padding: 10px;
    height: 40px;
`;
const HeaderBoader = styled.div`
    height: 2px;
    background-color: #e9ecef;
`;

const WordContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.04);
    margin: 0 auto;
    margin-top 20px;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    text-align: left;
    padding-bottom: 10px;
    & > span{
        padding: 10px;
        font-size: 15px;
        font-weight: 400;
    }
    & > p {
        text-decoration: underline;
        margin-left: 10px;
        color: #289AFF;
    }
`;
const Deletebtn = styled.button`
    width: 40px;
    display: inline-block;
    position: relative;
    float: right;
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    & > img{
        width: 40px;
    }
`;
const ExampleBtn = styled.button`
    width: 300px;
    margin: 0 auto;
    right: 30px;
    background-color: #289AFF;
    border-color: transparent;
    box-shadow: 0px 0px 3px 0px;
    cursor: pointer;
`;
const ExampleInput = styled.textarea`
    width: 300px;
    margin: 0 auto;
    height: 50px;
`;
const BackButton = styled.button`
    width: 300px;
    margin: 10px auto;
    background-color: #289AFF;
    border-color: transparent;
    box-shadow: 0px 0px 3px 0px;
    cursor: pointer;
`;


export default WordData;