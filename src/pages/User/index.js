import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingIndicator,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: false,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadMore();
  }

  loadMore = async () => {
    const { stars, page, loading } = this.state;

    if (loading) return;
    if (!page) return;

    this.setState({ loading: true });

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
        per_page: 10,
      },
    });

    this.setState({
      stars: [...stars, ...response.data],
      page: response.data.length < 10 ? null : page + 1,
      loading: false,
    });
  };

  refreshList = async () => {
    await this.setState({
      stars: [],
      page: 1,
      refreshing: true,
    });

    await this.loadMore();

    this.setState({ refreshing: false });
  };

  handleShow = (repoName, htmlUrl) => {
    const { navigation } = this.props;

    navigation.navigate('Show', { repoName, htmlUrl });
  };

  renderFooter = () => {
    const { loading, refreshing } = this.state;

    if (!loading || refreshing) return null;

    return <LoadingIndicator />;
  };

  render() {
    const { navigation } = this.props;
    const { stars, refreshing } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred
              onPress={() => this.handleShow(item.full_name, item.html_url)}
            >
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.refreshList}
          refreshing={refreshing}
        />
      </Container>
    );
  }
}
