import React, { useEffect } from "react";
import { Modal, Header, Icon, Button } from "semantic-ui-react";

interface IDeleteConfirmProps {
  open: boolean;
  item: string;
  feedback: (id: number) => void;
  nofeedback: () => void;
  id: number;
}

// Controlled delete confirm modal
const DeleteConfirm: React.FunctionComponent<IDeleteConfirmProps> = ({
  open,
  item,
  feedback,
  nofeedback,
  id,
}) => {
  useEffect(() => {
    console.log("open confirm", open);
  }, [open]);
  return (
    <Modal
      basic
      onClose={nofeedback}
      open={open}
      size="small"
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header icon>
        <Icon name="delete" />
        Delete {item}
      </Header>
      <Modal.Content style={{ textAlign: "center" }}>
        <p>Are you sure?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic inverted onClick={nofeedback}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="red" inverted onClick={() => feedback(id)}>
          <Icon name="checkmark" /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteConfirm;
