import React, { Fragment, useEffect, useState } from "react";
import Post from "../components/Post/Post.js";
import EditPost from "../components/EditPost/EditPost.js";
import Navigation from "../components/Navigation/Navigation.js";
import axios from "axios";
import classes from "./Blog.module.css";

function Blog() {
  let [posts, setPosts] = useState([]);
  let [loadedPost, setLoadedPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [showPosts, setShowPosts] = useState(true);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchPostsHandler();
  }, []);

  const fetchPostsHandler = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    const updatedPosts = await response.data.slice(0, 10);
    setPosts(updatedPosts);
  };

  const editHandler = (post) => {
    setLoadedPost(post);
    setEditedTitle(post.title);
    setEditedBody(post.body);
    setShowPosts(false);
  };

  const deleteHandler = (id) => {
    const updatedPosts = posts.filter((el) => {
      return el.id !== id;
    });
    setPosts(updatedPosts);
  };

  const changeTitleHandler = (e) => {
    setEditedTitle(e.target.value);
  };

  const changeBodyHandler = (e) => {
    setEditedBody(e.target.value);
  };

  const saveHandler = () => {
    posts.forEach((el) => {
      if (el.id === loadedPost.id) {
        if (editedTitle.trim().length === 0 || editedBody.trim().length === 0) {
          alert("There has to be a text for the title and for the body");
          return;
        }
        el.title = editedTitle;
        el.body = editedBody;
        setShowPosts(true);
      }
    });
  };

  const cancelHandler = () => {
    setShowPosts(true);
  };

  const saveToLocalStorageHandler = () => {
    let formattedAuthor = "";
    author.split(" ").map((el) => {
      if (el !== "") {
        formattedAuthor = formattedAuthor.concat(` ${el}`);
      }
      return formattedAuthor;
    });
    formattedAuthor = formattedAuthor.slice(1, formattedAuthor.length).toLocaleLowerCase();
    if (formattedAuthor.length === 0) {
      alert("Please type an author");
      setAuthor("");
      return;
    }
    localStorage.setItem(formattedAuthor, JSON.stringify(posts));
    setAuthor("");
    alert("You saved successfully");
    window.location.reload()
  };

  const localStorageTypeHandler = (e) => {
    setAuthor(e.target.value);
  };

  const changedAuthorHandler = (e) => {
    if (e.target.value === "select an author") {
      return;
    }
    const newPosts = JSON.parse(localStorage.getItem(`${e.target.value}`));
    setPosts(newPosts);
  };

  return (
    <Fragment>
      {showPosts ? (
        <Fragment>
          <Navigation
            changedAuthor={changedAuthorHandler}
            clickedSaveToLocalStorage={saveToLocalStorageHandler}
            localStorageValue={author}
            localStorageType={localStorageTypeHandler}
          ></Navigation>
          <section className={classes.Posts}>
            {posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  title={post.title}
                  body={post.body}
                  clickedEdit={() => editHandler(post)}
                  clickedDelete={() => deleteHandler(post.id)}
                ></Post>
              );
            })}
          </section>
        </Fragment>
      ) : (
        <EditPost
          titleValue={editedTitle}
          bodyValue={editedBody}
          changeTitle={changeTitleHandler}
          changeBody={changeBodyHandler}
          clickedSave={saveHandler}
          clickedCancel={cancelHandler}
        ></EditPost>
      )}
    </Fragment>
  );
}

export default Blog;
