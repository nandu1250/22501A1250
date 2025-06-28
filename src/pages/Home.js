import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { generateShortCode, isValidUrl, isAlphanumeric } from '../utils/urlUtils';
import { logEvent } from '../middleware/logger';

const Home = ({ setUrls }) => {
  const [inputs, setInputs] = useState([{ longUrl: '', shortcode: '', validity: '' }]);

  const handleInputChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleAddField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: '', shortcode: '', validity: '' }]);
    }
  };

  const handleShorten = () => {
    const updatedUrls = [];
    for (let input of inputs) {
      if (!isValidUrl(input.longUrl)) {
        alert(`Invalid URL: ${input.longUrl}`);
        return;
      }
      if (input.shortcode && !isAlphanumeric(input.shortcode)) {
        alert(`Invalid shortcode: ${input.shortcode}`);
        return;
      }
      const code = input.shortcode || generateShortCode();
      const expiry = new Date(Date.now() + ((parseInt(input.validity) || 30) * 60000));
      const newShort = {
        id: code,
        longUrl: input.longUrl,
        shortUrl: `http://localhost:3000/${code}`,
        expiry: expiry.toISOString(),
        created: new Date().toISOString(),
        clicks: [],
      };
      updatedUrls.push(newShort);
      logEvent('URL_SHORTENED', newShort);
    }
    setUrls((prev) => [...prev, ...updatedUrls]);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5">URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} sx={{ mt: 1 }}>
          <Grid item xs={5}>
            <TextField
              label="Original URL"
              fullWidth
              value={input.longUrl}
              onChange={(e) => handleInputChange(i, 'longUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Validity (min)"
              fullWidth
              type="number"
              value={input.validity}
              onChange={(e) => handleInputChange(i, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={input.shortcode}
              onChange={(e) => handleInputChange(i, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAddField} sx={{ mt: 2 }}>+ Add another</Button>
      <Button variant="contained" onClick={handleShorten} sx={{ mt: 2, ml: 2 }}>Shorten URLs</Button>
    </Paper>
  );
};

export default Home;
