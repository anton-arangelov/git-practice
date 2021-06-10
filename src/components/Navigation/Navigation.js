import React from 'react';
import classes from "./Navigation.module.css";

const navigation = (props) => {
    let options = []
    for (var i=0; i <= localStorage.length - 1; i++)  {
        options.push(localStorage.key(i))
     }
     options.sort()
  return (
    <div className = {classes.Navigation}>
      <select options = {options} className = {classes.Select} onChange = {props.changedAuthor}>
          <option className = {classes.Option}>select an author</option>
          {options.map(el => {
              return <option key = {el} className = {classes.Option}>{el}</option>
          })}
      </select>
      <div className = {classes.TopRight}>
        <label>Author : </label>
        <input value = {props.localStorageValue} onChange = {props.localStorageType}></input>
        <button onClick = {props.clickedSaveToLocalStorage}>Save</button>
      </div>
    </div>
  );
};

export default navigation;
