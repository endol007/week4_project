import React, {useState, useRef } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core"

import { useDispatch, useSelector } from "react-redux";
import { createWord, addWordFB} from "./redux/modules/dictionary"

const AddWord = (props) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        word: "",
        explain: "",
        example: ""
    });
    const wordInput = useRef();
    // const explainInput = useRef();
    // const exampleInput = useRef();
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
        wordInput.current.focus();
        // explainInput.current.focus();
        // exampleInput.current.focus();
    };
    // console.log(explainInput.current.value);
    // console.log(exampleInput.current.value);
    return(
        <AddContainer>
            <AddWordTitle>단어 추가하기</AddWordTitle>
            <InputContainer>
                <span>단어</span><br/>
                <input type="text" name="word" value={word} onChange={onChange} ref={wordInput}></input>                
            </InputContainer>
            <InputContainer>
                <span>설명</span><br/>
                <input type="text" name="explain" onChange={onChange} value={explain}></input>                
            </InputContainer>
            <InputContainer>
                <span>예시</span><br/>
                <input 
                type="text" name="example" onChange={onChange} value={example}></input>                
            </InputContainer>
            <Button
                variant="contained"
                color="default"
                onClick={() =>{
                    onReset();
                    dispatch(addWordFB(inputs));
                    props.history.goBack();
                }}
            >추가하기</Button>

        </AddContainer>
    );
};

const AddContainer = styled.div`
    max-width: 350px;
    height: 100vh;

    position: relative;
    border: 1px solid #eee;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display:flex;
    flex-direction: column;
    & > Button{
        width: 310px;
        margin: 20px auto;
    }
`;
const AddWordTitle = styled.h1`
    margin: 10px;
    color: black;
    font-size: 30px;
    font-weight: 200;
`;
const InputContainer = styled.div`
    width: 310px;
    position: relative;
    background-color: white;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
    & > input{
        width: 300px;
    }
`;

export default AddWord;