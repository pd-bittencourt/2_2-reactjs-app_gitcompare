import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 24px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
    small {
      font-weight: normal;
      font-size: 12px;
      color: #999;
      font-style: italic;
    }
  }

  .button-group {
    display: flex;
  }

  button {
    flex-grow: 1;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 10px;
    margin: 10px;
    transition: all 0.2s ease;
    &:nth-child(2n-1) {
      background: #638a9e;
      &:hover {
        background: #638a9ecc;
      }
    }
    &:nth-child(2n) {
      background: #e33338;
      margin-left: 0;
      &:hover {
        background: #e33338cc;
      }
    }
  }
`;
