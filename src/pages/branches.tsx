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
  useDeleteBranchMutation,
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
    feedback: addBranchFunc,
    branchToEdit: {
      name: "",
      phone: "",
      regionId: "",
      street: "",
    },
  };
  const [{ data, fetching }, reGetBranchs] = useGetBranchesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteBranch] = useDeleteBranchMutation();
  async function deleteBranchFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteBranch({ id });
    if (error) seterror(error.message);
    reGetBranchs({ requestPolicy: "network-only" });
  }
  async function addBranchFunc() {
    setopenEditModal(initialValueEdit);
    reGetBranchs({ requestPolicy: "network-only" });
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
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        branchToEdit={openEditModal.branchToEdit}
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
      >
        <Icon name="code branch" />
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
                          feedback: addBranchFunc,
                          branchToEdit: {
                            name: r.name,
                            phone: r.phone,
                            regionId: r.region.id.toString(),
                            street: r.street,
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
                </Grid>
              </Segment>
            ))}
        </Segment.Group>
      </Segment.Group>
    </>
  );
};

export default Branchs;
