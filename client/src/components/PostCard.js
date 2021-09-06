import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { body, createAt, id, username, likeCount, commentCount, likes },
}) => {
  const handleLikePost = () => {
    console.log("handleLikePost");
  };

  const handleCommentPost = () => {
    console.log("handleCommentPost");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button color="teal" basic onClick={handleLikePost}>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="blue" basic onClick={handleCommentPost}>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
