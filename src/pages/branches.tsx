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
  BranchInput,
  useAddBranchMutation,
  useDeleteBranchMutation,
  useEditBranchMutation,
  useGetBranchesQuery,
} from "../generated/graphql";
import AddEditBranchItem from "../components/AddEditBranchItem";
import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";

interface IBranchProps {}
var loading: boolean = false;

const Branchs: React.FC<IBranchProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    oldText: "",
    feedback: addBranchFunc,
  };
  const [{ data, fetching }, reGetBranchs] = useGetBranchesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteBranch] = useDeleteBranchMutation();
  const [, editBranch] = useEditBranchMutation();
  const [, addBranch] = useAddBranchMutation();
  async function deleteBranchFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteBranch({ id });
    if (error) seterror(error.message);
    reGetBranchs({ requestPolicy: "network-only" });
  }
  async function addBranchFunc(txt: BranchInput, id: number) {
    setopenEditModal(initialValueEdit);
    console.log(txt);
    // if (id === 1000000) {
    //   loading = true;
    //   const { error } = await addBranch({ args: txt });
    //   if (error) seterror(error.message);
    //   loading = false;
    //   reGetBranchs({ requestPolicy: "network-only" });
    // } else {
    //   const { error } = await editBranch({ args: txt, id });
    //   if (error) seterror(error.message);
    //   reGetBranchs({ requestPolicy: "network-only" });
    // }
  }
  function handleSearch(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) {
    if (value.value) setsearch(value.value);
    else setsearch("");
  }
  // useEffect(() => {
  //   console.log("rerendering Branchs");
  // }, [data, fetching]);
  return (
    <>
      <DeleteConfirm
        item="Branch"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteBranchFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      <AddEditBranchItem
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
            title: "Add Branch",
          })
        }
        title="Branch"
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
            Branchs:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment.Group style={{ marginTop: 0 }}>
          {!fetching && !data?.getBranches && (
            <Segment>No Branch added!</Segment>
          )}
          {!fetching &&
            data?.getBranches &&
            data.getBranches.map((r) => (
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
                          title: "Edit Branch",
                          id: r.id,
                          oldText: r.name,
                          feedback: addBranchFunc,
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

export default Branchs;
