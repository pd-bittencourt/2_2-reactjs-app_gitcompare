import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`;

export const Form = styled.form`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 55px;
    padding: 0 20px;
    background: #fff;
    font-size: 18px;
    color: #444;
    border: 0;
    border-radius: 3px;
    transition: all 0.2s ease;

    box-shadow: ${props => (props.withError ? '0 0 0 3px #f00' : 0)};
  }
  button {
    font-size: 18px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    background: #63f5b8;
    color: #fff;
    font-weight: bold;
    border: 0;
    border-radius: 3px;
    transition: background 0.2s ease;
    &:hover {
      background: #63f5b899;
    }
  }
`;
