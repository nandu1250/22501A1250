import React from 'react';
import { Paper, Typography, List, ListItem, Divider } from '@mui/material';

const Statistics = ({ urls }) => {
  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5">URL Statistics</Typography>
      <List>
        {urls.map((url) => (
          <React.Fragment key={url.id}>
            <ListItem>
              <div>
                <Typography><strong>Short:</strong> <a href={url.shortUrl}>{url.shortUrl}</a></Typography>
                <Typography><strong>Original:</strong> {url.longUrl}</Typography>
                <Typography><strong>Expiry:</strong> {new Date(url.expiry).toLocaleString()}</Typography>
                <Typography><strong>Clicks:</strong> {url.clicks.length}</Typography>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default Statistics;
