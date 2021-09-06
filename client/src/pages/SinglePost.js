import { gql, useQuery } from "@apollo/client";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  function onDelete() {
    props.history.push("/");
  }

  let postMarkUp;
  if (loading) {
    postMarkUp = <p> Loading post... </p>;
  } else {
    const { username, createdAt, body, id, likeCount, likes, commentCount } =
      data.getPost;

    postMarkUp = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton post={{ id, likeCount, likes }} user={user} />
                <Button labelPosition="right" as="div" onClick={() => {}}>
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} onDelete={onDelete} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkUp;
};

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
