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

interface IAppProps {}

const Forgot_password: React.FunctionComponent<IAppProps> = () => {
  const [, login] = useLoginMutation();

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user circle" />
          Enter email associated with us:
        </Header>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log("values", values);
            // const user = await login({ params: values });
            // if (user.data?.login.error) {
            //   let newSchema = Yup.object().cast({
            //     [user.data.login.error.target]: user.data.login.error.message,
            //   });
            //   if (newSchema) setErrors(newSchema);
            // } else if (user.data?.login.user) {
            //   // worked
            // }
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Enter a valid email address!")
              .required("Required")
          })}
          validateOnChange={false}
        >
          {(props) => (
            <Form size="large" onSubmit={props.submitForm}>
              <Segment stacked>
                <InputField
                  fluid
                  name="email"
                  touched={props.touched.email}
                  label="Email"
                  placeholder="E-mail associated with your account"
                  type="email"
                />
              </Segment>
              <Button
                loading={props.isSubmitting}
                color="teal"
                fluid
                size="large"
                type="submit"
              >
                Recover
              </Button>
            </Form>
          )}
        </Formik>
        <Message>
          You have credentials? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Forgot_password;
