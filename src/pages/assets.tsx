import React, { useState } from "react";
import {
  Segment,
  Grid,
  Icon,
  Button,
  Message,
  SearchProps,
  Label,
} from "semantic-ui-react";
import {
  useDeleteAssetMutation,
  useGetAssetsQuery,
} from "../generated/graphql";
import AddEditAssetItem from "../components/AddEditAssetItem";
import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";

interface IAssetProps {}
var loading: boolean = false;

const Assets: React.FC<IAssetProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addAssetFunc,
    assetToEdit: {
      name: "",
      code: "",
      condition: "",
      branchId: "",
      details: "",
    },
  };
  const [{ data, fetching }, reGetAssets] = useGetAssetsQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [, deleteAsset] = useDeleteAssetMutation();
  async function deleteAssetFunc(id: number) {
    setopenDelete({ open: false, id: 1000000 });
    console.log("delete with id: ", id);
    const { error } = await deleteAsset({ id });
    if (error) seterror(error.message);
    reGetAssets({ requestPolicy: "network-only" });
  }
  async function addAssetFunc() {
    setopenEditModal(initialValueEdit);
    reGetAssets({ requestPolicy: "network-only" });
  }
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
      <DeleteConfirm
        item="Asset"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteAssetFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      <AddEditAssetItem
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        assetToEdit={openEditModal.assetToEdit}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Asset",
          })
        }
        title="Asset"
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
            Assets:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment style={{ marginTop: 0 }}>
          {!fetching && !data?.getAssets && <Segment>No Asset added!</Segment>}
        </Segment>
        <Segment style={{ marginTop: 0, borderTop: "none" }}>
          <Grid columns={5} divided>
            {!fetching && data?.getAssets && (
              <Grid.Row key="title">
                <Grid.Column>
                  <b>Asset name</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Asset code</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Asset condition</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Asset branch</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Actions</b>
                </Grid.Column>
              </Grid.Row>
            )}
            {!fetching &&
              data?.getAssets &&
              data.getAssets.map((r) => (
                <Grid.Row key={JSON.stringify(r)}>
                  <Grid.Column>{r.name}</Grid.Column>
                  <Grid.Column>{r.code}</Grid.Column>
                  <Grid.Column>
                    <Label
                      color={r.condition === "working" ? "teal" : "red"}
                      tag
                    >
                      {r.condition}
                    </Label>
                  </Grid.Column>
                  <Grid.Column>{r.branch.name}</Grid.Column>
                  <Grid.Column>
                    <Button
                      style={{ margin: "auto" }}
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit Asset",
                          id: r.id,
                          feedback: addAssetFunc,
                          assetToEdit: {
                            name: r.name,
                            code: r.code,
                            branchId: r.branch.id.toString(),
                            condition: r.condition,
                            details: r.details,
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

export default Assets;
