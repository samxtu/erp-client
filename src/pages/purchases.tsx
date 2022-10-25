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
  useGetAccountsQuery,
  useGetProductsQuery,
  useGetPurchasesQuery,
  useGetUsersQuery,
} from "../generated/graphql";
import AddEditPurchase from "../components/AddEditPurchase";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";
import PurchaseModal from "../components/PurchaseModal";
import { optionType } from "./users";
import { GiTakeMyMoney } from "react-icons/gi";

interface IPurchaseProps {}
var loading: boolean = false;

const Purchases: React.FC<IPurchaseProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addPurchaseFunc,
    purchaseToEdit: {
      purchaseDate: "",
      supplierId: 0,
      productId: 0,
      quantity: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      pieceSellingPrice: 0,
      receipt: "",
      accountId: 0,
    },
  };
  const [{ data, fetching }, reGetPurchases] = useGetPurchasesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [supplierArray, setSupplierArray] = useState<optionType[]>([]);
  const [productArray, setProductArray] = useState<optionType[]>([]);
  const [accountArray, setAccountArray] = useState<optionType[]>([]);

  const [suppliers] = useGetUsersQuery();
  const [products] = useGetProductsQuery();
  const [accounts] = useGetAccountsQuery();

  useEffect(() => {
    var array: any = [];
    if (suppliers.data)
      array = suppliers.data.getUsers
        .filter((r) => {
          return r.role.name === "Supplier";
        })
        .map((r) => {
          return { key: r.id, value: r.id, text: r.name };
        });
    setSupplierArray(array);
  }, [suppliers.fetching]);

  useEffect(() => {
    var array: any = [];
    if (products.data)
      array = products.data.getProducts.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
    setProductArray(array);
  }, [products.fetching]);

  useEffect(() => {
    var array: any = [];
    if (accounts.data)
      array = accounts.data.getAccounts.map((r) => {
        return { key: r.id, value: r.id, text: r.name };
      });
    setAccountArray(array);
  }, [accounts.fetching]);

  //   const [, deleteAsset] = useDeleteAssetMutation();
  //   async function deleteAssetFunc(id: number) {
  //     setopenDelete({ open: false, id: 1000000 });
  //     console.log("delete with id: ", id);
  //     const { error } = await deleteAsset({ id });
  //     if (error) seterror(error.message);
  //     reGetAssets({ requestPolicy: "network-only" });
  //   }

  async function addPurchaseFunc() {
    setopenEditModal(initialValueEdit);
    setTimeout(
      function() {
        reGetPurchases({ requestPolicy: "network-only" });
      }, 1000);
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
      {/* <DeleteConfirm
        item="Asset"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteAssetFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      /> */}
      <AddEditPurchase
        accounts={accountArray}
        products={productArray}
        suppliers={supplierArray}
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        purchaseToEdit={openEditModal.purchaseToEdit}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Purchase",
          })
        }
        title="Purchase"
      >
        <GiTakeMyMoney
          style={{ fontSize: "60px", padding: "0px", margin: "0px" }}
        />
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
            Purchases:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment style={{ marginTop: 0 }}>
          {!fetching && !data?.getPurchases && (
            <Segment>No purchase added!</Segment>
          )}
        </Segment>
        <Segment style={{ marginTop: 0, borderTop: "none" }}>
          <Grid columns={6} divided>
            {!fetching && data?.getPurchases && (
              <Grid.Row key="title">
                <Grid.Column width={2}>
                  <b>Date</b>
                </Grid.Column>
                <Grid.Column width={4}>
                  <b>Product</b>
                </Grid.Column>
                <Grid.Column width={2}>
                  <b>Quantity</b>
                </Grid.Column>
                <Grid.Column width={2}>
                  <b>Price/unit</b>
                </Grid.Column>
                <Grid.Column width={2}>
                  <b>Total price</b>
                </Grid.Column>
                <Grid.Column width={4}>
                  <b>Actions</b>
                </Grid.Column>
              </Grid.Row>
            )}
            {!fetching &&
              data?.getPurchases &&
              data.getPurchases.map((r) => (
                <Grid.Row key={JSON.stringify(r)}>
                  <Grid.Column width={2}>{new Date(parseInt(r.purchaseDate)).toDateString()}</Grid.Column>
                  <Grid.Column width={4}>{r.product.name}</Grid.Column>
                  <Grid.Column width={2}>
                    {r.quantity}
                    {r.quantity <= 1 ? r.product.unit : r.product.unit + "s"}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {"@" + r.purchasePrice + " Tsh"}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {r.purchasePrice * r.quantity + " Tsh"}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit Purchase",
                          id: r.id,
                          feedback: addPurchaseFunc,
                          purchaseToEdit: {
                            purchaseDate: r.purchaseDate,
                            supplierId: r.supplierId,
                            productId: r.product.id,
                            quantity: r.quantity,
                            purchasePrice: r.purchasePrice,
                            sellingPrice: r.sellingPrice,
                            pieceSellingPrice: r.pieceSellingPrice,
                            receipt: r.receipt,
                            accountId: r.accountId,
                          },
                        })
                      }
                    >
                      {" "}
                      Edit
                      <Icon name="edit" style={{ marginLeft: "10px" }} />
                    </Button>
                    <PurchaseModal purchase={r} />
                  </Grid.Column>
                </Grid.Row>
              )
              )
            }
          </Grid>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default Purchases;
