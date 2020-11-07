import React, { ReactElement, useEffect, useState } from "react";
import { Modal, Button, Input, Message } from "semantic-ui-react";

interface Props {
  open: boolean;
  nofeedback: () => void;
  oldText: string;
  header: string;
  feedback: (newtext: string, id: number) => void;
  id: number;
}

function AddEditSingleItem({
  open,
  nofeedback,
  oldText,
  header,
  feedback,
  id,
}: Props): ReactElement {
  const [newText, setnewText] = useState("");
  const [error, seterror] = useState("");
  function submitNewText() {
    if (newText.length < 3) {
      seterror("Too short");
    } else feedback(newText, id);
  }
  function setNewValue(e: any, data: any) {
    setnewText(data.value);
  }
  useEffect(() => {
    console.log("open add or edit", open);
  }, [open]);
  return (
    <>
      <Modal
        dimmer="blurring"
        centered={false}
        open={open}
        onClose={nofeedback}
      >
        <Modal.Header>{header}:</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {error ? (
              <Message negative>
                <Message.Header>{error}</Message.Header>
              </Message>
            ) : null}
            <Input
              error={!!error}
              action={{
                color: "teal",
                labelPosition: "right",
                icon: "save",
                content: "Save",
                onClick: submitNewText,
              }}
              defaultValue={oldText}
              onChange={setNewValue}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={nofeedback} secondary>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default AddEditSingleItem;
