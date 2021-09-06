import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import InfoPopup from "./InfoPopup";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATAION, {
    variables: { postId: id },
  });

  const handleLikePost = () => {
    likePost();
  };

  const likeButton = user ? (
    liked ? (
      <Button color="teal" onClick={handleLikePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic onClick={handleLikePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="teal" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <InfoPopup content={liked ? "Unlike" : "Like"}>
      <Button as="div" labelPosition="right">
        {likeButton}
        <Label as="a" basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </InfoPopup>
  );
};

const LIKE_POST_MUTATAION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
