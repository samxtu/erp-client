import React, { useState } from "react";
import RORAddAndEdit from "../components/RORAddAndEdit";
import RORTable from "../components/RORTable";
import { Ror as ror } from "../generated/graphql";

// interface Props {}

const Ror = () => {
  const [updateValue, setupdateValue] = useState(1);
  function editFunction({ rorToEdit }: { id: number; rorToEdit: ror }) {
    console.log("ror to edit is: ", rorToEdit);
  }
  return (
    <>
      <RORAddAndEdit update={() => setupdateValue((v) => v + 1)} />
      <RORTable update={updateValue} edit={editFunction} />
    </>
  );
};

export default Ror;
