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
  useAddAccountMutation,
  useEditAccountMutation,
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
  accountToEdit?: {
    name: string;
    number: string;
    balance: number;
    branchId: number;
  };
}

function AddEditSingleItem({
  open,
  nofeedback,
  header,
  feedback,
  id,
  accountToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addAccount] = useAddAccountMutation();
  const [, editAccount] = useEditAccountMutation();
  const [error, seterror] = useState("");
  const [initialValues, setinitialValues] = useState(accountToEdit);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Must be longer than 3 characters!")
      .max(20, "Must not be longer than 20 characters!")
      .required("Required"),
    branchId: Yup.string().min(1, "Required").required("Required"),
    balance: Yup.number().required("Required"),
  });
  useEffect(() => {
    console.log("open add or edit branch", id);
    setinitialValues(accountToEdit);
    if (open) {
      seterror("");
    }
  }, [data, fetching, open, accountToEdit, id]);
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
              enableReinitialize={true}
              initialValues={initialValues!}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                  balance: values.balance!.toString(),
                  branchId: values.branchId ? values.branchId.toString() : "",
                };
                if (id === 1000000) {
                  const { error } = await addAccount({
                    args: {
                      name: vals.name!,
                      number: vals.number!,
                      balance: parseInt(vals.balance)!,
                      branchId: parseInt(vals.branchId),
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
                  const { error } = await editAccount({
                    args: {
                      name: vals.name!,
                      number: vals.number!,
                      branchId: parseInt(vals.branchId),
                      balance: accountToEdit?.balance!,
                    },
                    id: id,
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
                  id="accountForm"
                >
                  <Segment stacked>
                    <InputField
                      fluid
                      name="name"
                      touched={props.touched.name}
                      label="Account name"
                      placeholder="Account name"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="number"
                      touched={props.touched.number}
                      label="Account number"
                      placeholder="e.g 1009844A9665GGG2"
                      normal
                      type="text"
                    />
                    <InputField
                      fluid
                      name="branchId"
                      touched={props.touched.branchId}
                      label="Branch"
                      placeholder="Branch"
                      select
                      options={
                        fetching
                          ? [
                              {
                                key: "bra",
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
                                key: "bra",
                                text: "add branches to system",
                                value: "",
                              },
                            ]
                      }
                    />
                    {id === 1000000 ? (
                      <InputField
                        fluid
                        touched={props.touched.balance}
                        name="balance"
                        label="Initial balance"
                        placeholder="initial account balance"
                        type="number"
                      />
                    ) : null}
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
                    id="accountReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("accountReset")?.click();
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
