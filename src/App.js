import React from "react";
import styled from "styled-components";
import {createGlobalStyle} from "styled-components"
import { Route, Switch, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { loadWordFB, createWord, addWordFB} from "./redux/modules/dictionary"
import { connect } from "react-redux";
import { firestore } from "./firebase";

import Dictionary from './Dictionary';
import AddWord from "./AddWord";
import NotFound from "./NotFound";
import { render } from "react-dom";

const mapStateTopProps = (state) => ({
  word_list: state.word.list,
});
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadWordFB());
  },
  create: (new_word) => {
    dispatch(addWordFB(new_word));
  }
})
const word = firestore.collection("word");

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };

  }

  componentDidMount(){
    this.props.load();
  };

  myfunction(){
    console.log("Clicked");
  }


  render(){
    return(
      <div className="App">
        <GlobalStyle />
        <Switch>
          {/* <Dictionary/> */}
          <Route path="/" exact render ={(props) =>(
            <Dictionary list={this.props.word_list}
                        history={this.props.history}>               
            
            </Dictionary>
          )}/>
          {/* <Addword/> */}
          <Route path="/addword" component={AddWord} />
          <Route componet={NotFound}/>
        </Switch>
        {/* <Imgbutton><img src="https://image.flaticon.com/icons/png/512/1828/1828817.png" alt="my image" 
          onClick={()=>{
            this.props.history.push("/AddWord")
          }} /></Imgbutton> */}
      </div>
    );
  }
};
// const Imgbutton = styled.button`
//   dispaly: flex;
//   position: absolute;
//   right: 0;
//   margin-bottom: 40px;
//   background-color: transparent;
//   border-color: transparent;
//   & > img{
//     width: 80px;
//   }
// `;
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));