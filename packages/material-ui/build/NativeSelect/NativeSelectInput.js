"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

/**
 * @ignore - internal component.
 */
var NativeSelectInput = _react.default.forwardRef(function NativeSelectInput(props, ref) {
  var classes = props.classes,
      className = props.className,
      disabled = props.disabled,
      IconComponent = props.IconComponent,
      inputRef = props.inputRef,
      variant = props.variant,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "className", "disabled", "IconComponent", "inputRef", "variant"]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("select", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, // TODO v5: merge root and select
    classes.select, className, disabled && classes.disabled, {
      filled: classes.filled,
      outlined: classes.outlined
    }[variant]),
    disabled: disabled,
    ref: inputRef || ref
  }, other)), props.multiple ? null : _react.default.createElement(IconComponent, {
    className: classes.icon
  }));
});

process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The CSS class name of the select element.
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the select will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon that displays the arrow.
   */
  IconComponent: _propTypes.default.elementType,

  /**
   * Use that prop to pass a ref callback to the native select element.
   * @deprecated
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /**
   * @ignore
   */
  multiple: _propTypes.default.bool,

  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: _propTypes.default.func,

  /**
   * The input value.
   */
  value: _propTypes.default.any,

  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
var _default = NativeSelectInput;
exports.default = _default;