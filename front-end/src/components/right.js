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


function Right({ data, name }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [modalContent, setModalContent] = useState(''); // 모달 내용
  const rows = data.map((item, index) => ({
    id: item.q_id,
    q_try: item.q_try,
    d_id: item.d_id,
  }));

  // 모달 열기 함수
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 보기 버튼 클릭 시 모달 열기
  const handleViewButtonClick = (id) => {
    // id에 따른 내용 생성 또는 다른 작업 수행
    const content = data[id];
    openModal(content);
  };

const columns = [
  {
    field: 'id',
    headerName: 'Q_ID',
    flex: 1
  },
  {
    field: 'q_try',
    headerName: 'TRY',
    flex: 1
  },
  {
    field: 'd_id',
    headerName: 'D_ID',
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

export default Right;
