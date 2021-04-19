import React from "react";
import { useField } from "formik";
import { DropdownItemProps, Form, Input, Label } from "semantic-ui-react";

type IAppProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  mt?: string;
  touched: boolean | undefined;
  as?: React.ElementType;
  rows?: number;
  fluid?: boolean;
  slider?: boolean;
  checkbox?: boolean;
  normal?: boolean;
  select?: boolean;
  prefix?: string;
  options?: DropdownItemProps[];
};

export const InputField: React.FC<IAppProps> = ({
  mt = "4px",
  as = "input",
  rows,
  size,
  touched,
  label,
  width,
  normal,
  select,
  checkbox,
  prefix,
  options,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const TextareaOrInput = as === "textarea" ? "Textarea" : "Input";
  if (!normal && !select && !checkbox)
    return (
      <Form.Field inline>
        <label>{label}</label>
        <Form.Input
          error={error && touched ? error : undefined}
          id={field.name}
          {...props}
          {...field}
          control={TextareaOrInput}
        />
      </Form.Field>
    );
  else {
    if (select) {
      return (
        <Form.Field
          error={!!error && touched}
          control="select"
          {...field}
          {...(props as any)}
          id={field.name}
          label={label}
        >
          <option key="123" value="">
            Select {label}
          </option>
          {options?.map((opt) => (
            <option key={opt.key} value={`${opt.value as number}`}>
              {opt.text}
            </option>
          ))}
        </Form.Field>
      );
    }
    if (checkbox) {
      return (
        <Form.Field>
          <Form.Checkbox
            {...field}
            {...(props as any)}
            id={field.name}
            label={label}
          />
        </Form.Field>
      );
    } else
      return (
        <Form.Field inline error={error && touched}>
          <label>{label}</label>
          <Input
            error={!!error && touched}
            id={field.name}
            {...props}
            {...field}
            label={prefix}
          />
          {error && touched ? (
            <Label
              pointing
              style={{ color: "#bf4040", borderColor: "#bf4040" }}
            >
              {error}
            </Label>
          ) : null}
        </Form.Field>
      );
  }
};

// {/* <Form.Field
// error={!!error && touched}
// control={Select}
// {...field}
// {...(props as any)}
// id={field.name}
// label={{
//   children: label,
//   htmlFor: "form-select-control-region",
// }}
// search
// searchInput={{ id: "form-select-control-region" }}
// options={options}
// /> */}
