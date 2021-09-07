import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
} from "../utils/graphql";
import InfoPopup from "./InfoPopup";

const DeleteButton = ({ postId, commentId, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment, { loading }] = useMutation(mutation, {
    variables: { postId, commentId },
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const posts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: posts },
        });
      }

      setConfirmOpen(false);
      if (onDelete) onDelete();
    },
    onError(error) {
      setConfirmOpen(false);
    },
  });

  return (
    <>
      <InfoPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          icon="trash"
          color="red"
          basic
          floated="right"
          onClick={() => setConfirmOpen(true)}
          disabled={loading}
        />
      </InfoPopup>
      <Confirm
        header={`Are your sure! you want delete ${
          commentId ? "comment" : "post"
        }.`}
        size="tiny"
        content={null}
        open={confirmOpen}
        confirmButton="Delete"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
