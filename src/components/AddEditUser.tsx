import { Formik } from "formik";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Segment,
  Form,
  Portal,
  Message,
  Select,
  Checkbox,
  Input,
} from "semantic-ui-react";
import * as Yup from "yup";
import { useRegisterMutation, useEditUserMutation } from "../generated/graphql";
import { optionType } from "../pages/users";
import { InputField } from "./InputField";
import { MeContext } from "./Wrapper";

interface Props {
  open: boolean;
  nofeedback: () => void;
  roles: optionType[];
  branches: optionType[];
  header: string;
  feedback: () => void;
  id: number;
  UserToEdit?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    status: boolean;
    roleId: number;
    branchId: number;
    maxCredit: number;
    creditDays: number;
    credit: boolean;
    balance: number;
    salary: number;
  };
}

function AddEditUser(props: Props): ReactElement {
  const [, register] = useRegisterMutation();
  const [, editUser] = useEditUserMutation();
  //   const [, editUser] = useEditUserMutation();
  const [error, seterror] = useState("");
  const {
    open,
    nofeedback,
    header,
    feedback,
    id,
    roles,
    branches,
    UserToEdit,
  } = props;
  const [active, setActive] = useState(
    UserToEdit?.status === undefined ? true : UserToEdit?.status
  );
  const [credit, setCredit] = useState(
    UserToEdit?.credit === undefined ? true : UserToEdit?.credit
  );
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    email: Yup.string().required("Required"),
    phone: Yup.string()
      .min(10, "Must be 10 characters!")
      .max(10, "Must be 10 characters!")
      .required("Required"),
    location: Yup.string()
      .min(2, "Must be 2 or more characters!")
      .max(20, "Must be 20 characters or less!")
      .required("Required"),
    status: Yup.boolean(),
    roleId: Yup.number(),
    branchId: Yup.number(),
  });
  useEffect(() => {
    setActive(UserToEdit?.status!);
    setCredit(UserToEdit?.credit!);
  }, [UserToEdit]);

  const me = useContext(MeContext);

  return (
    <Portal onClose={nofeedback} open={open}>
      <Modal
        dimmer="blurring"
        centered={true}
        open={open}
        onClose={nofeedback}
        size="large"
      >
        <Modal.Header>
          {header}:
          <Checkbox
            name="status"
            id="status"
            toggle
            label={UserToEdit?.status ? "Active" : "Disabled"}
            style={{ float: "right" }}
            checked={active}
            onClick={() => {
              if (
                roles[roles.findIndex((x) => x.text === "Admin")].value ===
                me?.role.id
              )
                setActive(!active);
            }}
          />
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {error ? (
              <Message negative>
                <Message.Header>{error}</Message.Header>
              </Message>
            ) : null}
            <Formik
              initialValues={{
                name: UserToEdit?.name,
                email: UserToEdit?.email,
                phone: UserToEdit?.phone,
                location: UserToEdit?.location,
                password: "",
                roleId: UserToEdit?.roleId,
                branchId: UserToEdit?.branchId,
                maxCredit: UserToEdit?.maxCredit,
                creditDays: UserToEdit?.creditDays,
                credit: UserToEdit?.credit,
                balance: UserToEdit?.balance,
                salary: UserToEdit?.salary,
              }}
              onSubmit={async (values, { setErrors }) => {
                const vals = {
                  name: values.name!,
                  email: values.email!,
                  phone: values.phone!,
                  location: values.location!,
                  password: values.password!,
                  roleId: Number(values.roleId!),
                  branchId: Number(values.branchId!),
                  maxCredit: 0,
                  creditDays: 0,
                  credit: values.credit!,
                  balance: 0,
                  salary: 0,
                };
                if (id === 1000000) {
                  const { error } = await register({
                    params: vals,
                  });
                  if (error) {
                    console.log("error submitting", error);
                    seterror(error.message);
                  } else if (!error) {
                    // worked
                    feedback();
                  }
                } else if (id !== 1000000) {
                  const { error } = await editUser({
                    id,
                    params: {
                      name: vals.name!,
                      email: values.email!,
                      phone: values.phone!,
                      location: values.location!,
                      status: active,
                      roleId: Number(values.roleId!),
                      branchId: Number(values.branchId!),
                      maxCredit: values.maxCredit!,
                      creditDays: values.creditDays!,
                      credit: credit,
                      balance: values.balance!,
                      salary: values.salary!,
                    },
                  });
                  if (error) {
                    console.log("error submitting", error);
                    // seterror(error.message);
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
                      label="User name"
                      placeholder="User name"
                      type="text"
                    />
                    <InputField
                      fluid
                      name="email"
                      touched={props.touched.email}
                      label="User email"
                      placeholder="User email"
                      type="email"
                    />
                    <InputField
                      fluid
                      name="phone"
                      touched={props.touched.phone}
                      label="phone"
                      placeholder="phone Eg 0712345678"
                      type="text"
                      minLength={10}
                      maxLength={10}
                    />
                    <InputField
                      fluid
                      name="location"
                      touched={props.touched.location}
                      label="User location"
                      placeholder="User location"
                      type="text"
                    />
                    {roles && (
                      <InputField
                        fluid
                        name="roleId"
                        touched={props.touched.roleId}
                        label="User role"
                        placeholder="User role"
                        select
                        options={roles}
                      />
                    )}
                    {branches && (
                      <InputField
                        fluid
                        name="branchId"
                        touched={props.touched.branchId}
                        label="User branch"
                        placeholder="User branch"
                        select
                        options={branches}
                      />
                    )}
                    {roles[roles.findIndex((x) => x.text === "Employee")]
                      .value === UserToEdit?.roleId &&
                      roles[roles.findIndex((x) => x.text === "Admin")]
                        .value === me?.role.id && (
                        <InputField
                          fluid
                          name="salary"
                          touched={props.touched.salary}
                          label="Employee salary"
                          placeholder="User salary"
                          type="number"
                        />
                      )}
                    {roles[roles.findIndex((x) => x.text === "Customer")]
                      .value === UserToEdit?.roleId &&
                      roles[roles.findIndex((x) => x.text === "Admin")]
                        .value === me?.role.id && (
                        <InputField
                          fluid
                          name="credit"
                          touched={props.touched.credit}
                          label="Allow customer to use credit"
                          onChange={(e) => {
                            setCredit(
                              e.currentTarget.value === "true" ? true : false
                            );
                          }}
                          value={"" + credit + ""}
                          select
                          options={[
                            {
                              key: "true",
                              text: "true",
                              value: "true",
                            },
                            {
                              key: "false",
                              text: "false",
                              value: "false",
                            },
                          ]}
                        />
                      )}
                    {roles[roles.findIndex((x) => x.text === "Customer")]
                      .value === UserToEdit?.roleId &&
                      roles[roles.findIndex((x) => x.text === "Admin")]
                        .value === me?.role.id &&
                      credit && (
                        <>
                          <InputField
                            fluid
                            name="maxCredit"
                            touched={props.touched.maxCredit}
                            label="Allowed credit"
                            placeholder="Allowed credit"
                            type="number"
                          />
                          <InputField
                            fluid
                            name="creditDays"
                            touched={props.touched.creditDays}
                            label="Allowed days for credit payment"
                            placeholder="Allowed days for credit payment"
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
                    id="UserReset"
                  />
                </Form>
              )}
            </Formik>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              return document.getElementById("UserReset")?.click();
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

export default AddEditUser;
