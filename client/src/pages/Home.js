import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import PostCardPlaceholder from "../components/PostCardPlaceholder";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} stackable>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {authContext.user && (
          <Grid.Column mobile={16} tablet={8} computer={5} style={{ marginBottom: 20 }}>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <PostCardPlaceholder />
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column
              key={post.id}
              mobile={16}
              tablet={8}
              computer={5}
              style={{ marginBottom: 20 }}
            >
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
