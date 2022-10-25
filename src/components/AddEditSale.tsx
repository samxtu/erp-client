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
  useAddSaleMutation,
  useEditSaleMutation,
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
  sellers: optionType[];
  id: number;
  saleToEdit?: {
    saleDate: string;
    sellerId: number;
    clientId: number;
    productId: number;
    quantity: number;
    payed: number;
    sellingPrice: number;
    pieceSellingPrice: number;
    accountId: number;
    pieceQuantity: number;

  };
}

function AddEditSaleItem({
  open,
  nofeedback,
  header,
  feedback,
  accounts,
  products,
  sellers,
  id,
  saleToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addSale] = useAddSaleMutation();
  const [, editSale] = useEditSaleMutation();
  const [error, seterror] = useState("");

  const validationSchema = Yup.object({
    saleDate: Yup.string().required("Required"),
    sellerId: Yup.number().min(1).required("Required"),
    productId: Yup.number().min(1).required("Required"),
    quantity: Yup.number().min(1).required("Required"),
    sellingPrice: Yup.number().min(100).required("Required"),
    payed: Yup.number().min(100).required("Required"),
    pieceSellingPrice: Yup.number(),
    accountId: Yup.number().min(1).required("Required"),
    pieceQuantity: Yup.number(),
  });
  useEffect(() => {
    console.log("open add or edit Sale", open);
    if (open) {
      seterror("");
      console.log("options: ",accounts,products,sellers)
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
                saleDate: saleToEdit?.saleDate!,
                sellerId: saleToEdit?.sellerId!,
                productId: saleToEdit?.productId!,
                quantity: saleToEdit?.quantity!,
                sellingPrice: saleToEdit?.sellingPrice!,
                payed: saleToEdit?.payed!,
                pieceSellingPrice: saleToEdit?.pieceSellingPrice!,
                accountId: saleToEdit?.accountId!,
                clientId: saleToEdit?.clientId!,
                pieceQuantity: saleToEdit?.pieceQuantity!,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                };
                if (id === 1000000) {
                  const { error } = await addSale({
                    args: {
                      saleDate: vals.saleDate!,
                      sellerId: vals.sellerId!-0,
                      productId: vals.productId!-0,
                      clientId: vals.clientId! - 0,
                      quantity: vals.quantity!,
                      payed: vals.payed!,
                      sellingPrice: vals.sellingPrice!,
                      pieceSellingPrice: vals.pieceSellingPrice!,
                      accountId: vals.accountId!-0,
                      pieceQuantity: vals.pieceQuantity!-0,
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
                  const { error } = await editSale({
                    args: {
                      saleDate: vals.saleDate!,
                      sellerId: vals.sellerId!,
                      productId: vals.productId!,
                      quantity: vals.quantity!,
                      payed: vals.payed!,
                      sellingPrice: vals.sellingPrice!,
                      pieceSellingPrice: vals.pieceSellingPrice!,
                      accountId: vals.accountId!,
                      clientId: vals.clientId!,
                      pieceQuantity: vals.pieceQuantity!-0,
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
                      name="saleDate"
                      touched={props.touched.saleDate}
                      label="Sale date"
                      placeholder="Sale date"
                      type="date"
                    />
                    {sellers && <InputField
                      fluid
                      name="sellerId"
                      touched={props.touched.sellerId}
                      label="Seller employee"
                      placeholder="Seller employee"
                      select
                      options={sellers}
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
                      label="Sold quantity"
                      placeholder="Sold quantity"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="payed"
                      touched={props.touched.payed}
                      label="Ammount payed"
                      placeholder="Ammount payed"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="sellingPrice"
                      touched={props.touched.sellingPrice}
                      label="Sale selling price"
                      placeholder="Sale selling price"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="pieceSellingPrice"
                      touched={props.touched.pieceSellingPrice}
                      label="Selling price per piece"
                      placeholder="Selling price per piece"
                      type="number"
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
                    id="saleReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("saleReset")?.click();
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

export default AddEditSaleItem;



