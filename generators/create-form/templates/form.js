import React from 'react';
import PropTypes from 'prop-types';
<% if (isCss) { %>import withStyles from 'isomorphic-style-loader/lib/withStyles';<% } %>

import BasicLayout from 'layouts/basic-layout';
import { connect } from 'react-redux';

import FormBlock from 'components/block/form-block';
import { Input } from 'antd';
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
    // eslint-disable-next-line
    params: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // this.setState({
    //   status: props.params.status,
    // });
  }

  render() {
    return (
      <FormBlock.Container>
        <FormBlock
          title="Bank Requisites"
          details="Fields are required, it is necessary to establish contact with the bank"
        >
          <FormBlock.Item label="Name" extra="Bank accaunt owner’s name">
            <Input />
          </FormBlock.Item>
        </FormBlock>
        <FormBlock
          title="Assets"
          details="Fields are required, it is necessary to establish contact with the bank"
        >
          <FormBlock.Item label="Asset Type">
            <Input />
          </FormBlock.Item>
        </FormBlock>
        <FormBlock.Footer>
          <FormBlock.Button>Back</FormBlock.Button>
          <FormBlock.Button type="primary">Add</FormBlock.Button>
        </FormBlock.Footer>
      </FormBlock.Container>
    );
  }
}

export default (context, params) => ({
  chunks: ['app'],
  title,
  component: (
    <BasicLayout title={title} params={params || {}}>
      <<%= formatClassName(name) %> title={title} params={params || {}} />
    </BasicLayout>
  ),
});
