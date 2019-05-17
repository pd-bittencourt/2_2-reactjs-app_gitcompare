import React from 'react';
import styled from 'styled-components';

import GlobalStyle from './styles/global';

const Title = styled.h1`
  color: #333;
  background: #ff3344;
  font-size: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Title>Hello</Title>
      </div>
    </>
  );
}

export default App;
