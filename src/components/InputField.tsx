import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { Form } from "semantic-ui-react";

type IAppProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  mt?: string;
  touched: boolean | undefined;
  as?: React.ElementType;
  rows?: number;
  fluid?: boolean;
};

export const InputField: React.FC<IAppProps> = ({
  mt = "4px",
  as = "input",
  rows,
  size,
  touched,
  label,
  width,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const TextareaOrInput = as === "textarea" ? "Textarea" : "Input";
  const [thisError, setError] = useState("");

  useEffect(() => {
    if (error && touched) {
      setError(error);
    }
  }, [error, touched]);
  return (
    <Form.Field inline>
      <label>{label}</label>
      <Form.Input
        error={thisError === "" ? undefined : thisError}
        id={field.name}
        {...props}
        {...field}
        control={TextareaOrInput}
      />
    </Form.Field>
  );
};
