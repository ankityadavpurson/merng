import { Button, Divider, Grid, Icon } from "semantic-ui-react";
import { Label, Placeholder, Segment } from "semantic-ui-react";

const PostCardPlaceholder = () => {
  return (
    <>
      {Array.from(Array(3).keys()).map((n) => (
        <Grid.Column key={n}>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
            <Divider />
            <Button labelPosition="right" as="div" disabled>
              <Button color="teal" basic>
                <Icon name="like" />
              </Button>
              <Label as="a" basic color="teal" pointing="left">
                0
              </Label>
            </Button>
            <Button labelPosition="right" as="div" disabled>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label as="a" basic color="blue" pointing="left">
                0
              </Label>
            </Button>
          </Segment>
          <br />
        </Grid.Column>
      ))}
    </>
  );
};

export default PostCardPlaceholder;
