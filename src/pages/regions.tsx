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
  useAddRegionMutation,
  useDeleteRegionMutation,
  useEditRegionMutation,
  useGetRegionsQuery,
} from "../generated/graphql";
import AddEditSingleItem from "../components/AddEditSingleItem";
import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";

interface IRegionProps {}
var loading: boolean = false;

const Regions: React.FC<IRegionProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    oldText: "",
    feedback: addRegionFunc,
  };
  const [{ data, fetching }, reGetRegions] = useGetRegionsQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteRegion] = useDeleteRegionMutation();
  const [, editRegion] = useEditRegionMutation();
  const [, addRegion] = useAddRegionMutation();
  async function deleteRegionFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteRegion({ id });
    if (error) seterror(error.message);
    reGetRegions({ requestPolicy: "network-only" });
  }
  async function addRegionFunc(txt: string, id: number) {
    setopenEditModal(initialValueEdit);
    if (id === 1000000) {
      loading = true;
      const { error } = await addRegion({ name: txt });
      if (error) seterror(error.message);
      loading = false;
      reGetRegions({ requestPolicy: "network-only" });
    } else {
      const { error } = await editRegion({ name: txt, id });
      if (error) seterror(error.message);
      reGetRegions({ requestPolicy: "network-only" });
    }
  }
  function handleSearch(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) {
    if (value.value) setsearch(value.value);
    else setsearch("");
  }
  return (
    <>
      <DeleteConfirm
        item="region"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteRegionFunc}
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
            title: "Add region",
          })
        }
        title="Region"
      >
        <Icon name="map marker alternate"/>
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
            Regions:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment.Group style={{ marginTop: 0 }}>
          {!fetching && !data?.getRegions && (
            <Segment>No region added!</Segment>
          )}
          {!fetching &&
            data?.getRegions &&
            data.getRegions.map((r) => (
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
                          title: "Edit region",
                          id: r.id,
                          oldText: r.name,
                          feedback: addRegionFunc,
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

export default Regions;
