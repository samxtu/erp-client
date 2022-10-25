import React, { useEffect } from "react";
import { Button, Header, Icon, List, Modal } from "semantic-ui-react";

function SaleModal(props: any) {
  const {
    name,
    unit,
    stock,
    pieces,
    pieceUnit,
    pieceStock,
    pieceSellingPrice,
    sellingPrice,
  } = props.sale;
  return (
    <Modal
      trigger={
        <Button
          secondary
          style={{ marginLeft: "0px" }}
          onClick={() => console.log("props: ", props)}
        >
          {" "}
          Info
          <Icon name="info" style={{ marginLeft: "10px" }} />
        </Button>
      }
      header={name + " details:"}
      content={
        <List>
          <List.Item as="h2" key="stock">
            <Header as="a">
              {"Stock: " +
                stock +
                " " +
                unit +
                " and " +
                pieceStock +
                " " +
                pieceUnit}
            </Header>
          </List.Item>
          <List.Item as="h2" key="unitToSubunit">
            <Header as="a">
              {"1 " + unit + " has " + pieces + " " + pieceUnit}
            </Header>
          </List.Item>
          <List.Item as="h2" key="unit">
            <Header as="a">
              {"1 " + unit + " sells at " + sellingPrice + " Tsh"}
            </Header>
          </List.Item>
          <List.Item as="h2" key="subunit">
            <Header as="a">
              {"1 " + pieceUnit + " sells at " + pieceSellingPrice + " Tsh"}
            </Header>
          </List.Item>
        </List>
      }
      actions={[{ key: "done", content: "Close", positive: true }]}
      style={{ padding: "20px" }}
    />
  );
}

export default SaleModal;
