import React, { useState } from "react";
import {
  Segment,
  Grid,
  Label,
  Statistic,
  Button,
  Divider,
  Message,
} from "semantic-ui-react";
import { useAddRorMutation } from "../generated/graphql";
import { rorForm } from "../utils/Types";
import AddOrEditROR from "./AddOrEditROR";

interface Props {
  update: () => void;
}

const RORAddAndEdit = ({ update }: Props) => {
  const initROR: rorForm | any = {
    name: undefined,
    buying: undefined,
    sellInPieces: undefined,
    pieces: undefined,
    selling: undefined,
  };
  const [addEditROR, setaddEditROR] = useState(initROR);
  const [, addROR] = useAddRorMutation();
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const [reset, setreset] = useState(0);
  const [profloss, setprofloss] = useState(0);
  function feedback(vals: rorForm) {
    console.log("vals got home", vals);
    seterror("");
    setprofloss(
      vals.sellInPieces
        ? vals.pieces * vals.selling - vals.buying
        : vals.selling - vals.buying
    );
    setaddEditROR(vals);
  }
  function clear() {
    setprofloss(0);
    seterror("");
    setreset((r) => {
      return r + 1;
    });
    console.log(reset);
  }
  async function saveROR() {
    let ror: {
      name: string;
      buying: number;
      sellInPieces?: boolean;
      pieces: number;
      selling: number;
    } = { ...addEditROR };
    delete ror.sellInPieces;
    if (ror.selling > 0) {
      setloading(true);
      await addROR({ args: ror });
      setloading(false);
      update();
    } else {
      seterror("No record");
    }
  }
  return (
    <Segment>
      <Grid>
        {error === "" ? null : (
          <Message negative>
            <Message.Header>{error}</Message.Header>
          </Message>
        )}
        <Grid.Column width={9}>
          <AddOrEditROR
            feedback={feedback}
            rorToEdit={addEditROR}
            reset={reset}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment raised>
            <>
              <Label
                as="a"
                color={
                  profloss === 0 ? undefined : profloss < 0 ? "red" : "blue"
                }
                ribbon
                style={{ float: "left" }}
              >
                Profit
              </Label>
              <span>**********</span>
              {profloss === 0 ? null : <br />}
              <Statistic>
                <Statistic.Label>Tshs</Statistic.Label>
                <Statistic.Value>
                  {profloss === 0
                    ? 0
                    : addEditROR.sellInPieces
                    ? addEditROR.pieces * addEditROR.selling - addEditROR.buying
                    : addEditROR.selling - addEditROR.buying}
                </Statistic.Value>
              </Statistic>
            </>
            <>
              <Label
                as="a"
                color={
                  profloss === 0 ? undefined : profloss < 0 ? "orange" : "teal"
                }
                ribbon
                style={{ float: "left" }}
              >
                Rate of Return (RoR)
              </Label>
              <br />
              <Statistic horizontal>
                <Statistic.Value>
                  {profloss === 0
                    ? 0
                    : addEditROR.sellInPieces
                    ? Math.round(
                        ((addEditROR.pieces * addEditROR.selling -
                          addEditROR.buying) *
                          100) /
                          addEditROR.buying
                      )
                    : Math.round(
                        ((addEditROR.selling - addEditROR.buying) * 100) /
                          addEditROR.buying
                      )}
                </Statistic.Value>
                <Statistic.Label style={{ fontSize: "1.5rem" }}>
                  %
                </Statistic.Label>
              </Statistic>
            </>
          </Segment>
        </Grid.Column>
        <Grid.Column width={3}>
          <Segment basic textAlign="center">
            <Button onClick={clear} content="Clear record" />

            <Divider horizontal>Or</Divider>

            <Button
              color="teal"
              content="Save ROR record"
              loading={loading}
              icon="save"
              labelPosition="right"
              onClick={saveROR}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default RORAddAndEdit;
