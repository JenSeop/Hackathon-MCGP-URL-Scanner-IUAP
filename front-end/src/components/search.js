import React, { useEffect, useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { getCsrf } from '../utils/getCsrf';

const Search = () => {
  const [url, setUrl] = useState('');

  const handleOnClick = async (e) => {
    e.preventDefault();
    const csrfToken = getCsrf();
    const data = {
      url: url,
      csrfToken: csrfToken,
    };

    try {
      const response = await axios.post("http://localhost:8003/analyze/engine/call/", data);
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
    }
  }

  const fetch_and_clean = (e) => {
    handleOnClick(e);
    setUrl('');
    window.location.reload();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    >
      <TextField
        variant="standard"
        id="search_url"
        placeholder="URL"
        color="secondary"
        InputProps={{
          sx: {
            color: 'white',
            marginTop: '-1vh',
            marginLeft: '20px',
            flex: 1,
            borderBottom: 0,
          },
        }}
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <IconButton
        color="secondary"
        sx={{
          p: '15px',
          marginLeft: '8px',
        }}
        aria-label="search"
        onClick={fetch_and_clean}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default Search;
