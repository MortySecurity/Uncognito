import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
    state => ({
      todos: state.todos
    }),
    dispatch => ({
      actions: bindActionCreators(TodoActions, dispatch)
    })
)
export default class App extends Component {

  /*
    constructor(props) {
      super(props);
      this.state = {
        output: ' ',
      };
    }
    */

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  /*
  callback = () => {
    console.log('Test');
    chrome.history.search({ text: '',
      maxResults: 1000000,
      startTime: 0 }, (data) => {
      console.log(data);
      data.forEach((page) => {
        console.log(page.url);
      });
    });
  };

   urlCallBack = () => {
    console.log('Working...');
    chrome.tabs.getCurrent((tab) => {
      console.log(tab.url());
    }
    );
  }


*/


  /* the website would have to be rendered once for componentDidMount func to run */

  componentDidMount() {
    this.runUpd();
    this.runAct();
  }


  runUpd = () => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      console.log(changeInfo.url, tab.title);
    });
  };

  runAct = () => {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      // how to fetch tab url using activeInfo.tabid
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        console.log(tab.url);
      });
    });
  };

/* Old URL call used. This function called only one website at a time. */
  /*
  urlQCall = () => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      document.open();
      console.log(tabs[0].url);
    });
  };
*/


  render() {
    const { todos, actions } = this.props;

    return (
      <div className={style.normal} />
    );
  }
}
