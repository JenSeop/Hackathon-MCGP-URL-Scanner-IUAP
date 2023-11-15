import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import Search from '../components/search';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#181E26',
};

const typographyBoxStyle1 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 600,
  marginBottom: '2vh'
};

const typographyBoxStyle2 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 600,
  marginBottom: '10vh'
};

const typographyBoxStyle3 = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 600,
  marginTop: '2vh'
};

const paperContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 600,
};

const Home = () => {
  return (
    <Box style={containerStyle}>
      <Box color="#9CB7EB" sx={typographyBoxStyle1}>
        <Typography variant="h3" align="center" fontWeight="bold">
          MCPG
        </Typography>
      </Box>
      <Box color="white" sx={typographyBoxStyle2}>
        <Typography variant="h5" align="center" fontWeight="bold">
          메타 방범대
        </Typography>
      </Box>
      <Box sx={paperContainerStyle}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: '30px',
            textAlign: 'center',
            backgroundColor: '#3F4659',
          }}
        >
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Search />
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box color="#455167" sx={typographyBoxStyle3}>
        <Typography variant="body1" align="center">
          KISIA 1ST HACKATHON
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;