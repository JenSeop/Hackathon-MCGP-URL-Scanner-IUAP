import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Left from './components/left';
import Right from './components/right';
import axios from 'axios'; // Axios 라이브러리 import

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [display, setDisplay] = useState(window.innerWidth);
  const [left, setLeft] = useState([]); // 데이터를 저장할 상태 추가
  const [right, setRight] = useState([]); // 데이터를 저장할 상태 추가
  useEffect(() => {
    const fetchData = () => {
      const apiUrl1 = 'http://localhost:8003/analyze/all_data/';
      axios.get(apiUrl1)
        .then(response => {
          setLeft(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  
      const apiUrl2 = 'http://localhost:8003/analyze/all_queue/';
      axios.get(apiUrl2)
        .then(response => {
          setRight(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
  
    const intervalId = setInterval(fetchData, 7000);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <div
        style={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 500,
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <Left data={left} /> {/* 데이터를 Left 컴포넌트로 전달 */}
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Right data={right} /> {/* 데이터를 Left 컴포넌트로 전달 */}
        </div>
      </div>
    </Router>
  );
}

export default App;
