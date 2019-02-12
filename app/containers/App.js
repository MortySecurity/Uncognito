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

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  /* the website would have to be rendered once for componentDidMount func to run */

  componentDidMount() {
    this.runUserDataOnUpdate();
    this.runUserDataOnActivated();
  }


  runUserDataOnUpdate = () => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      this.addValue(changeInfo.url, true);
      this.addValue(changeInfo.title);
    });
  };

  addValue = (value, addNewline = false) => {
    if (value) {
      document.write(value);
      console.log(value);
      if (addNewline) {
        document.writeln('');
        console.log();
      }
    }
  };

  runUserDataOnActivated = () => {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      // how to fetch tab url using activeInfo.tabid
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        document.write(tab.title);
        console.log(tab.url);

      });
    });
  };

  render() {
    const { todos, actions } = this.props;

    return (
      <div className={style.normal} />
    );
  }
}
