import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Icon, Image, Label, Popup } from "semantic-ui-react";
import InfoPopup from "./InfoPopup";
import { LIKE_POST_MUTATAION } from "../utils/graphql";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATAION, {
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
    <Button as="div" labelPosition="right" disabled={loading}>
      <InfoPopup content={liked ? "Unlike" : "Like"}>{likeButton}</InfoPopup>
      <Popup
        trigger={
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        }
        on="click"
        disabled={likes.length === 0}
      >
        {likes.slice(0, 3).map((like) => (
          <InfoPopup content={like.username} key={like.id}>
            <Image
              src={`https://avatars.dicebear.com/api/gridy/${like.username}.svg`}
              avatar
              bordered
            />
          </InfoPopup>
        ))}
        {likes.length > 3 && <Label circular>{`+${likes.length - 3}`}</Label>}
      </Popup>
    </Button>
  );
};

export default LikeButton;
