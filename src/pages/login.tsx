import React from "react";
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Form,
} from "semantic-ui-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { Link } from "react-router-dom";

interface IAppProps {
  next: string;
}

const Login: React.FunctionComponent<IAppProps> = ({ next }) => {
  const [, login] = useLoginMutation();

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user circle" />
          Log-in to your account
        </Header>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log("values", values);
            const user = await login({ params: values });
            if (user.data?.login.error) {
              let newSchema = Yup.object().cast({
                [user.data.login.error.target]: user.data.login.error.message,
              });
              if (newSchema) setErrors(newSchema);
            } else if (user.data?.login.user) {
              // worked
            }
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Enter a valid email address!")
              .required("Required"),
            password: Yup.string()
              .min(3, "Must be 3 or more characters!")
              .max(20, "Must be 20 characters or less!")
              .required("Required"),
          })}
          validateOnChange={false}
        >
          {(props) => (
            <Form size="large" onSubmit={props.submitForm}>
              {/* <Form.Group widths="equal"> */}
              <Segment stacked>
                <InputField
                  fluid
                  name="email"
                  touched={props.touched.email}
                  label="Email"
                  placeholder="E-mail address"
                  type="email"
                />
                <InputField
                  fluid
                  name="password"
                  label="password"
                  touched={props.touched.password}
                  placeholder="Password"
                  type="password"
                />
              </Segment>
              {/* </Form.Group> */}

              <Button
                loading={props.isSubmitting}
                color="teal"
                fluid
                size="large"
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Message>
          Forgot password? <Link to="/forgot-password">Recover</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
