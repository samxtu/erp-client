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
  useAddProductMutation,
  useEditProductMutation,
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
  roles: optionType[];
  id: number;
  productToEdit?: {
    name: string;
    unit: string;
    pieces: number;
    pieceUnit: string;
    sellingPrice: number;
    pieceSellingPrice: number;
  };
}

function AddEditProductItem({
  open,
  nofeedback,
  header,
  feedback,
  roles,
  id,
  productToEdit,
}: Props): ReactElement {
  const [{ data, fetching }] = useGetBranchesQuery();
  const [, addProduct] = useAddProductMutation();
  const [, editProduct] = useEditProductMutation();
  const [error, seterror] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    unit: Yup.string()
      .min(1, "Must be 1 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    pieces: Yup.number(),
    pieceUnit: Yup.string()
      .min(1, "Must be 3 or more characters!")
      .max(20, "Must be 20 characters or less!"),
    sellingPrice: Yup.number(),
    piecesellingPrice: Yup.number(),
  });
  useEffect(() => {
    console.log("open add or edit branch", open);
    if (open) {
      seterror("");
    }
  }, [data, fetching, open]);
  
  const me = useContext(MeContext);

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
                name: productToEdit?.name,
                unit: productToEdit?.unit,
                pieces: productToEdit?.pieces,
                pieceUnit: productToEdit?.pieceUnit,
                sellingPrice: productToEdit?.sellingPrice,
                pieceSellingPrice: productToEdit?.pieceSellingPrice,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  ...values,
                };
                if (id === 1000000) {
                  const { error } = await addProduct({
                    args: {
                      name: vals.name!,
                      unit: vals.unit!,
                      pieces: vals.pieces!,
                      pieceUnit: vals.pieceUnit!,
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
                  const { error } = await editProduct({
                    args: {
                      name: vals.name!,
                      unit: vals.unit!,
                      pieces: vals.pieces!,
                      pieceUnit: vals.pieceUnit!,
                      sellingPrice: vals.sellingPrice!,
                      pieceSellingPrice: vals.pieceSellingPrice!,
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
                      label="Product name"
                      placeholder="Product name"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="unit"
                      touched={props.touched.unit}
                      label="Product unit"
                      placeholder="Product unit"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="pieces"
                      touched={props.touched.pieces}
                      label="Pieces"
                      placeholder="Pieces"
                      type="number"
                    />
                    <InputField
                      fluid
                      name="pieceUnit"
                      touched={props.touched.pieceUnit}
                      label="Product pieceUnit"
                      placeholder="Product pieceUnit"
                    />
                    {roles[roles.findIndex((x) => x.text === "Admin")].value ===
                      me?.role.id && (
                      <>
                        <InputField
                          fluid
                          name="sellingPrice"
                          touched={props.touched.sellingPrice}
                          label="Product selling price"
                          placeholder="Product selling price"
                          type="number"
                        />
                        <InputField
                          fluid
                          name="pieceSellingPrice"
                          touched={props.touched.pieceSellingPrice}
                          label="Product piece selling price"
                          placeholder="Product piece selling price"
                          type="number"
                        />
                      </>
                    )}
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
                    id="productReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("productReset")?.click();
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

export default AddEditProductItem;
