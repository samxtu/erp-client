import { Formik } from "formik";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Segment,
  Form,
  Portal,
  Message,
} from "semantic-ui-react";
import {
  useAddBranchMutation,
  useEditBranchMutation,
  useGetRegionsQuery,
} from "../generated/graphql";
import * as Yup from "yup";
import { InputField } from "./InputField";

interface Props {
  open: boolean;
  nofeedback: () => void;
  header: string;
  feedback: () => void;
  id: number;
  branchToEdit?: {
    name: string;
    phone: string;
    regionId: string;
    street: string;
  };
}

function AddEditBranchItem({
  open,
  nofeedback,
  header,
  feedback,
  id,
  branchToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetRegionsQuery();
  const [, addBranch] = useAddBranchMutation();
  const [, editBranch] = useEditBranchMutation();
  const [error, seterror] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    phone: Yup.string()
      .min(9, "Phone number format (123456789)!")
      .max(9, "Phone number format (123456789)!")
      .required("Required"),
    regionId: Yup.string().min(1, "Required").required("Required"),
    street: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
  });
  useEffect(() => {
    console.log("open add or edit branch", open);
    if (open) {
      seterror("");
    }
  }, [data, fetching, open]);
  return (
    <Portal onClose={nofeedback} open={open}>
      <Modal
        dimmer="blurring"
        centered={false}
        open={open}
        onClose={nofeedback}
      >
        <Modal.Header>{header}:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {error ? (
              <Message negative>
                <Message.Header>{error}</Message.Header>
              </Message>
            ) : null}
            <Formik
              initialValues={{
                name: branchToEdit?.name,
                phone: branchToEdit?.phone,
                regionId: branchToEdit?.regionId,
                street: branchToEdit?.street,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                  regionId: values.regionId ? values.regionId.toString() : "",
                };
                if (id === 1000000) {
                  const { error } = await addBranch({
                    args: {
                      name: vals.name!,
                      phone: vals.phone!,
                      street: vals.street!,
                      regionId: parseInt(vals.regionId),
                    },
                  });
                  if (error) {
                    console.log("error submitting", error);
                    seterror(error.message);
                  } else if (!error) {
                    // worked
                    feedback();
                  }
                } else if (id !== 1000000) {
                  const { error } = await editBranch({
                    args: {
                      name: vals.name!,
                      phone: vals.phone!,
                      street: vals.street!,
                      regionId: parseInt(vals.regionId),
                    },
                    id,
                  });
                  if (error) {
                    console.log("error submitting", error);
                    seterror(error.message);
                  } else if (!error) {
                    // worked
                    feedback();
                  }
                }
              }}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={true}
            >
              {(props) => (
                <Form
                  size="large"
                  onSubmit={props.submitForm}
                  onReset={props.resetForm}
                >
                  <Segment>
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
                      normal
                      prefix="+255"
                      type="tel"
                      pattern="[1-9]{1}[0-9]{8}"
                    />
                    <InputField
                      fluid
                      name="regionId"
                      touched={props.touched.regionId}
                      label="Region"
                      placeholder="Region"
                      value={branchToEdit?.regionId}
                      select
                      options={
                        fetching
                          ? [
                              {
                                key: "reg",
                                text: "wait for regions",
                                value: "",
                              },
                            ]
                          : data?.getRegions
                          ? data.getRegions.map((r) => {
                              return {
                                key: r.id + r.name,
                                text: r.name,
                                value: r.id,
                              };
                            })
                          : [
                              {
                                key: "reg",
                                text: "add regions to system",
                                value: "",
                              },
                            ]
                      }
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
                  <Button
                    style={{ display: "none" }}
                    type="reset"
                    id="branchReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("branchReset")?.click();
            }}
            style={{ float: "left" }}
          >
            Reset
          </Button>
          <Button onClick={nofeedback} secondary>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Portal>
  );
}

export default AddEditBranchItem;
