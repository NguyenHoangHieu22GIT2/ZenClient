import React from "react";
import { Comment, CommentType } from "./Comment";

type props = {
  comments: CommentType[];
};
export const Comments = (props: props) => {
  return (
    <>
      {props.comments.map((comment) => (
        <Comment {...comment} key={comment._id} />
      ))}
    </>
  );
};
