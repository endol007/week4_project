import React from "react";
import { Button, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { deleteWordFB } from "./redux/modules/dictionary"

const WordData = (props) => {
    const word_list = useSelector(state => state.word.list)

    let word_index = parseInt(props.match.params.index);
    let specific_word = word_list[word_index];

    const dispatch = useDispatch();
    return(
        <WordContainer>
            <Deletebtn onClick={()=> {
                alert(`${specific_word.word}를 삭제하시겠습니까?`);
                dispatch(deleteWordFB(word_index))
                props.history.goBack();
            }}><img src="https://image.flaticon.com/icons/png/512/1345/1345925.png"/></Deletebtn>
            <p>단어</p>
            <span>{specific_word.word}</span>
            <p>뜻</p>
            <span>{specific_word.explain}</span>
            <p>예시</p>
            <span>{specific_word.example}</span>
            <span>예시 추가</span>
            <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                variant="outlined"
            />
            <Button onClick={() => {
                props.history.goBack();
            }}>이전 페이지로</Button>
        </WordContainer>
    );
};
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
    }
    & > p {
        text-decoration: underline;
        margin-left: 10px;
        color: #289AFF;
    }
`;
const Deletebtn = styled.button`
    width: 40px;
    display: flex;
    position: absolute;
    right: 30px;
    background-color: transparent;
    border-color: transparent;
    & > img{
        width: 40px;
    }
`;


export default WordData