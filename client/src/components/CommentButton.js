import { useContext } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";
import InfoPopup from "./InfoPopup";

const CommentButton = ({ postId, count, inputRef }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  function handleComment() {
    if (user) {
      if (postId) history.push(`/posts/${postId}`);
      else inputRef.current.focus();
    } else {
      history.push("/login");
    }
  }

  return (
    <InfoPopup content={"Comment on post"}>
      <Button labelPosition="right" as="div" onClick={handleComment}>
        <Button color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label as="a" basic color="blue" pointing="left">
          {count}
        </Label>
      </Button>
    </InfoPopup>
  );
};

export default CommentButton;
