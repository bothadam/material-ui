"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends8 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _transitions = require("../styles/transitions");

var _ClickAwayListener = _interopRequireDefault(require("../ClickAwayListener"));

var _helpers = require("../utils/helpers");

var _Grow = _interopRequireDefault(require("../Grow"));

var _SnackbarContent = _interopRequireDefault(require("../SnackbarContent"));

var styles = function styles(theme) {
  var top1 = {
    top: 8
  };
  var bottom1 = {
    bottom: 8
  };
  var right = {
    justifyContent: 'flex-end'
  };
  var left = {
    justifyContent: 'flex-start'
  };
  var top3 = {
    top: 24
  };
  var bottom3 = {
    bottom: 24
  };
  var right3 = {
    right: 24
  };
  var left3 = {
    left: 24
  };
  var center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return {
    /* Styles applied to the root element. */
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 8,
      right: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
    anchorOriginTopCenter: (0, _extends8.default)({}, top1, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({}, top3, {}, center))),

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
    anchorOriginBottomCenter: (0, _extends8.default)({}, bottom1, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({}, bottom3, {}, center))),

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
    anchorOriginTopRight: (0, _extends8.default)({}, top1, {}, right, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({
      left: 'auto'
    }, top3, {}, right3))),

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
    anchorOriginBottomRight: (0, _extends8.default)({}, bottom1, {}, right, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({
      left: 'auto'
    }, bottom3, {}, right3))),

    /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
    anchorOriginTopLeft: (0, _extends8.default)({}, top1, {}, left, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({
      right: 'auto'
    }, top3, {}, left3))),

    /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
    anchorOriginBottomLeft: (0, _extends8.default)({}, bottom1, {}, left, (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), (0, _extends8.default)({
      right: 'auto'
    }, bottom3, {}, left3)))
  };
};

exports.styles = styles;

var Snackbar = _react.default.forwardRef(function Snackbar(props, ref) {
  var action = props.action,
      _props$anchorOrigin = props.anchorOrigin;
  _props$anchorOrigin = _props$anchorOrigin === void 0 ? {
    vertical: 'bottom',
    horizontal: 'center'
  } : _props$anchorOrigin;
  var vertical = _props$anchorOrigin.vertical,
      horizontal = _props$anchorOrigin.horizontal,
      autoHideDuration = props.autoHideDuration,
      children = props.children,
      classes = props.classes,
      className = props.className,
      ClickAwayListenerProps = props.ClickAwayListenerProps,
      ContentProps = props.ContentProps,
      _props$disableWindowB = props.disableWindowBlurListener,
      disableWindowBlurListener = _props$disableWindowB === void 0 ? false : _props$disableWindowB,
      message = props.message,
      onClose = props.onClose,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      onMouseEnter = props.onMouseEnter,
      onMouseLeave = props.onMouseLeave,
      open = props.open,
      resumeHideDuration = props.resumeHideDuration,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Grow.default : _props$TransitionComp,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? {
    enter: _transitions.duration.enteringScreen,
    exit: _transitions.duration.leavingScreen
  } : _props$transitionDura,
      TransitionProps = props.TransitionProps,
      other = (0, _objectWithoutProperties2.default)(props, ["action", "anchorOrigin", "autoHideDuration", "children", "classes", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onClose", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  var timerAutoHide = _react.default.useRef();

  var _React$useState = _react.default.useState(true),
      exited = _React$useState[0],
      setExited = _React$useState[1]; // Timer that controls delay before snackbar auto hides


  var setAutoHideTimer = _react.default.useCallback(function (autoHideDurationParam) {
    var autoHideDurationBefore = autoHideDurationParam != null ? autoHideDurationParam : autoHideDuration;

    if (!onClose || autoHideDurationBefore == null) {
      return;
    }

    clearTimeout(timerAutoHide.current);
    timerAutoHide.current = setTimeout(function () {
      var autoHideDurationAfter = autoHideDurationParam != null ? autoHideDurationParam : autoHideDuration;

      if (!onClose || autoHideDurationAfter == null) {
        return;
      }

      onClose(null, 'timeout');
    }, autoHideDurationBefore);
  }, [autoHideDuration, onClose]);

  _react.default.useEffect(function () {
    if (open) {
      setAutoHideTimer();
    }

    return function () {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, setAutoHideTimer]); // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.


  var handlePause = function handlePause() {
    clearTimeout(timerAutoHide.current);
  }; // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.


  var handleResume = _react.default.useCallback(function () {
    if (autoHideDuration != null) {
      if (resumeHideDuration != null) {
        setAutoHideTimer(resumeHideDuration);
        return;
      }

      setAutoHideTimer(autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  var handleMouseEnter = function handleMouseEnter(event) {
    if (onMouseEnter) {
      onMouseEnter(event);
    }

    handlePause();
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    handleResume();
  };

  var handleClickAway = function handleClickAway(event) {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  var handleExited = function handleExited() {
    setExited(true);
  };

  var handleEnter = function handleEnter() {
    setExited(false);
  };

  _react.default.useEffect(function () {
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);
      return function () {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }

    return undefined;
  }, [disableWindowBlurListener, handleResume, open]); // So we only render active snackbars.


  if (!open && exited) {
    return null;
  }

  return _react.default.createElement(_ClickAwayListener.default, (0, _extends8.default)({
    onClickAway: handleClickAway
  }, ClickAwayListenerProps), _react.default.createElement("div", (0, _extends8.default)({
    className: (0, _clsx.default)(classes.root, classes["anchorOrigin".concat((0, _helpers.capitalize)(vertical)).concat((0, _helpers.capitalize)(horizontal))], className),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: ref
  }, other), _react.default.createElement(TransitionComponent, (0, _extends8.default)({
    appear: true,
    in: open,
    onEnter: (0, _helpers.createChainedFunction)(handleEnter, onEnter),
    onEntered: onEntered,
    onEntering: onEntering,
    onExit: onExit,
    onExited: (0, _helpers.createChainedFunction)(handleExited, onExited),
    onExiting: onExiting,
    timeout: transitionDuration,
    direction: vertical === 'top' ? 'down' : 'up'
  }, TransitionProps), children || _react.default.createElement(_SnackbarContent.default, (0, _extends8.default)({
    message: message,
    action: action
  }, ContentProps)))));
});

process.env.NODE_ENV !== "production" ? Snackbar.propTypes = {
  /**
   * The action to display.
   */
  action: _propTypes.default.node,

  /**
   * The anchor of the `Snackbar`.
   */
  anchorOrigin: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['left', 'center', 'right']).isRequired,
    vertical: _propTypes.default.oneOf(['top', 'bottom']).isRequired
  }),

  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   */
  autoHideDuration: _propTypes.default.number,

  /**
   * Replace the `SnackbarContent` component.
   */
  children: _propTypes.default.element,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: _propTypes.default.object,

  /**
   * Props applied to the [`SnackbarContent`](/api/snackbar-content/) element.
   */
  ContentProps: _propTypes.default.object,

  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   */
  disableWindowBlurListener: _propTypes.default.bool,

  /**
   * When displaying multiple consecutive Snackbars from a parent rendering a single
   * <Snackbar/>, add the key prop to ensure independent treatment of each message.
   * e.g. <Snackbar key={message} />, otherwise, the message may update-in-place and
   * features such as autoHideDuration may be canceled.
   */
  key: _propTypes.default.any,

  /**
   * The message to display.
   */
  message: _propTypes.default.node,

  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {object} event The event source of the callback
   * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired before the transition is entering.
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired when the transition has entered.
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired when the transition is entering.
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired before the transition is exiting.
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired when the transition has exited.
   */
  onExited: _propTypes.default.func,

  /**
   * Callback fired when the transition is exiting.
   */
  onExiting: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseLeave: _propTypes.default.func,

  /**
   * If true, `Snackbar` is open.
   */
  open: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: _propTypes.default.number,

  /**
   * The component used for the transition.
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  flip: false,
  name: 'MuiSnackbar'
})(Snackbar);

exports.default = _default;