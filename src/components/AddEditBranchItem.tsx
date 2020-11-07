import { Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Modal,
  InputOnChangeData,
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
  Form,
} from "semantic-ui-react";
import { BranchInput, Scalars, useGetRegionsQuery } from "../generated/graphql";
import * as Yup from "yup";
import { InputField } from "./InputField";

interface Props {
  open: boolean;
  nofeedback: () => void;
  oldText: string;
  header: string;
  feedback: (newtext: BranchInput, id: number) => void;
  id: number;
}

function AddEditSingleItem({
  open,
  nofeedback,
  oldText,
  header,
  feedback,
  id,
}: Props): ReactElement {
  const [newText, setnewText] = useState({});
  const [{ data, fetching }] = useGetRegionsQuery();
  function submitNewText(e: {
    name: Scalars["String"];
    phone: Scalars["String"];
    regionId: Scalars["Float"];
    street: Scalars["String"];
  }) {
    // feedback(e, id);
  }
  function setNewValue(
    e: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) {
    setnewText(data.value);
  }
  //   useEffect(() => {
  //     console.log("open add or edit branch", open);
  //   }, [data, fetching, open]);
  return (
    <>
      <Modal
        dimmer="blurring"
        centered={false}
        open={open}
        onClose={nofeedback}
      >
        <Modal.Header>{header}:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                region: "",
                street: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                console.log("values", values);
                // const user = await login({ params: values });
                // if (user.data?.login.error) {
                //   let newSchema = Yup.object().cast({
                //     [user.data.login.error.target]:
                //       user.data.login.error.message,
                //   });
                //   if (newSchema) setErrors(newSchema);
                // } else if (user.data?.login.user) {
                //   // worked
                // }
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(3, "Must be 3 or more characters!")
                  .max(20, "Must be 20 characters or less!")
                  .required("Required"),
                phone: Yup.string()
                  .min(9, "Phone number format (123456789)!")
                  .max(9, "Phone number format (123456789)!")
                  .required("Required"),
                region: Yup.string()
                  .min(3, "Must be 3 or more characters!")
                  .max(20, "Must be 20 characters or less!")
                  .required("Required"),
                street: Yup.string()
                  .min(3, "Must be 3 or more characters!")
                  .max(20, "Must be 20 characters or less!")
                  .required("Required"),
              })}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {(props) => (
                <Form size="large" onSubmit={props.submitForm}>
                  <Segment stacked>
                    <InputField
                      fluid
                      name="name"
                      touched={props.touched.name}
                      label="Branch name"
                      placeholder="Branch name"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="phone"
                      touched={props.touched.phone}
                      label="Phone number"
                      placeholder="123456789"
                      type="tel"
                      pattern="[1-9]{1}[0-9]{8}"
                    />
                    <InputField
                      fluid
                      name="region"
                      touched={props.touched.region}
                      label="Region"
                      placeholder="Region"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="street"
                      touched={props.touched.street}
                      label="Street name"
                      placeholder="Street name"
                      type="text"
                    />
                  </Segment>
                  <Button
                    loading={props.isSubmitting}
                    color="teal"
                    size="large"
                    type="submit"
                    content="Save"
                    fluid
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={nofeedback} secondary>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddEditSingleItem;
