import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

function Skelton() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Grid item xs={12} md={6} style={{ padding: "10px" }}>
        <Item>
          <Skeleton variant="rectangular" height={118} />
        </Item>
      </Grid>
      <Grid item xs={12} md={6} style={{ padding: "10px" }}>
        <Item>
          <Skeleton variant="rectangular" height={118} />
        </Item>
      </Grid>
      <Grid item xs={12} md={6} style={{ padding: "10px" }}>
        <Item>
          <Skeleton variant="rectangular" height={118} />
        </Item>
      </Grid>
      <Grid item xs={12} md={6} style={{ padding: "10px" }}>
        <Item>
          <Skeleton variant="rectangular" height={118} />
        </Item>
      </Grid>
    </>
  );
}

export default Skelton;
