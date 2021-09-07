import { gql, useMutation, useQuery } from "@apollo/client";
import { Card, Form, Grid, Image, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import SinglePostPlaceholder from "../components/SinglePostPlaceholder";
import InfoPopup from "../components/InfoPopup";
import CommentButton from "../components/CommentButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment },
  });

  function onDelete() {
    props.history.push("/");
  }

  let postMarkUp;
  if (loading) {
    postMarkUp = <SinglePostPlaceholder />;
  } else {
    const { username, createdAt, body, id } = data.getPost;
    const { likeCount, likes, commentCount, comment: comments } = data.getPost;

    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src={`https://avatars.dicebear.com/api/gridy/${username}.svg`}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content>
                <LikeButton post={{ id, likeCount, likes }} user={user} />
                <CommentButton
                  count={commentCount}
                  inputRef={commentInputRef}
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} onDelete={onDelete} />
                )}
              </Card.Content>
              {likes.length !== 0 && (
                <Card.Content>
                  {likes.slice(0, 15).map((like) => (
                    <InfoPopup content={like.username} key={like.id}>
                      <Image
                        src={`https://avatars.dicebear.com/api/gridy/${like.username}.svg`}
                        avatar
                        bordered
                      />
                    </InfoPopup>
                  ))}
                  {likes.length > 15 && (
                    <Label circular>{`+${likes.length - 15}`}</Label>
                  )}
                </Card.Content>
              )}
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <Form>
                    <p>Post a comment</p>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        className="ui button teal"
                        type="submit0"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkUp;
};

const CREATE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comment {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      comment {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      commentCount
      likeCount
    }
  }
`;

export default SinglePost;
