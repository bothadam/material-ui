"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _InputBase = _interopRequireDefault(require("../InputBase"));

var _NotchedOutline = _interopRequireDefault(require("./NotchedOutline"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var styles = function styles(theme) {
  var borderColor = theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      '&:hover $notchedOutline': {
        borderColor: theme.palette.text.primary
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        '&:hover $notchedOutline': {
          borderColor: borderColor
        }
      },
      '&$focused $notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2
      },
      '&$error $notchedOutline': {
        borderColor: theme.palette.error.main
      },
      '&$disabled $notchedOutline': {
        borderColor: theme.palette.action.disabled
      }
    },

    /* Styles applied to the root element if the component is focused. */
    focused: {},

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {
      paddingLeft: 14
    },

    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {
      paddingRight: 14
    },

    /* Styles applied to the root element if `error={true}`. */
    error: {},

    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},

    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: '18.5px 14px',
      '&$marginDense': {
        paddingTop: 10.5,
        paddingBottom: 10.5
      }
    },

    /* Styles applied to the `NotchedOutline` element. */
    notchedOutline: {
      borderColor: borderColor
    },

    /* Styles applied to the `input` element. */
    input: {
      padding: '18.5px 14px'
    },

    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 10.5,
      paddingBottom: 10.5
    },

    /* Styles applied to the `input` element if `select={true}`. */
    inputSelect: {
      paddingRight: 24
    },

    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      padding: 0
    },

    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {
      paddingLeft: 0
    },

    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {
      paddingRight: 0
    }
  };
};

exports.styles = styles;

var OutlinedInput = _react.default.forwardRef(function OutlinedInput(props, ref) {
  var classes = props.classes,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$inputComponent = props.inputComponent,
      inputComponent = _props$inputComponent === void 0 ? 'input' : _props$inputComponent,
      _props$labelWidth = props.labelWidth,
      labelWidth = _props$labelWidth === void 0 ? 0 : _props$labelWidth,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      notched = props.notched,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type,
      other = (0, _objectWithoutProperties2.default)(props, ["classes", "fullWidth", "inputComponent", "labelWidth", "multiline", "notched", "type"]);
  return _react.default.createElement(_InputBase.default, (0, _extends2.default)({
    renderSuffix: function renderSuffix(state) {
      return _react.default.createElement(_NotchedOutline.default, {
        className: classes.notchedOutline,
        labelWidth: labelWidth,
        notched: typeof notched !== 'undefined' ? notched : Boolean(state.startAdornment || state.filled || state.focused)
      });
    },
    classes: (0, _extends2.default)({}, classes, {
      root: (0, _clsx.default)(classes.root, classes.underline),
      notchedOutline: null
    }),
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other));
});

process.env.NODE_ENV !== "production" ? OutlinedInput.propTypes = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: _propTypes.default.string,

  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * The CSS class name of the wrapper element.
   */
  className: _propTypes.default.string,

  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,

  /**
   * If `true`, the `input` element will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: _propTypes.default.node,

  /**
   * If `true`, the input will indicate an error. This is normally obtained via context from
   * FormControl.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * The component used for the native input.
   * Either a string to use a DOM element or a component.
   */
  inputComponent: _propTypes.default.elementType,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: _propTypes.default.object,

  /**
   * This prop can be used to pass a ref callback to the `input` element.
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /**
   * The width of the label.
   */
  labelWidth: _propTypes.default.number,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: _propTypes.default.oneOf(['dense', 'none']),

  /**
   * If `true`, a textarea element will be rendered.
   */
  multiline: _propTypes.default.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: _propTypes.default.bool,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   */
  onChange: _propTypes.default.func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: _propTypes.default.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: _propTypes.default.bool,

  /**
   * If `true`, the `input` element will be required.
   */
  required: _propTypes.default.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: _propTypes.default.node,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: _propTypes.default.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any
} : void 0;
OutlinedInput.muiName = 'Input';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiOutlinedInput'
})(OutlinedInput);

exports.default = _default;