import React, {useState} from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from './modal';


function Left({ data, name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const rows = data.map((item, index) => ({
    id: index,
    d_date: item.d_date.substring(0,10),
    d_data: item.d_data,
    d_status: item.d_status,
    d_url: item.d_url,
  }));

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewButtonClick = (id, d_status) => {
    const content = data[id];
    openModal(content);
  };

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 10
  },
  {
    field: 'd_url',
    headerName: 'URL',
    width: 180
  },
  {
    field: 'd_date',
    headerName: 'DATE',
    width: 100
  },
  {
    field: 'd_status',
    headerName: 'STATUS',
    width: 60
  },
  {
    field: '',
    headerName: 'INFO',
    width: 100,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleViewButtonClick(params.row.id)}
      >
        보기
      </Button>
    ),
  },
];


  const getJson = (apiRef) => {
    const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
    const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

    const data = filteredSortedRowIds.map((id) => {
      const row = {};
      visibleColumnsField.forEach((field) => {
        row[field] = apiRef.current.getCellParams(id, field).value;
      });
      return row;
    });

    return JSON.stringify(data, null, 2);
  };

  const exportBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  function JsonExportMenuItem(props) {
    const apiRef = useGridApiContext();

    const { hideMenu } = props;

    return (
      <MenuItem
        onClick={() => {
          const jsonString = getJson(apiRef);
          const blob = new Blob([jsonString], {
            type: 'text/json',
          });
          exportBlob(blob, `data.json`);

          hideMenu?.();
        }}
      >
        Export JSON
      </MenuItem>
    );
  }

  const csvOptions = { fileName: `data` };

  function CustomExportButton(props) {
    return (
      <GridToolbarExportContainer {...props}>
        <GridCsvExportMenuItem options={csvOptions} />
        <JsonExportMenuItem />
      </GridToolbarExportContainer>
    );
  }

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
      <CustomExportButton sx={{ marginLeft: 'auto', color: '#3F4659' }} />
      </GridToolbarContainer>
    );
  }

  const sortModel = [
    {
      field: 'id',
      sort: 'desc',
    },
  ];

  return (
    <div style={{ height: 'calc(90vh)', width: '55%', marginTop: '5vh' }}>
    <Paper elevation={3} style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="compact"
          slots={{ toolbar: CustomToolbar }}
          sortModel={sortModel}
          hideFooter={false}
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
        />
      </Paper>
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
}

export default Left;
