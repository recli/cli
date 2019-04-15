import React from 'react';
import PropTypes from 'prop-types';
<% if (isCss) { %>import withStyles from 'isomorphic-style-loader/lib/withStyles';<% } %>
import BasicLayout from 'layouts/basic-layout';
// eslint-disable-next-line
import { actions } from 'store/index';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { Button } from 'antd';
<% if (isCss) { %>import s from './<%= name %>.css';<% } %>

const title = '<%= formatTitle(name) %>';

/**
 * Do not use state: state, cause it disable rendering optimizations
 * https://redux.js.org/basics/usage-with-react
 */
const mapStateToProps = state => ({
  wallets: state.wallets
});

<% if (isCss) { %>@withStyles(s)<% } %>
@connect(mapStateToProps)
class <%= formatClassName(name) %> extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.object,
  };

  render() {
    const { children, wallets } = this.props;
    return (
      <div <% if (isCss) { %>className={s.root}<% } %>>
        {children} {wallets}
      </div>
    );
  }
}

export default (context, params) => ({
  chunks: ['app'],
  title,
  component: (
    <BasicLayout title={title} params={params}>
      <<%= formatClassName(name) %> title={title} params={params} />
    </BasicLayout>
  ),
});
