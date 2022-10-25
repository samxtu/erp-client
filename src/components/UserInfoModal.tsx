import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Icon,
  List,
  Modal,
  Segment,
  Placeholder,
  Table,
  Menu,
} from "semantic-ui-react";
import { GetUserQuery, useGetUserQuery } from "../generated/graphql";

function UserInfoModal(props: any) {
  const {
    name,
    // email,
    // phone,
    // location,
    // role,
    // branch,
    setUserInfoModal,
    id,
    userInfoModal,
  } = props;
  const [{ data, fetching }, reGetUser] = useGetUserQuery({
    variables: { id },
  });
  return (
    <Modal
      size="large"
      open={userInfoModal}
      onClose={() => setUserInfoModal(false)}
    >
      <Modal.Header>{name + " info:"}</Modal.Header>
      <Modal.Content scrolling>
        {fetching && (
          <Grid.Column>
            <Segment>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
            <Segment>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
            <Segment>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
            <Segment>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>
        )}
        {!fetching && data?.getUser && (
          <Table singleLine color="teal">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Associated Branch</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Phone number</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>{data?.getUser?.branch.name}</Table.Cell>
                <Table.Cell>{data?.getUser?.role.name}</Table.Cell>
                <Table.Cell>{data?.getUser?.email}</Table.Cell>
                <Table.Cell>{data?.getUser?.phone}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )}
        {!fetching && data?.getUser && data.getUser.role.name === "Admin" && (
          <>
            <Header as="h3" dividing>
              Admin sales
            </Header>
            <Table singleLine color="green">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sale date</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Sale price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.initiatedSales.map((sale) => (
                  <Table.Row>
                    <Table.Cell>{sale.saleDate}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>
                      {sale.quantity +
                        " " +
                        sale.product.unit +
                        " " +
                        sale.pieceQuantity +
                        " " +
                        sale.product.pieceUnit}
                    </Table.Cell>
                    <Table.Cell>
                      {sale.sellingPrice * sale.quantity +
                        sale.pieceSellingPrice * sale.pieceQuantity +
                        " Tsh"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
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
            <Header as="h3" dividing>
              Collected payments
            </Header>
            <Table singleLine color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Payment date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Client name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.collections.map((collection) => (
                  <Table.Row>
                    <Table.Cell>{collection.paymentDate}</Table.Cell>
                    <Table.Cell>{collection.ammount}</Table.Cell>
                    <Table.Cell>{collection.payer.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
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
            <Header as="h3" dividing>
              Approved expenses
            </Header>
            <Table singleLine color="violet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Expense date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Employee</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.authorizedExpenses.map((expense) => (
                  <Table.Row>
                    <Table.Cell>{expense.expenseDate}</Table.Cell>
                    <Table.Cell>{expense.ammount}</Table.Cell>
                    <Table.Cell>{expense.title}</Table.Cell>
                    <Table.Cell>{expense.staff.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
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
            <Header as="h3" dividing>
              Handled expenses
            </Header>
            <Table singleLine color="violet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Expense date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.receivedExpenses.map((expense) => (
                  <Table.Row>
                    <Table.Cell>{expense.expenseDate}</Table.Cell>
                    <Table.Cell>{expense.ammount}</Table.Cell>
                    <Table.Cell>{expense.title}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
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
        )}
        {!fetching && data?.getUser && data.getUser.role.name === "Employee" && (
          <>
            <Header as="h3" dividing>
              Employee sales
            </Header>
            <Table singleLine color="green">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sale date</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Sale price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.initiatedSales.map((sale) => (
                  <Table.Row>
                    <Table.Cell>{sale.saleDate}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>
                      {sale.quantity +
                        " " +
                        sale.product.unit +
                        " " +
                        sale.pieceQuantity +
                        " " +
                        sale.product.pieceUnit}
                    </Table.Cell>
                    <Table.Cell>
                      {sale.sellingPrice * sale.quantity +
                        sale.pieceSellingPrice * sale.pieceQuantity +
                        " Tsh"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
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
            <Header as="h3" dividing>
              Collected payments
            </Header>
            <Table singleLine color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Payment date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Client name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.collections.map((collection) => (
                  <Table.Row>
                    <Table.Cell>{collection.paymentDate}</Table.Cell>
                    <Table.Cell>{collection.ammount}</Table.Cell>
                    <Table.Cell>{collection.payer.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
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
            <Header as="h3" dividing>
              Handled expenses
            </Header>
            <Table singleLine color="violet">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Expense date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Authorizer</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.receivedExpenses.map((expense) => (
                  <Table.Row>
                    <Table.Cell>{expense.expenseDate}</Table.Cell>
                    <Table.Cell>{expense.ammount}</Table.Cell>
                    <Table.Cell>{expense.title}</Table.Cell>
                    <Table.Cell>{expense.authorizer.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
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
            <Header as="h3" dividing>
              Collected Incentives
            </Header>
            <Table singleLine color="brown">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product sold</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Incentive ammount</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.incentives.map((incentive) => (
                  <Table.Row>
                    <Table.Cell>{incentive.product.name}</Table.Cell>
                    <Table.Cell>
                      {incentive.quantity + " " + incentive.product.unit}
                    </Table.Cell>
                    <Table.Cell>{incentive.incentivePrice + " Tsh"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
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
        )}
        {!fetching && data?.getUser && data.getUser.role.name === "Customer" && (
          <>
            <Header as="h3" dividing>
              Customer purchases
            </Header>
            <Table singleLine color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Purchase date</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Purchase price</Table.HeaderCell>
                  <Table.HeaderCell>Payment made</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.servedSales.map((sale) => (
                  <Table.Row>
                    <Table.Cell>{sale.saleDate}</Table.Cell>
                    <Table.Cell>{sale.product.name}</Table.Cell>
                    <Table.Cell>
                      {sale.quantity +
                        " " +
                        sale.product.unit +
                        " " +
                        sale.pieceQuantity +
                        " " +
                        sale.product.pieceUnit}
                    </Table.Cell>
                    <Table.Cell>
                      {sale.sellingPrice * sale.quantity +
                        sale.pieceSellingPrice * sale.pieceQuantity +
                        " Tsh"}
                    </Table.Cell>
                    <Table.Cell>{sale.payed + " Tsh"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="5">
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
            <Header as="h3" dividing>
              Credit payments<Header as="h4" style={{float:"right", color: "green"}}>Wallet balance: {data.getUser.balance+" Tsh"}</Header>
            </Header>
            <Table singleLine color="green">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Payment date</Table.HeaderCell>
                  <Table.HeaderCell>Ammount</Table.HeaderCell>
                  <Table.HeaderCell>Collector name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.payments.map((payment) => (
                  <Table.Row>
                    <Table.Cell>{payment.paymentDate}</Table.Cell>
                    <Table.Cell>{payment.ammount}</Table.Cell>
                    <Table.Cell>{payment.collector.name}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
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
        )}
        {!fetching && data?.getUser && data.getUser.role.name === "Supplier" && (
          <>
            <Header as="h3" dividing>
              Supplied purchases
            </Header>
            <Table singleLine color="green">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Purchase date</Table.HeaderCell>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Purchase price</Table.HeaderCell>
                  {/* <Table.HeaderCell>Payment made</Table.HeaderCell> */}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data?.getUser?.suppliedPurchases.map((purchase) => (
                  <Table.Row>
                    <Table.Cell>{purchase.purchaseDate}</Table.Cell>
                    <Table.Cell>{purchase.product.name}</Table.Cell>
                    <Table.Cell>
                      {purchase.quantity + " " + purchase.product.unit}
                    </Table.Cell>
                    <Table.Cell>
                      {purchase.purchasePrice * purchase.quantity + " Tsh"}
                    </Table.Cell>
                    {/* <Table.Cell>{purchase.payed + " Tsh"}</Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
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
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setUserInfoModal(false)}>
          Done
        </Button>
        {/* <Button
          content="Close"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setUserInfoModal(false)}
          positive
        /> */}
      </Modal.Actions>
    </Modal>
  );
}

export default UserInfoModal;
