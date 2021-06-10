import React from 'react';
import classes from "./EditPost.module.css";

const EditPost = (props) => {
  return (
    <div className={classes.EditPost}>
      <div>
        <section>
          <label>Title</label>
          <textarea value={props.titleValue} onChange = {props.changeTitle}></textarea>
        </section>
        <section>
          <label>Body</label>
          <textarea rows="5" value={props.bodyValue} onChange = {props.changeBody}></textarea>
        </section>
      </div>
      <div className={classes.Buttons}>
        <button onClick = {props.clickedSave}>Save</button>
        <button onClick = {props.clickedCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPost;
