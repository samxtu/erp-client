import React, { useEffect, useState } from "react";
import {
  Segment,
  Grid,
  Icon,
  Button,
  Message,
  SearchProps,
  Label,
} from "semantic-ui-react";
import { useGetProductsQuery, useGetRolesQuery } from "../generated/graphql";
import AddEditProductItem from "../components/AddEditProductItem";
// import DeleteConfirm from "../components/DeleteConfirm";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";
import ProductModal from "../components/ProductModal";
import { optionType } from "./users";
import { AiFillGold } from "react-icons/ai";

interface IProductProps {}
var loading: boolean = false;

const Products: React.FC<IProductProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addProductFunc,
    productToEdit: {
      name: "",
      unit: "",
      pieces: 0,
      pieceUnit: "",
      sellingPrice: 0,
      pieceSellingPrice: 0,
    },
  };
  const [{ data, fetching }, reGetProducts] = useGetProductsQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [roleArray, setRoleArray] = useState<optionType[]>([]);

  const [roles] = useGetRolesQuery();
  useEffect(() => {
    var array: optionType[] = [];
    if (roles.data)
      array = roles.data.getRoles.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
    setRoleArray(array);
  }, [roles.fetching]);
  //   const [, deleteAsset] = useDeleteAssetMutation();
  //   async function deleteAssetFunc(id: number) {
  //     setopenDelete({ open: false, id: 1000000 });
  //     console.log("delete with id: ", id);
  //     const { error } = await deleteAsset({ id });
  //     if (error) seterror(error.message);
  //     reGetAssets({ requestPolicy: "network-only" });
  //   }
  async function addProductFunc() {
    setopenEditModal(initialValueEdit);
    reGetProducts({ requestPolicy: "network-only" });
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
      {/* <DeleteConfirm
        item="Asset"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteAssetFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      /> */}
      <AddEditProductItem
        roles={roleArray}
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        productToEdit={openEditModal.productToEdit}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Product",
          })
        }
        title="Product"
      >
        <AiFillGold style={{fontSize: "60px", padding: "0px", margin:"0px"}}/>
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
            Products:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment style={{ marginTop: 0 }}>
          {!fetching && !data?.getProducts && (
            <Segment>No product added!</Segment>
          )}
        </Segment>
        <Segment style={{ marginTop: 0, borderTop: "none" }}>
          <Grid columns={4} divided>
            {!fetching && data?.getProducts && (
              <Grid.Row key="title">
                <Grid.Column width={3}>
                  <b>Product name</b>
                </Grid.Column>
                <Grid.Column width={5}>
                  <b>Stock units</b>
                </Grid.Column>
                <Grid.Column width={3}>
                  <b>Stock subunits</b>
                </Grid.Column>
                <Grid.Column width={5}>
                  <b>Actions</b>
                </Grid.Column>
              </Grid.Row>
            )}
            {!fetching &&
              data?.getProducts &&
              data.getProducts.map((r) => (
                <Grid.Row key={JSON.stringify(r)}>
                  <Grid.Column width={3}>{r.name}</Grid.Column>
                  <Grid.Column width={5}>
                    {r.stock} {r.stock <= 1 ? r.unit : r.unit + "s"}
                    {r.stock > 5 ? (
                      ""
                    ) : (
                      <Label
                        style={{ left: 15 }}
                        color={r.stock > 5 ? "teal" : "red"}
                        tag
                      >
                        {r.stock > 5 ? "" : "Low"}
                      </Label>
                    )}
                  </Grid.Column>
                  <Grid.Column width={3}>
                    {r.pieceStock}{" "}
                    {r.pieceStock <= 1 ? r.pieceUnit : r.pieceUnit + "s"}
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Button
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit Product",
                          id: r.id,
                          feedback: addProductFunc,
                          productToEdit: {
                            name: r.name,
                            unit: r.unit,
                            pieces: r.pieces,
                            pieceUnit: r.pieceUnit,
                            sellingPrice: r.sellingPrice,
                            pieceSellingPrice: r.pieceSellingPrice,
                          },
                        })
                      }
                    >
                      {" "}
                      Edit
                      <Icon name="edit" style={{ marginLeft: "10px" }} />
                    </Button>
                    <ProductModal product={r} />
                  </Grid.Column>
                </Grid.Row>
              ))}
          </Grid>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default Products;
