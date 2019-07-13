import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { Container, LoadingIndicator } from './styles';

export default class Show extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repoName'),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  loading = () => {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    );
  };

  render() {
    const { navigation } = this.props;
    const htmlUrl = navigation.getParam('htmlUrl');

    return (
      <WebView
        source={{ uri: htmlUrl }}
        renderLoading={this.loading}
        startInLoadingState
      />
    );
  }
}
