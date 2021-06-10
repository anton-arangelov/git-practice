import React from 'react';
import classes from './Post.module.css'

const post = (props) =>{
return(
    <div className = {classes.Post}>{props.children}
        <h1>{`Title - ${props.title}`}</h1>
        <p>{`Text - ${props.body}`}</p>
        <div className = {classes.Buttons}>
            <button onClick={props.clickedEdit}>Edit</button>
            <button onClick = {props.clickedDelete}>Delete</button>
        </div>
    </div>
)
};

export default post;