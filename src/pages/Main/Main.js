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

  handleRemoveRepo = async (id) => {
    const { repositories } = this.state;
    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });
    await localStorage.setItem('appData', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepo = async (id) => {
    const { repositories } = this.state;
    this.setState({ loading: true });

    const repo = repositories.find(repository => repository.id === id);

    try {
      const { data } = await api.get(`/repos/${repo.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      const updatedRepositories = repositories.map((repository) => {
        if (repository.id === data.id) {
          return data;
        }
        return repository;
      });

      this.setState({
        // if repo has same id return new data, otherwise return repo
        repositories: updatedRepositories,
        repositoryError: false,
        loading: false,
      });

      await localStorage.setItem('appData', JSON.stringify(updatedRepositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  // get localStorage data function
  getLocalData = async () => JSON.parse(await localStorage.getItem('appData')) || [];

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
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Compare'}
          </button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepo={this.handleRemoveRepo}
          updateRepo={this.handleUpdateRepo}
        />
      </Container>
    );
  }
}

export default Main;
