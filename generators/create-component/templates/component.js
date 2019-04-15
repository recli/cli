import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './<%= name %>.css';

@withStyles(s)
class <%= formatClassName(name) %> extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return <div className={s.root}>{children}</div>;
  }
}

export default <%= formatClassName(name) %>;
