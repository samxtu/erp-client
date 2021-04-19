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
  useAddAssetMutation,
  useEditAssetMutation,
  useGetBranchesQuery,
} from "../generated/graphql";
import * as Yup from "yup";
import { InputField } from "./InputField";

interface Props {
  open: boolean;
  nofeedback: () => void;
  header: string;
  feedback: () => void;
  id: number;
  assetToEdit?: {
    name: string;
    code: string;
    branchId: string;
    condition: string;
    details: string;
  };
}

function AddEditSingleItem({
  open,
  nofeedback,
  header,
  feedback,
  id,
  assetToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addAsset] = useAddAssetMutation();
  const [, editAsset] = useEditAssetMutation();
  const [error, seterror] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    code: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    branchId: Yup.string().min(1, "Required").required("Required"),
    condition: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    details: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(100, "Must be 100 characters or less!")
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
                name: assetToEdit?.name,
                code: assetToEdit?.code,
                branchId: assetToEdit?.branchId,
                condition: assetToEdit?.condition,
                details: assetToEdit?.details,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                  branchId: values.branchId ? values.branchId.toString() : "",
                };
                if (id === 1000000) {
                  const { error } = await addAsset({
                    args: {
                      name: vals.name!,
                      code: vals.code!,
                      condition: vals.condition!,
                      branchId: parseInt(vals.branchId),
                      details: vals.details!,
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
                  const { error } = await editAsset({
                    args: {
                      name: vals.name!,
                      code: vals.code!,
                      condition: vals.condition!,
                      branchId: parseInt(vals.branchId),
                      details: vals.details!,
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
                  <Segment stacked>
                    <InputField
                      fluid
                      name="name"
                      touched={props.touched.name}
                      label="Asset name"
                      placeholder="Asset name"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="code"
                      touched={props.touched.code}
                      label="Asset code"
                      placeholder="Asset code"
                      type="text"
                    />
                    <InputField
                      fluid
                      key="branchSelect"
                      name="branchId"
                      touched={props.touched.branchId}
                      label="Branch"
                      placeholder="Branch"
                      select
                      options={
                        fetching
                          ? [
                              {
                                key: "reg",
                                text: "wait for branches",
                                value: "",
                              },
                            ]
                          : data?.getBranches
                          ? data.getBranches.map((r) => {
                              return {
                                key: r.id + r.name,
                                text: r.name,
                                value: r.id,
                              };
                            })
                          : [
                              {
                                key: "reg",
                                text: "add branches to system",
                                value: "",
                              },
                            ]
                      }
                    />
                    <InputField
                      fluid
                      key="conditionSelect"
                      name="condition"
                      touched={props.touched.condition}
                      label="Condition"
                      placeholder="Condition"
                      select
                      options={[
                        {
                          key: "working",
                          text: "Working",
                          value: "working",
                        },
                        {
                          key: "notworking",
                          text: "Not working",
                          value: "not working",
                        },
                      ]}
                    />
                    <InputField
                      fluid
                      name="details"
                      touched={props.touched.details}
                      label="Asset details/description"
                      placeholder="Asset details/description"
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
                    id="assetReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("assetReset")?.click();
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

export default AddEditSingleItem;
