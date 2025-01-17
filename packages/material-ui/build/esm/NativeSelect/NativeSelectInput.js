import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
/**
 * @ignore - internal component.
 */

var NativeSelectInput = React.forwardRef(function NativeSelectInput(props, ref) {
  var classes = props.classes,
      className = props.className,
      disabled = props.disabled,
      IconComponent = props.IconComponent,
      inputRef = props.inputRef,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["classes", "className", "disabled", "IconComponent", "inputRef", "variant"]);

  return React.createElement(React.Fragment, null, React.createElement("select", _extends({
    className: clsx(classes.root, // TODO v5: merge root and select
    classes.select, className, disabled && classes.disabled, {
      filled: classes.filled,
      outlined: classes.outlined
    }[variant]),
    disabled: disabled,
    ref: inputRef || ref
  }, other)), props.multiple ? null : React.createElement(IconComponent, {
    className: classes.icon
  }));
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,

  /**
   * If `true`, the select will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType,

  /**
   * Use that prop to pass a ref callback to the native select element.
   * @deprecated
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * @ignore
   */
  multiple: PropTypes.bool,

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: PropTypes.func,

  /**
   * The input value.
   */
  value: PropTypes.any,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
export default NativeSelectInput;