import { Grid } from '@mui/material';
import React from 'react';

function Layout({ components, itemsInRow = 1, children }) {
  return (
    <Grid spacing={1} container>
      {components?.map((e) => {
        return (
          <Grid item lg={12 / itemsInRow}>
            {e}
          </Grid>
        );
      })}
    </Grid>
  );
}

export { Layout };
