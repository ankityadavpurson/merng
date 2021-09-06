import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, onDelete }) => {
  console.log(postId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update(proxy) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const posts = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      setConfirmOpen(false);
      if (onDelete) onDelete();
    },
    onError(error) {
      setConfirmOpen(false);
    },
  });

  return (
    <>
      <Button
        icon="trash"
        color="red"
        basic
        floated="right"
        onClick={() => setConfirmOpen(true)}
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
