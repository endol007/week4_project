import React from "react";
// import styled from "styled-components";
import {createGlobalStyle} from "styled-components"
import { Route, Switch, Link } from "react-router-dom";
import { withRouter } from "react-router";
import { loadWordFB, addWordFB, deleteWordFB} from "./redux/modules/dictionary"
import { connect } from "react-redux";
import { firestore } from "./firebase";

import WordData from "./WordData";
import Dictionary from './Dictionary';
import AddWord from "./AddWord";
import NotFound from "./NotFound";
// import { render } from "react-dom";

const mapStateTopProps = (state) => ({
  word_list: state.word.list,
});
const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(loadWordFB());
  },
  create: (new_word) => {
    dispatch(addWordFB(new_word));
  },
  delete: (word) => {
    dispatch(deleteWordFB(word));
  }

})
const word = firestore.collection("word");

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };

  }

  componentDidMount(){
    this.props.load();
  };
  componentWillUnmount() {

  }

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
          <Route path="/worddata/:index" component={WordData}/>
          <Route path="/addword" component={AddWord} />
          <Route componet={NotFound}/>
        </Switch>
      </div>
    );
  }
};
const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;
export default connect(mapStateTopProps, mapDispatchToProps)(withRouter(App));