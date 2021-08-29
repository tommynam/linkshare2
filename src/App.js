import logo from './logo.svg';
import './App.css';
import Posts from "./components/Posts"
import { createStore } from "redux";
import { Provider, connect } from "react-redux";


//INITIALIZE INITIAL STATE
const initialState = {
  linksReducer: []
};

//CREATE PURELINK LIST VARIABLE 
const PureLinkList = (props) => {
  return (
    <div>
      <button onClick={props.addLinkMDP}>New Link</button> 
      <button onClick={props.clearLinkMDP}>Clear</button> 
      {props.linksMSP.map(l => (
        <div>{l.title} - {l.url}</div>
      ))}
    </div>
  );
}

//ROOT REDUCER
const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_LINK_ACTION: {
      return linksReducer.state.linksReducer.concat([action.link])
      }
    case CLEAR_LINK_ACTION: {
      return {
        linksReducer: []
      }
      }
    default: {
      return state;
      }
  }
 };

//INSTANTIATE STORE VARIABLE - USE CREATESTORE
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

//MAP STATE TO PROPS - CONNECT LINKLIST TO REDUX STORE
const mapStateToProps = (state) => {
  return {
    linksMSP: state.linksRootReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLinkMDP: () => dispatch({
      type: ADD_LINK_ACTION,
      link: {
        title: 'Xccelerate',    
        url: 'https://www.xccelerate.co'
      }
    }),
    clearLinkMDP: () => dispatch({
      type: CLEAR_LINK_ACTION
    })
  }
}


const LinkList = connect(mapStateToProps, mapDispatchToProps)(PureLinkList)



//APP
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Posts />
        </header>
      </div>
    </Provider>
  );
}

export default App;
