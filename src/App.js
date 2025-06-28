import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import RedirectHandler from './pages/RedirectHandler';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  const [urls, setUrls] = useState([]);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
          <Button color="inherit" href="/">Shorten</Button>
          <Button color="inherit" href="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home setUrls={setUrls} />} />
          <Route path="/stats" element={<Statistics urls={urls} />} />
          <Route path="/:shortcode" element={<RedirectHandler urls={urls} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
