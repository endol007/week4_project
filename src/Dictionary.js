import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


const Dictionary = (props) => {
    const word_list = useSelector(state => state.word.list);
    return (
        <DictionaryContainer>
            <DictionaryTitle>My Dictionary</DictionaryTitle>
            <DcitionaryBorder/>
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

        <Imgbutton><img src="https://image.flaticon.com/icons/png/512/1828/1828817.png" alt="my image" 
          onClick={()=>{
            props.history.push("/AddWord")
          }} /></Imgbutton>
        <Topbutton onClick={() => {
            window.scrollTo({top: 0, behavior: "smooth"})
        }}><img src="https://image.flaticon.com/icons/png/512/892/892692.png"/></Topbutton>
        </DictionaryContainer>
    );
}

const DictionaryContainer = styled.div`
    max-width: 350px;

    position: relative;
    border: 2px solid #e9ecef;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.04);
    padding-bottom: 20px;

    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display:flex;
    flex-direction: column;
`;
const WordCard = styled.div`
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
    cursor: pointer;
    & > p{
        margin-left: 10px;
        font-size: 10px;
        text-decoration: underline;
    }
    overflow: hidden;
    & > span{
        margin-left: 10px;
        font-size: 15px;
    }
    & > button {
        position: absolute;
        display: flex;
        background-color: transparent;
        border-color: transparent;
        right: 10px;
    }
    & > button > img{
        width:25px;
    }
`;
const DictionaryTitle = styled.div`
    font-size: 30px;
    font-weight: 300;
    margin: 10px;
    color: #289AFF;
    cursor: pointer;
`;
const DcitionaryBorder = styled.div`
    height: 2px;
    background-color: #e9ecef;
`;
const Imgbutton = styled.button`
  dispaly: flex;
  position: absolute;
  right: 0;
  top: 5px;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  & > img{
    width: 40px;
  }
`;
const Topbutton = styled.button`
  width: 40px;
  display: flex;
  margin: 0 auto;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  & > img{
      width: 40px;
  }
`;

export default Dictionary;
