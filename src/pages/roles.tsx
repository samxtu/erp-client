import React, { useState } from "react";
import {
  Segment,
  Grid,
  Icon,
  Button,
  Message,
  SearchProps,
} from "semantic-ui-react";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetRolesQuery,
} from "../generated/graphql";
import AddEditSingleItem from "../components/AddEditSingleItem";
import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";

interface IRoleProps {}
var loading: boolean = false;

const Roles: React.FC<IRoleProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    oldText: "",
    feedback: addRoleFunc,
  };
  const [{ data, fetching }, reGetRoles] = useGetRolesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteRole] = useDeleteRoleMutation();
  const [, editRole] = useEditRoleMutation();
  const [, addRole] = useAddRoleMutation();
  async function deleteRoleFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteRole({ id });
    if (error) seterror(error.message);
    reGetRoles({ requestPolicy: "network-only" });
  }
  async function addRoleFunc(txt: string, id: number) {
    setopenEditModal(initialValueEdit);
    if (id === 1000000) {
      loading = true;
      const { error } = await addRole({ name: txt });
      if (error) seterror(error.message);
      loading = false;
      reGetRoles({ requestPolicy: "network-only" });
    } else {
      const { error } = await editRole({ name: txt, id });
      if (error) seterror(error.message);
      reGetRoles({ requestPolicy: "network-only" });
    }
  }
  function handleSearch(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) {
    if (value.value) setsearch(value.value);
    else setsearch("");
  }
  // useEffect(() => {
  //   console.log("rerendering roles");
  // }, [data, fetching]);
  return (
    <>
      <DeleteConfirm
        item="Role"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteRoleFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      <AddEditSingleItem
        open={openEditModal.open}
        oldText={openEditModal.oldText}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Role",
          })
        }
        title="Role"
      />
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
            Roles:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment.Group style={{ marginTop: 0 }}>
          {!fetching && !data?.getRoles && <Segment>No Role added!</Segment>}
          {!fetching &&
            data?.getRoles &&
            data.getRoles.map((r) => (
              <Segment
                style={{
                  width: "98%",
                  padding: "5px",
                }}
                key={r.id}
              >
                <Grid>
                  <Grid.Column
                    width={10}
                    style={{ fontSize: "2rem", textAlign: "center" }}
                  >
                    {r.name}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button
                      style={{ margin: "auto" }}
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit Role",
                          id: r.id,
                          oldText: r.name,
                          feedback: addRoleFunc,
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
                </Grid>
              </Segment>
            ))}
        </Segment.Group>
      </Segment.Group>
    </>
  );
};

export default Roles;
