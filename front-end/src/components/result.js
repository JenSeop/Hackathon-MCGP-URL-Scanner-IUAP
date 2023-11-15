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


function Result({ data, name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const rows = Object.keys(data).map((key) => ({
    engineName: key,
    method: data[key].method,
    result: data[key].result,
    category: data[key].category,
    engineNameInData: data[key].engine_name,
  }));

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewButtonClick = (id) => {
    const content = data[id];
    openModal(content);
  };


  const columns = [
    {
      field: 'engineName',
      headerName: 'Engine Name',
      flex: 1
    },
    {
      field: 'method',
      headerName: 'Method',
      flex: 1
    },
    {
      field: 'result',
      headerName: 'Result',
      flex: 1
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1
    },
    {
      field: 'engineName',
      headerName: 'Engine Name',
      flex: 1
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

export default Result;
