import React, { ReactElement } from "react";
import { Placeholder as Plc } from "semantic-ui-react";

interface Props {
  lines: number[];
}

export default function Placeholder({ lines }: Props): ReactElement {
  return (
    <Plc fluid>
      {lines.map((l, i) => (
        <Plc.Line key={i} length="full" as="h1" />
      ))}
    </Plc>
  );
}
