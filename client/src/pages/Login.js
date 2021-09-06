import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(loginUserCB, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      authContext.login(result.data.login);
      props.history.push("/");
    },
    onError(error) {
      console.log({ error });
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCB() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
