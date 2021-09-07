import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";

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
    onError(error) {
      console.log(error);
    },
  });

  function createPostCB() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Input
          placeholder="Hi world"
          name="body"
          value={values.body}
          onChange={onChange}
          error={error ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
      {error && (
        <div className="ui error message create-post-error">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};


export default PostForm;
