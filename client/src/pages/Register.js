import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { REGISTER_USER_MUTATION } from "../utils/graphql";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(proxy, result) {
      authContext.login(result.data.register);
      props.history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container auth-container">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={`auth-form ${loading ? "loading" : ""}`.trim()}
      >
        <h1 className="auth-title">Register</h1>
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email ? true : false}
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
          autoComplete="new-password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          icon={{
            name: showConfirmPassword ? "eye slash" : "eye",
            link: true,
            title: showConfirmPassword ? "Hide password" : "Show password",
            onClick: () => setShowConfirmPassword(!showConfirmPassword),
          }}
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary className="auth-submit-button">
          Register
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

export default Register;
