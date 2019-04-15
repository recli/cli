/// <reference types="react" />
import * as React from 'react';

export interface <%= formatClassName(name) %>Props {
  className?: string;
  onClick?: React.MouseEventHandler<any>;
  style?: React.CSSProperties;
}

declare const <%= formatClassName(name) %>: (props: <%= formatClassName(name) %>Props) => JSX.Element;

export default <%= formatClassName(name) %>;
