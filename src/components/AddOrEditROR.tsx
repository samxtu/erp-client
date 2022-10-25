import React, { useState, useEffect, useRef } from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { InputField } from "./InputField";
import * as Yup from "yup";
import { rorForm } from "../utils/Types";

interface Props {
  rorToEdit: rorForm;
  feedback: (vals: rorForm) => void;
  reset: number;
}

const AddOrEditROR = ({ rorToEdit, feedback, reset }: Props) => {
  const [error, seterror] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be 3 or more characters!")
      .max(40, "Must be 40 characters or less!")
      .required("Required"),
    buying: Yup.number().typeError("Must be a number").required("Required"),
    sellInPieces: Yup.boolean(),
    pieces: Yup.number()
      .typeError("Must be a number")
      .when("sellInPieces", {
        is: true,
        then: Yup.number().typeError("Must be a number").required("Required"),
      }),
    selling: Yup.number().typeError("Must be a number").required("Required"),
  });
  const [checked, setchecked] = useState(false);
  useEffect(() => {
    console.log("add or edit ror updated");
  }, [rorToEdit]);

  useEffect(() => {
    console.log("reset changed");
    const node = document.getElementById("resetForm");
    if (node) {
      console.log("form is reset");
      node.click();
    }
  }, [reset]);
  return (
    <>
      <Formik
        initialValues={rorToEdit}
        onSubmit={async (values, { setErrors }) => {
          console.log("values", values);
          feedback(values);
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
                label="Item name"
                placeholder="Item name"
                value={props.values.name}
                type="text"
              />
              <InputField
                fluid
                name="buying"
                touched={props.touched.buying}
                value={props.values.buying}
                label="Buying price"
                placeholder="E.g 100,000"
                type="number"
              />
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column>
                    <Segment compact onChange={() => setchecked((val) => !val)}>
                      <InputField
                        slider
                        checkbox
                        touched={props.touched.sellInPieces}
                        checked={props.values.sellInPieces}
                        name="sellInPieces"
                        label="Sell in pieces"
                      />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    {checked ? (
                      <InputField
                        fluid
                        name="pieces"
                        touched={props.touched.pieces}
                        value={props.values.pieces}
                        label="Pieces per unit"
                        type="number"
                      />
                    ) : (
                      <b>Sold as a unit.</b>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <InputField
                fluid
                name="selling"
                touched={props.touched.selling}
                value={props.values.selling}
                label="Selling price"
                type="number"
              />
            </Segment>
            <Button type="reset" id="resetForm" content="Reset" />
            <Button
              loading={props.isSubmitting}
              color="teal"
              size="large"
              type="submit"
              content="Calculate..."
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddOrEditROR;
