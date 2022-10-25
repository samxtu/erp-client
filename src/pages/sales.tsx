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
  useGetSalesQuery,
  useGetUsersQuery,
} from "../generated/graphql";
import AddEditSale from "../components/AddEditSale";
import SearchOrAdd from "../components/SearchOrAdd";
import Placeholder from "../components/Placeholder";
import SaleModal from "../components/SaleModal";
import { optionType } from "./users";
import { TiShoppingCart } from "react-icons/ti";

interface ISaleProps {}
var loading: boolean = false;

const Sales: React.FC<ISaleProps> = () => {
  const initialValueEdit = {
    open: false,
    title: "",
    id: 1000000,
    feedback: addSaleFunc,
    saleToEdit: {
      saleDate: "",
      sellerId: 0,
      productId: 0,
      quantity: 0,
      sellingPrice: 0,
      clientId: 0,
      pieceSellingPrice: 0,
      payed: 0,
      accountId: 0,
      pieceQuantity: 0,
    },
  };
  const [{ data, fetching }, reGetSales] = useGetSalesQuery({
    requestPolicy: "cache-and-network",
  });
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [openEditModal, setopenEditModal] = useState(initialValueEdit);
  const [error, seterror] = useState("");
  const [search, setsearch] = useState("");
  const [sellerArray, setSellerArray] = useState<optionType[]>([]);
  const [productArray, setProductArray] = useState<optionType[]>([]);
  const [accountArray, setAccountArray] = useState<optionType[]>([]);

  const [sellers] = useGetUsersQuery();
  const [products] = useGetProductsQuery();
  const [accounts] = useGetAccountsQuery();

  useEffect(() => {
    var array: any = [];
    if (sellers.data)
      array = sellers.data.getUsers
        .filter((r) => {
          return r.role.name === "Employee";
        })
        .map((r) => {
          return { key: r.id, value: r.id, text: r.name };
        });
    setSellerArray(array);
  }, [sellers.fetching]);

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

  async function addSaleFunc() {
    setopenEditModal(initialValueEdit);
    setTimeout(
      function() {
        reGetSales({ requestPolicy: "network-only" });
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
      <AddEditSale
        accounts={accountArray}
        products={productArray}
        sellers={sellerArray}
        open={openEditModal.open}
        header={openEditModal.title}
        feedback={openEditModal.feedback}
        id={openEditModal.id}
        nofeedback={() => setopenEditModal(initialValueEdit)}
        saleToEdit={openEditModal.saleToEdit}
      />

      <SearchOrAdd
        loading={loading}
        handleSearch={handleSearch}
        handleOpen={(open: boolean) =>
          setopenEditModal({
            ...initialValueEdit,
            open: open,
            title: "Add Sale",
          })
        }
        title="Sale"
      >
        <TiShoppingCart
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
            Sales:{" "}
          </span>
          <span style={{ fontSize: "1em" }}>{search}</span>
        </Segment>
        {fetching && <Placeholder lines={[1, 1, 1, 1, 1, 1, 11, 1]} />}
        <Segment style={{ marginTop: 0 }}>
          {!fetching && !data?.getSales && (
            <Segment>No Sale added!</Segment>
          )}
        </Segment>
        <Segment style={{ marginTop: 0, borderTop: "none" }}>
          <Grid columns={6} divided>
            {!fetching && data?.getSales && (
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
              data?.getSales &&
              data.getSales.map((r) => (
                <Grid.Row key={JSON.stringify(r)}>
                  <Grid.Column width={2}>{new Date(parseInt(r.saleDate)).toDateString()}</Grid.Column>
                  <Grid.Column width={4}>{r.product.name}</Grid.Column>
                  <Grid.Column width={2}>
                    {r.quantity}
                    {r.quantity <= 1 ? r.product.unit : r.product.unit + "s"}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {"@" + r.sellingPrice + " Tsh"}
                  </Grid.Column>
                  <Grid.Column width={2}>
                    {r.sellingPrice * r.quantity + " Tsh"}
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button
                      onClick={() =>
                        setopenEditModal({
                          open: true,
                          title: "Edit sale",
                          id: r.id,
                          feedback: addSaleFunc,
                          saleToEdit: {
                            saleDate: r.saleDate,
                            sellerId: r.seller.id,
                            productId: r.product.id,
                            quantity: r.quantity,
                            payed: r.payed,
                            sellingPrice: r.sellingPrice,
                            pieceSellingPrice: r.pieceSellingPrice,
                            accountId: r.account.id,
                            clientId: r.client.id,
                            pieceQuantity: r.pieceQuantity
                          },
                        })
                      }
                    >
                      {" "}
                      Edit
                      <Icon name="edit" style={{ marginLeft: "10px" }} />
                    </Button>
                    <SaleModal Sale={r} />
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

export default Sales;
