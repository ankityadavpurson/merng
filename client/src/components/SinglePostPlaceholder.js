import { Label, Placeholder, Segment } from "semantic-ui-react";
import { Button, Divider, Grid, Icon } from "semantic-ui-react";

const SinglePostPlaceholder = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Placeholder style={{ height: 150, width: 150 }}>
            <Placeholder.Image />
          </Placeholder>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment raised style={{ marginLeft: 20 }}>
            <Placeholder fluid>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
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
            <Button icon="trash" color="red" basic floated="right" disabled />
          </Segment>
          {Array.from(Array(2).keys()).map((n) => (
            <Segment key={n} raised style={{ marginLeft: 20 }}>
              <Placeholder fluid>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Segment>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SinglePostPlaceholder;
