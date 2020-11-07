import React, { ReactElement } from "react";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

interface Props {
  active: string;
  arr: string[];
  open: boolean;
}

export default function Chevron({ active, arr,  open }: Props): ReactElement {
  const re = !(arr.includes(active) && open) ? <AiOutlineRight /> : <AiOutlineDown />;
  return re;
}
