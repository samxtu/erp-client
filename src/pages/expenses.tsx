import React, { useEffect, useState } from "react";
import {
  Segment,
  Grid,
  Icon,
  Button,
  Message,
  SearchProps,
} from "semantic-ui-react";
import {
  useDeleteExpenseMutation,
  useGetAccountsQuery,
  useGetAssetsQuery,
  useGetExpensesQuery,
  useGetUsersQuery,
} from "../generated/graphql";
import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";
import { GiPayMoney } from "react-icons/gi";
import AddEditExpenseItem from "../components/AddEditExpenseItem";
import { optionType } from "./users";

interface IExpenseProps {}
var loading: boolean = false;

const Expenses: React.FC<IExpenseProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addExpenseFunc,
    expenseToEdit: {
        date: "",
        title: "",
        details: "",
        assetId: 0,
        staffId: 0,
        ammount: 0,
        authorizerId: 0,
        accountId: 0,
        type: ""
    },
  };
  const [{ data, fetching }, reGetExpenses] = useGetExpensesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteExpense] = useDeleteExpenseMutation();
  async function deleteExpenseFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteExpense({ id });
    if (error) seterror(error.message);
    reGetExpenses({ requestPolicy: "network-only" });
  }
  async function addExpenseFunc() {
    setopenEditModal(initialValueEdit);
    setTimeout(
      function() {
        reGetExpenses({ requestPolicy: "network-only" });
      }, 1000);
  }
  function handleSearch(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) {
    if (value.value) setsearch(value.value);
    else setsearch("");
  }
  
  const [staffArray, setStaffArray] = useState<optionType[]>([]);
  const [authorsArray, setAuthorsArray] = useState<optionType[]>([]);
  const [accountsArray, setAccountsArray] = useState<optionType[]>([]);
  const [assetsArray, setAssetsArray] = useState<optionType[]>([]);
  
  const [staffs] = useGetUsersQuery();
  const [assets] = useGetAssetsQuery();
  const [accounts] = useGetAccountsQuery();

  useEffect(() => {
    var array: any = [];
    var secarray: any = [];
    if (staffs.data){
      array = staffs.data.getUsers
        .filter((r) => {
          return r.role.name === "Admin";
        })
        .map((r) => {
          return { key: r.id, value: r.id, text: r.name };
        });
    secarray = staffs.data.getUsers
        .filter((r) => {
        return r.role.name === "Employee";
        })
        .map((r) => {
        return { key: r.id, value: r.id, text: r.name };
        });
    }
    setAuthorsArray(array);
    setStaffArray(secarray);
  }, [staffs.fetching]);

  useEffect(() => {
    var array: any = [];
    if (assets.data)
      array = assets.data.getAssets.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
    setAssetsArray(array);
  }, [assets.fetching]);

  useEffect(() => {
    var array: any = [];
    if (accounts.data)
      array = accounts.data.getAccounts.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
    setAccountsArray(array);
  }, [accounts.fetching]);


  return (
    <>
      <DeleteConfirm
        item="Expense"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteExpenseFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      <AddEditExpenseItem
        accounts={accountsArray}
        authorizers={authorsArray}
        assets={assetsArray}
        staffs={staffArray}
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        // expenseToEdit={openEditModal.expenseToEdit}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Expense",
          })
        }
        title="Expense"
      >
        <GiPayMoney style={{fontSize: "60px", padding: "0px", margin:"0px"}} />
      </SearchOrAdd>
      {error === "" ? null : (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Segment.Group>
        <Segment style={{ textAlign: "left" }}>
          <span
            style={{ marginLeft: "27%", fontWeight: "bold", fontSize: "1em" }}
          >
            Expenses:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment style={{ marginTop: 0 }}>
          {!fetching && !data?.getExpenses && <Segment>No Expense added!</Segment>}
        </Segment>
        <Segment style={{ marginTop: 0, borderTop: "none" }}>
          <Grid columns={5} divided>
            {!fetching && data?.getExpenses && (
              <Grid.Row key="title">
                <Grid.Column>
                  <b>Expense date</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Expense title</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Assigned Employee</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Expense Ammount</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Actions</b>
                </Grid.Column>
              </Grid.Row>
            )}
            {!fetching &&
              data?.getExpenses &&
              data.getExpenses.map((r) => (
                <Grid.Row key={JSON.stringify(r)}>
                  <Grid.Column>{new Date(parseInt(r.expenseDate)).toDateString()}</Grid.Column>
                  <Grid.Column>{r.title}</Grid.Column>
                  <Grid.Column>{r.staff.name}</Grid.Column>
                  <Grid.Column>{r.ammount + "/= Tsh"}</Grid.Column>
                  <Grid.Column>
                    <Button
                      style={{ margin: "auto" }}
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit Expense",
                          id: r.id,
                          feedback: addExpenseFunc,
                          expenseToEdit: {
                            date: r.expenseDate,
                            title: r.title,
                            details: r.details,
                            assetId: 0,
                            staffId: r.staff.id,
                            ammount: r.ammount,
                            authorizerId: r.authorizer.id,
                            accountId: r.account.id,
                            type: r.type
                          },
                        })
                      }
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button
                      secondary
                      style={{ margin: "auto", marginLeft: "10px" }}
                      onClick={() => setopenDelete({ open: true, id: r.id })}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              ))}
          </Grid>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default Expenses;
