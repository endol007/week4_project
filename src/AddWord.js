import React, {useState, useRef } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core"

import { useDispatch} from "react-redux";
import {addWordFB} from "./redux/modules/dictionary"

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
            <DictionaryTitle onClick={() => {
                props.history.goBack();
            }}>Dictionary</DictionaryTitle>
            <AddWordBorder/>
            <InputContainer>
                <TextField
                type="text" name="word" value={word} onChange={onChange} ref={wordInput}
                id="standard-full-width"
                label="단어"
                style={{ margin: 8 }}
                placeholder="단어를 입력하세요!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}></TextField>
                <TextField
                type="text" name="explain" onChange={onChange} value={explain}
                id="standard-full-width"
                label="설명"
                style={{ margin: 8 }}
                placeholder="단어 뜻을 입력하세요!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}></TextField>   
                <TextField
                type="text" name="example" onChange={onChange} value={example}
                id="standard-full-width"
                label="예시"
                style={{ margin: 8 }}
                placeholder="단어 사용 예시를 입력하세요!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}></TextField>           
            </InputContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={() =>{
                    onReset();
                    dispatch(addWordFB(inputs));
                    alert(`${word}단어를 추가합니다`)
                    props.history.goBack();
                }}
            >단어 추가하기</Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                props.history.goBack();
            }}>이전 페이지로</Button>

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
const DictionaryTitle = styled.span`
    font-size: 30px;
    font-weight: 300;
    margin: 10px;
    color: #289AFF;
    display: inline-block;
    cursor: pointer;
`;
const AddWordBorder = styled.div`
    height: 2px;
    background-color: #e9ecef;
`;
const InputContainer = styled.div`
    width: 310px;
    position: relative;
    background-color: white;
    margin: 0 auto;
    margin-top: 15px;
    flex-direction: column;
`;


export default AddWord;