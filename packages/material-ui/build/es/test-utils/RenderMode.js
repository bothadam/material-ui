import React from 'react';
import * as PropTypes from 'prop-types';
const Context = React.createContext();
/**
 * @ignore - internal component.
 */

export function RenderContext({
  children
}) {
  return React.createElement(Context.Provider, {
    value: "render"
  }, children);
}
process.env.NODE_ENV !== "production" ? RenderContext.propTypes = {
  children: PropTypes.node.isRequired
} : void 0;
export function useIsSsr() {
  return React.useContext(Context) === 'render';
}