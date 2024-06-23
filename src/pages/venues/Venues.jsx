import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Venues from "../../components/Venues";
import Loading from "../../components/loading/Loading";
import { VENUE_CATEGORIES } from "../../graphql/queries/venues";

const VenueCategries = () => {
  const [venueCategoryId, setVenueCategoryId] = useState("");
  const { loading, error, data } = useQuery(gql(VENUE_CATEGORIES), {
    onError: () => {},
  });

  const handleChange = (event) => {
    var venueCategoryId = event.target.value;
    setVenueCategoryId(venueCategoryId);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 150,
          marginBottom: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, marginRight: 5, textAlign: "center" }}
        >
          Categries
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Venue Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={venueCategoryId}
              label="Venue Categories"
              onChange={handleChange}
            >
              {data?.venueCategories?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      {venueCategoryId && <Venues categoryId={venueCategoryId} />}
    </Grid>
  );
};

export default VenueCategries;
