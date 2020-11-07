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

const Reset_password: React.FunctionComponent<IAppProps> = () => {
  const [, login] = useLoginMutation();

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon name="user circle" />
          Reset your account password:
        </Header>
        <Formik
          initialValues={{ password: "", password2: "" }}
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
            password: Yup.string()
              .min(3, "Must be 3 or more characters!")
              .max(20, "Must be 20 characters or less!")
              .required("Required"),
            password2: Yup.string()
              .min(3, "Must be 3 or more characters!")
              .max(20, "Must be 20 characters or less!")
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords must match"),
          })}
          validateOnChange={false}
        >
          {(props) => (
            <Form size="large" onSubmit={props.submitForm}>
              <Segment stacked>
                <InputField
                  fluid
                  name="password"
                  label="New password"
                  touched={props.touched.password}
                  placeholder="Enter password"
                  type="password"
                />
                <InputField
                  fluid
                  name="password2"
                  label="Same new password"
                  touched={props.touched.password2}
                  placeholder="Repeat password"
                  type="password"
                />
              </Segment>
              <Button
                loading={props.isSubmitting}
                color="teal"
                fluid
                size="large"
                type="submit"
              >
                Reset
              </Button>
            </Form>
          )}
        </Formik>
        <Message>
          Trouble with reset token? <Link to="/forgot-password">Resend</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Reset_password;
