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
  useAddExpenseMutation,
  useEditExpenseMutation,
  useGetBranchesQuery,
} from "../generated/graphql";
import * as Yup from "yup";
import { InputField } from "./InputField";
import { optionType } from "../pages/users";

interface Props {
  open: boolean;
  nofeedback: () => void;
  header: string;
  feedback: () => void;
  assets: optionType[];
  staffs: optionType[];
  authorizers: optionType[];
  accounts: optionType[];
  id: number;
  expenseToEdit?: {
    expenseDate: string;
    title: string;
    details: string;
    assetId: number | null;
    staffId: number;
    ammount: number;
    authorizerId: number;
    accountId: number;
    type: string;
  };
}

function AddEditExpenseItem({
  open,
  nofeedback,
  header,
  feedback,
  assets,
  staffs,
  authorizers,
  accounts,
  id,
  expenseToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addExpense] = useAddExpenseMutation();
  const [, editExpense] = useEditExpenseMutation();
  const [error, seterror] = useState("");
  const validationSchema = Yup.object({
    expenseDate: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    details: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    assetId: Yup.number().nullable(),
    staffId: Yup.number().min(1).required("Required"),
    authorizerId: Yup.number().min(1).required("Required"),
    accountId: Yup.number().min(1).required("Required"),
    ammount: Yup.number().min(100).required("Required"),
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
        <Modal.Content scrolling>
          <Modal.Description>
            {error ? (
              <Message negative>
                <Message.Header>{error}</Message.Header>
              </Message>
            ) : null}
            <Formik
              initialValues={{
                expenseDate: expenseToEdit?.expenseDate,
                title: expenseToEdit?.title,
                details: expenseToEdit?.details,
                assetId: expenseToEdit?.assetId,
                staffId: expenseToEdit?.staffId,
                ammount: expenseToEdit?.ammount,
                authorizerId: expenseToEdit?.authorizerId,
                accountId: expenseToEdit?.accountId,
                type: expenseToEdit?.type
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values
                };
                if (id === 1000000) {
                  const { error } = await addExpense({
                    args: {
                        expenseDate: vals.expenseDate!,
                        title: vals.title!,
                        details: vals.details!,
                        assetId: vals.assetId!-0 === 0? null: vals.assetId!-0 ,
                        staffId: vals.staffId!-0,
                        ammount: vals.ammount!,
                        authorizerId: vals.authorizerId!-0,
                        accountId: vals.accountId!-0,
                        type: vals.type!
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
                  const { error } = await editExpense({
                    args: {
                        expenseDate: vals.expenseDate!,
                        title: vals.title!,
                        details: vals.details!,
                        assetId: vals.assetId!,
                        staffId: vals.staffId!,
                        ammount: vals.ammount!,
                        authorizerId: vals.authorizerId!,
                        accountId: vals.accountId!,
                        type: vals.type!
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
                      name="expenseDate"
                      touched={props.touched.expenseDate}
                      label="Expense date"
                      placeholder="Expense date"
                      type="date"
                    />
                    <InputField
                      fluid
                      name="title"
                      touched={props.touched.title}
                      label="Expense title"
                      placeholder="Expense title"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="details"
                      touched={props.touched.details}
                      label="Expense details"
                      placeholder="Expense details"
                      type="text"
                      as="textarea"
                      rows={2}
                    />
                    <InputField
                      fluid
                      name="type"
                      touched={props.touched.type}
                      label="Expense type"
                      placeholder="Expense type"
                      type="text"
                    />
                    {assets && <InputField
                      fluid
                      name="assetId"
                      touched={props.touched.assetId}
                      label="Involved Asset"
                      placeholder="Involved Asset"
                      select
                      options={assets}
                    />}
                    {staffs && <InputField
                      fluid
                      name="staffId"
                      touched={props.touched.staffId}
                      label="Assigned staff"
                      placeholder="Assigned staff"
                      select
                      options={staffs}
                    />}
                    {authorizers && <InputField
                      fluid
                      name="authorizerId"
                      touched={props.touched.authorizerId}
                      label="Authorized by"
                      placeholder="Authorized by"
                      select
                      options={authorizers}
                    />}
                    {accounts && <InputField
                      fluid
                      name="accountId"
                      touched={props.touched.accountId}
                      label="From account"
                      placeholder="From account"
                      select
                      options={accounts}
                    />}
                    <InputField
                      fluid
                      name="ammount"
                      touched={props.touched.ammount}
                      label="Ammount spent"
                      placeholder="Ammount spent"
                      type="number"
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
                    id="expenseReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("expenseReset")?.click();
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

export default AddEditExpenseItem;
