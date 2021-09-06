import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCB, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const posts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      values.body = "";
    },
  });

  function createPostCB() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post</h2>
      <Form.Input
        placeholder="Hi world"
        name="body"
        values={values.body}
        onChange={onChange}
      />
      <Button type="submit" color="teal">
        Submit
      </Button>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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

export default PostForm;
