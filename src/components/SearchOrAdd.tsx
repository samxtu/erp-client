import React from "react";
import {
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Search,
  Button,
  SearchProps,
} from "semantic-ui-react";

interface Props {
  handleSearch: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SearchProps
  ) => void;
  handleOpen: (open: boolean) => void;
  loading: boolean;
  title: string;
}

const SearchOrAdd = ({ handleSearch, handleOpen, loading, title }: Props) => {
  return (
    <Segment placeholder size="tiny">
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header icon>
              <Icon name="search" />
              Find {title}
            </Header>

            <Search
              showNoResults={false}
              placeholder={`Search ${title}s...`}
              onSearchChange={handleSearch}
            />
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name="world" />
              Add New {title}
            </Header>
            <Button loading={loading} onClick={() => handleOpen(true)} primary>
              Create
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default SearchOrAdd;
