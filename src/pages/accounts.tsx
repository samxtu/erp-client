import React, { useState } from "react";
import { Button, Card, Message } from "semantic-ui-react";
import { AiTwotoneCreditCard, AiOutlineAppstoreAdd } from "react-icons/ai";
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from "../generated/graphql";
import DeleteConfirm from "../components/DeleteConfirm";
import AddEditAccount from "../components/AddEditAccount";

interface IAccountsProps {}

const Accounts: React.FC<IAccountsProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addAccountFunc,
    accountToEdit: {
      name: "",
      branchId: 1000000,
      number: "",
      balance: 0,
    },
  };
  const [error, seterror] = useState("");
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [{ data, fetching }, reGetAccounts] = useGetAccountsQuery();
  const [, deleteAccount] = useDeleteAccountMutation();
  const [openDelete, setopenDelete] = useState({
    open: false,
    id: 1000000,
  });
  async function deleteAccountFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    const { error } = await deleteAccount({ id });
    console.log("delete : ", id);
    if (error) seterror(error.message);
    else if (!error) reGetAccounts({ requestPolicy: "network-only" });
  }
  async function addAccountFunc() {
    setopenEditModal(initialValueEdit);
    await reGetAccounts({ requestPolicy: "network-only" });
    console.log("accounts", data?.getAccounts);
  }
  return (
    <div>
      <DeleteConfirm
        item="Account"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteAccountFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      <AddEditAccount
        open={openEditModal.open}
        feedback={addAccountFunc}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        header={openEditModal.title}
        accountToEdit={openEditModal.accountToEdit}
      />
      {error === "" ? null : (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Card.Group
        style={{ display: "flex", margin: "auto", alignItems: "center" }}
      >
        {!fetching &&
          data?.getAccounts &&
          data?.getAccounts.map((acc) => (
            <Card>
              <Card.Content>
                <AiTwotoneCreditCard style={{ fontSize: "5em" }} />
                <Card.Header>{acc.name}</Card.Header>
                <Card.Meta>{acc.number}</Card.Meta>
                <Card.Header>{acc.balance}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() =>
                      setopenEditModal({
                        open: true,
                        title: "Edit account",
                        id: acc.id,
                        feedback: addAccountFunc,
                        accountToEdit: {
                          name: acc.name,
                          branchId: acc.branch.id,
                          number: acc.number,
                          balance: acc.balance,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => setopenDelete({ open: true, id: acc.id })}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        <Card
          onClick={() =>
            setopenEditModal({
              ...initialValueEdit,
              open: true,
              title: "Add account",
            })
          }
        >
          <Card.Content>
            <AiOutlineAppstoreAdd style={{ fontSize: "10em" }} />
          </Card.Content>
          <Card.Content extra>
            <h3>Add account</h3>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default Accounts;
