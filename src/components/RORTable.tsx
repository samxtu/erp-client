import React, { useEffect, useState } from "react";
import { Icon, Menu, Table, Button, Message } from "semantic-ui-react";
import { useDeleteRorMutation, useGetRoRsQuery } from "../generated/graphql";
import DeleteConfirm from "./DeleteConfirm";

const TableExamplePagination = ({
  update,
  edit,
}: {
  update: number;
  edit: any;
}) => {
  const [openDelete, setopenDelete] = useState({ open: false, id: 1000000 });
  const [error, seterror] = useState("");
  const [, deleteROR] = useDeleteRorMutation();
  const [{ data: rorlist }, reGetRors] = useGetRoRsQuery({
    requestPolicy: "cache-and-network"
  });
  async function deleteRorFunc(id: number) {
    setopenDelete({ open: false, id:1000000});
    console.log("delete with id: ", id);
    const { error } = await deleteROR({ id });
    if (error) seterror(error.message);
    reGetRors({ requestPolicy: "network-only" });
  }
  useEffect(() => {
    console.log("updating table");
    reGetRors();
  }, [update, reGetRors]);
  return (
    <>
      {" "}
      <DeleteConfirm
        item="Asset"
        open={openDelete.open}
        id={openDelete.id!}
        feedback={deleteRorFunc}
        nofeedback={() => setopenDelete({ open: false, id: 1000000 })}
      />
      {error === "" ? null : (
        <Message negative>
          <Message.Header>{error}</Message.Header>
        </Message>
      )}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Buying price</Table.HeaderCell>
            <Table.HeaderCell>Selling price</Table.HeaderCell>
            <Table.HeaderCell>Pieces</Table.HeaderCell>
            <Table.HeaderCell>ROR</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rorlist?.getRORs &&
            rorlist.getRORs.map((r) => (
              <Table.Row key={r.id}>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>{r.buying}</Table.Cell>
                <Table.Cell>
                  {r.selling}
                  {r.pieces! > 0 ? "@piece" : ""}
                </Table.Cell>
                <Table.Cell>{r.pieces! > 0 ? r.pieces : "None"}</Table.Cell>
                <Table.Cell>
                  {r.pieces! > 1
                    ? Math.round(
                        ((r.pieces! * r.selling - r.buying) * 100) / r.buying
                      )
                    : Math.round(((r.selling - r.buying) * 100) / r.buying)}
                  %
                </Table.Cell>
                <Table.Cell>
                  {/* <Button
                    style={{ margin: "auto" }}
                    onClick={() =>
                      edit({
                        id: r.id,
                        rorToEdit: {
                          name: r.name,
                          buying: r.buying,
                          pieces: r.pieces,
                          selling: r.selling,
                        },
                      })
                    }
                  >
                    <Icon name="edit" />
                  </Button> */}
                  <Button
                    secondary
                    style={{ margin: "auto", marginLeft: "10px" }}
                    onClick={() => setopenDelete({ open: true, id: r.id })}
                  >
                    <Icon name="delete" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a" disabled>
                  1
                </Menu.Item>
                <Menu.Item as="a" icon disabled>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default TableExamplePagination;
