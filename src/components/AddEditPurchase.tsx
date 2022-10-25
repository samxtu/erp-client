import { Formik } from "formik";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Segment,
  Form,
  Portal,
  Message,
} from "semantic-ui-react";
import {
  useAddPurchaseMutation,
  useEditPurchaseMutation,
  useGetBranchesQuery,
} from "../generated/graphql";
import * as Yup from "yup";
import { InputField } from "./InputField";
import { optionType } from "../pages/users";
import { MeContext } from "./Wrapper";

interface Props {
  open: boolean;
  nofeedback: () => void;
  header: string;
  feedback: () => void;
  accounts: optionType[];
  products: optionType[];
  suppliers: optionType[];
  id: number;
  purchaseToEdit?: {
    purchaseDate: string;
    supplierId: number;
    productId: number;
    quantity: number;
    purchasePrice: number;
    sellingPrice: number;
    pieceSellingPrice: number;
    receipt: string;
    accountId: number;
  };
}

function AddEditPurchaseItem({
  open,
  nofeedback,
  header,
  feedback,
  accounts,
  products,
  suppliers,
  id,
  purchaseToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addPurchase] = useAddPurchaseMutation();
  const [, editPurchase] = useEditPurchaseMutation();
  const [error, seterror] = useState("");

  const validationSchema = Yup.object({
    purchaseDate: Yup.string().required("Required"),
    supplierId: Yup.number().min(1).required("Required"),
    productId: Yup.number().min(1).required("Required"),
    quantity: Yup.number().min(1).required("Required"),
    purchasePrice: Yup.number().min(100).required("Required"),
    sellingPrice: Yup.number().min(100).required("Required"),
    pieceSellingPrice: Yup.number(),
    receipt: Yup.string(),
    accountId: Yup.number().min(1).required("Required"),
  });
  useEffect(() => {
    console.log("open add or edit purchase", open);
    if (open) {
      seterror("");
      console.log("options: ",accounts,products,suppliers)
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
                purchaseDate: purchaseToEdit?.purchaseDate!,
                supplierId: purchaseToEdit?.supplierId!,
                productId: purchaseToEdit?.productId!,
                quantity: purchaseToEdit?.quantity!,
                purchasePrice: purchaseToEdit?.purchasePrice!,
                sellingPrice: purchaseToEdit?.sellingPrice!,
                pieceSellingPrice: purchaseToEdit?.pieceSellingPrice!,
                receipt: purchaseToEdit?.receipt!,
                accountId: purchaseToEdit?.accountId!,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                };
                if (id === 1000000) {
                  const { error } = await addPurchase({
                    args: {
                      purchaseDate: vals.purchaseDate!,
                      supplierId: vals.supplierId!-0,
                      productId: vals.productId!-0,
                      quantity: vals.quantity!,
                      purchasePrice: vals.purchasePrice!,
                      sellingPrice: vals.sellingPrice!,
                      pieceSellingPrice: vals.pieceSellingPrice!,
                      receipt: vals.receipt!,
                      accountId: vals.accountId!-0,
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
                  const { error } = await editPurchase({
                    args: {
                      purchaseDate: vals.purchaseDate!,
                      supplierId: vals.supplierId!,
                      productId: vals.productId!,
                      quantity: vals.quantity!,
                      purchasePrice: vals.purchasePrice!,
                      sellingPrice: vals.sellingPrice!,
                      pieceSellingPrice: vals.pieceSellingPrice!,
                      receipt: vals.receipt!,
                      accountId: vals.accountId!,
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
                      name="purchaseDate"
                      touched={props.touched.purchaseDate}
                      label="Purchase date"
                      placeholder="Purchase date"
                      type="date"
                    />
                    {suppliers && <InputField
                      fluid
                      name="supplierId"
                      touched={props.touched.supplierId}
                      label="Supplier"
                      placeholder="Supplier"
                      select
                      options={suppliers}
                    />}
                    {products && <InputField
                      fluid
                      name="productId"
                      touched={props.touched.productId}
                      label="Product"
                      placeholder="Product"
                      select
                      options={products}
                    />}
                    <InputField
                      fluid
                      name="quantity"
                      touched={props.touched.quantity}
                      label="Purchased quantity"
                      placeholder="Purchased quantity"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="purchasePrice"
                      touched={props.touched.purchasePrice}
                      label="Purchasing price"
                      placeholder="Purchasing price"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="sellingPrice"
                      touched={props.touched.sellingPrice}
                      label="Purchase selling price"
                      placeholder="Purchase selling price"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="pieceSellingPrice"
                      touched={props.touched.pieceSellingPrice}
                      label="Purchase piece selling price"
                      placeholder="Purchase piece selling price"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="receipt"
                      touched={props.touched.receipt}
                      label="Supplier receipt"
                      placeholder="Supplier receipt"
                      type="file"
                      normal
                      buttonName="Upload"
                      iconName="file image"
                    />
                    {accounts && <InputField
                      fluid
                      name="accountId"
                      touched={props.touched.accountId}
                      label="Account"
                      placeholder="Account"
                      select
                      options={accounts}
                    />}
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
                    id="purchaseReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("purchaseReset")?.click();
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

export default AddEditPurchaseItem;



