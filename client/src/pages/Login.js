import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER_MUTATION } from "../utils/graphql";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const { onChange, onSubmit, values } = useForm(loginUserCB, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
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
    <div className="form-container auth-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={`auth-form ${loading ? "loading" : ""}`.trim()}
      >
        <h1 className="auth-title">Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          autoComplete="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={{
            name: showPassword ? "eye slash" : "eye",
            link: true,
            title: showPassword ? "Hide password" : "Show password",
            onClick: () => setShowPassword(!showPassword),
          }}
          autoComplete="current-password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary className="auth-submit-button">
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message auth-error-message">
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

export default Login;
