import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  // get localStorage data and update state
  async componentDidMount() {
    this.setState({
      loading: false,
      repositories: await this.getLocalData(),
    });
  }

  handleAddRepository = async (e) => {
    const { repositoryInput, repositories } = this.state;
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      // get localStorage data
      const localData = await this.getLocalData();
      // set localstorage
      await localStorage.setItem('appData', JSON.stringify([...localData, repository]));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  // get localStorage data function
  getLocalData = async () => JSON.parse(await localStorage.getItem('appData')) || [];

  handleRemoveRepo = async (id) => {
    const { repositories } = this.state;
    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });
    await localStorage.setItem('appData', JSON.stringify(updatedRepositories));
  };

  render() {
    const {
      loading, repositoryError, repositoryInput, repositories,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={repositories} removeRepo={this.handleRemoveRepo} />
      </Container>
    );
  }
}

export default Main;
