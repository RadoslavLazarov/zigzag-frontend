import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
} from "@mui/material";

import { VENUES_BY_CATEGORY_ID } from "../graphql/queries/venues";

const Venues = ({ categoryId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allItems, setAllItems] = useState([]);
  const [pageCursors, setPageCursors] = useState([null]);

  const { loading, error, data, fetchMore } = useQuery(
    gql(VENUES_BY_CATEGORY_ID),
    {
      variables: { id: categoryId, first: rowsPerPage, after: null },
      notifyOnNetworkStatusChange: true,
    },
    {
      onError: () => {},
    }
  );

  const handleChangePage = (event, newPage) => {
    if (newPage > page && data.venuesByCategoryId.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          first: rowsPerPage,
          after: data.venuesByCategoryId.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            ...fetchMoreResult,
            venuesByCategoryId: {
              ...fetchMoreResult.venuesByCategoryId,
              edges: [
                // ...prevResult.venuesByCategoryId.edges,
                ...fetchMoreResult.venuesByCategoryId.edges,
              ],
            },
          };
        },
      });
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setAllItems([]);
    setPageCursors([null]);
    fetchMore({
      variables: {
        first: newRowsPerPage,
        after: null,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const newItems =
        page === 0
          ? data.venuesByCategoryId.edges
          : [...allItems, ...data.venuesByCategoryId.edges];
      setAllItems(newItems);

      const newPageCursors = [...pageCursors];
      if (
        data.venuesByCategoryId.pageInfo.endCursor &&
        !newPageCursors.includes(data.venuesByCategoryId.pageInfo.endCursor)
      ) {
        newPageCursors[page + 1] = data.venuesByCategoryId.pageInfo.endCursor;
        setPageCursors(newPageCursors);
      }
    }
  }, [data]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ node }) => (
                <TableRow key={node.id}>
                  <TableCell>{node.id}</TableCell>
                  <TableCell>{node.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.venuesByCategoryId?.totalCount || -1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Venues;
