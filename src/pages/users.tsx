import React, { useEffect, useState } from "react";
import {
  Segment,
  Image,
  Message,
  SearchProps,
  List,
  Header,
  Button,
  Card,
  Icon,
} from "semantic-ui-react";
import {
  GetUsersQuery,
  useGetBranchesQuery,
  useGetRolesQuery,
  useGetUsersQuery,
  User,
} from "../generated/graphql";
import AddEditUser from "../components/AddEditUser";
// import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";
import UserInfoModal from "../components/UserInfoModal";
import { FaUsers } from "react-icons/fa";

interface IUserProps {}
export interface optionType {
  key: number;
  value: number;
  text: string;
}
var loading: boolean = false;

const Users: React.FC<IUserProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addUserFunc,
    UserToEdit: {
      name: "",
      email: "",
      roleId: 0,
      phone: "",
      location: "",
      branchId: 0,
      status: true,
      maxCredit: 0,
      creditDays: 0,
      credit: false,
      balance: 0,
      salary: 0,
    },
  };
  const [roleArray, setRoleArray] = useState<optionType[]>([]);
  const [branchArray, setBranchArray] = useState<optionType[]>([]);
  const [{ data, fetching }, reGetUsers] = useGetUsersQuery({
    requestPolicy: "cache-and-network",
  });
  const [branches] = useGetBranchesQuery();
  const [roles] = useGetRolesQuery();
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [search, setsearch] = useState("");
  const [name, setname] = useState("");
  const [user, setUser] = useState<any | null>(null);

  //   const [, deleteAsset] = useDeleteAssetMutation();
  //   async function deleteAssetFunc(id: number) {
  //     setopenDelete({ open: false, id: 1000000 });
  //     console.log("delete with id: ", id);
  //     const { error } = await deleteAsset({ id });
  //     if (error) seterror(error.message);
  //     reGetAssets({ requestPolicy: "network-only" });
  //   }
  async function addUserFunc() {
    setopenEditModal(initialValueEdit);
    reGetUsers({ requestPolicy: "network-only" });
  }

  useEffect(() => {
    var array: optionType[] = [];
    if (roles.data)
      array = roles.data.getRoles.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
      setRoleArray(array)
  }, [roles.fetching]);

  useEffect(() => {
    var array: optionType[] = [];

    if (branches.data)
      array = branches.data.getBranches.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
      setBranchArray(array)
    console.log("branches: ", branches.data?.getBranches);
  }, [branches.fetching]);

  function handleSearch(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) {
    if (value.value) setsearch(value.value);
    else setsearch("");
  }
  // useEffect(() => {
  //   console.log("rerendering Assets");
  // }, [data, fetching]);
  return (
    <>
      {/* <DeleteConfirm
        item="Asset"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteAssetFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      /> */}
      <AddEditUser
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        roles={roleArray}
        branches={branchArray}
        UserToEdit={openEditModal.UserToEdit}
      />
      <UserInfoModal
        userInfoModal={userInfoModal}
        id={userId}
        name={name}
        setUserInfoModal={setUserInfoModal}
      />
      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add User",
          })
        }
        title="User"
      >
        <Icon name="add user" />
      </SearchOrAdd>
      {error === "" ? null : (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Segment.Group
        style={{
          marginBottom: "0px",
          paddingBottom: "0px",
          borderBottom: "none",
        }}
      >
        <Segment style={{ textAlign: "left" }}>
          <span
            style={{ marginLeft: "27%", fontWeight: "bold", fontSize: "1em" }}
          >
            Users:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        {!fetching && !data?.getUsers && (
          <Segment style={{ marginTop: 0 }}>No User added!</Segment>
        )}
      </Segment.Group>
      {!fetching && data?.getUsers && (
        <Segment.Group
          horizontal
          style={{ marginTop: "0px", paddingTop: "0px" }}
        >
          <Segment>
            <List relaxed selection verticalAlign="middle">
              {data.getUsers.map((u) => (
                <List.Item key={u.id}>
                  <Image
                    avatar
                    src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                  />
                  <List.Content>
                    <List.Header as="a">{u.name}</List.Header>
                    <List.Description>{u.role.name}</List.Description>
                  </List.Content>
                  <List.Content floated="left">
                    <Button
                      onClick={async () => {
                        setUserId(u.id);
                        setUserInfoModal(true);
                        setname(u.name);
                      }}
                      color="green"
                    >
                      Info
                    </Button>
                  </List.Content>
                  <List.Content floated="right">
                    <Button
                      onClick={() =>
                        setopenEditModal((prev) => {
                          return {
                            ...prev,
                            open: true,
                            id: u.id,
                            title: "Edit user",
                            UserToEdit: {
                              name: u.name,
                              email: u.email,
                              phone: u.phone,
                              location: u.location,
                              status: u.status,
                              maxCredit: u.maxCredit,
                              creditDays: u.creditDays,
                              credit: u.credit,
                              balance: u.balance,
                              salary: u.salary,
                              roleId: u.role.id,
                              branchId: u.branch.id,
                            }
                          };
                        })
                      }
                    >
                      Edit
                    </Button>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        </Segment.Group>
      )}
    </>
  );
};

export default Users;
