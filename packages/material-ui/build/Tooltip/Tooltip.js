"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _colorManipulator = require("../styles/colorManipulator");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _helpers = require("../utils/helpers");

var _Grow = _interopRequireDefault(require("../Grow"));

var _Popper = _interopRequireDefault(require("../Popper"));

var _reactHelpers = require("../utils/reactHelpers");

var _focusVisible = require("../utils/focusVisible");

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the Popper component. */
    popper: {
      zIndex: theme.zIndex.tooltip,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      flip: false // disable jss-rtl plugin

    },

    /* Styles applied to the Popper component if `interactive={true}`. */
    popperInteractive: {
      pointerEvents: 'auto'
    },

    /* Styles applied to the tooltip (label wrapper) element. */
    tooltip: {
      backgroundColor: (0, _colorManipulator.fade)(theme.palette.grey[700], 0.9),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      padding: '4px 8px',
      fontSize: theme.typography.pxToRem(10),
      lineHeight: "".concat(theme.typography.round(14 / 10), "em"),
      maxWidth: 300,
      wordWrap: 'break-word',
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
    touch: {
      padding: '8px 16px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: "".concat(theme.typography.round(16 / 14), "em"),
      fontWeight: theme.typography.fontWeightRegular
    },

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
    tooltipPlacementLeft: (0, _defineProperty2.default)({
      transformOrigin: 'right center',
      margin: '0 24px '
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: (0, _defineProperty2.default)({
      transformOrigin: 'left center',
      margin: '0 24px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: (0, _defineProperty2.default)({
      transformOrigin: 'center bottom',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: (0, _defineProperty2.default)({
      transformOrigin: 'center top',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};

exports.styles = styles;

function Tooltip(props) {
  var children = props.children,
      classes = props.classes,
      _props$disableFocusLi = props.disableFocusListener,
      disableFocusListener = _props$disableFocusLi === void 0 ? false : _props$disableFocusLi,
      _props$disableHoverLi = props.disableHoverListener,
      disableHoverListener = _props$disableHoverLi === void 0 ? false : _props$disableHoverLi,
      _props$disableTouchLi = props.disableTouchListener,
      disableTouchListener = _props$disableTouchLi === void 0 ? false : _props$disableTouchLi,
      _props$enterDelay = props.enterDelay,
      enterDelay = _props$enterDelay === void 0 ? 0 : _props$enterDelay,
      _props$enterTouchDela = props.enterTouchDelay,
      enterTouchDelay = _props$enterTouchDela === void 0 ? 700 : _props$enterTouchDela,
      id = props.id,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? false : _props$interactive,
      _props$leaveDelay = props.leaveDelay,
      leaveDelay = _props$leaveDelay === void 0 ? 0 : _props$leaveDelay,
      _props$leaveTouchDela = props.leaveTouchDelay,
      leaveTouchDelay = _props$leaveTouchDela === void 0 ? 1500 : _props$leaveTouchDela,
      onClose = props.onClose,
      onOpen = props.onOpen,
      openProp = props.open,
      _props$placement = props.placement,
      placement = _props$placement === void 0 ? 'bottom' : _props$placement,
      PopperProps = props.PopperProps,
      title = props.title,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? _Grow.default : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);
  var theme = (0, _useTheme.default)();

  var _React$useState = _react.default.useState(false),
      openState = _React$useState[0],
      setOpenState = _React$useState[1];

  var _React$useState2 = _react.default.useState(0),
      forceUpdate = _React$useState2[1];

  var _React$useState3 = _react.default.useState(),
      childNode = _React$useState3[0],
      setChildNode = _React$useState3[1];

  var ignoreNonTouchEvents = _react.default.useRef(false);

  var _React$useRef = _react.default.useRef(openProp != null),
      isControlled = _React$useRef.current;

  var defaultId = _react.default.useRef();

  var closeTimer = _react.default.useRef();

  var enterTimer = _react.default.useRef();

  var leaveTimer = _react.default.useRef();

  var touchTimer = _react.default.useRef();

  _react.default.useEffect(function () {
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button'), ['Material-UI: you are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Place a `div` container on top of the element.'].join('\n')) : void 0;
  }, [isControlled, title, childNode]);

  _react.default.useEffect(function () {
    // Fallback to this default id when possible.
    // Use the random value for client-side rendering only.
    // We can't use it server-side.
    if (!defaultId.current) {
      defaultId.current = "mui-tooltip-".concat(Math.round(Math.random() * 1e5));
    } // Rerender with defaultId and childNode.


    if (openProp) {
      forceUpdate(function (n) {
        return !n;
      });
    }
  }, [openProp]);

  _react.default.useEffect(function () {
    return function () {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(touchTimer.current);
    };
  }, []);

  var handleOpen = function handleOpen(event) {
    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    if (!isControlled && !openState) {
      setOpenState(true);
    }

    if (onOpen) {
      onOpen(event);
    }
  };

  var handleEnter = function handleEnter(event) {
    var childrenProps = children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (enterDelay) {
      event.persist();
      enterTimer.current = setTimeout(function () {
        handleOpen(event);
      }, enterDelay);
    } else {
      handleOpen(event);
    }
  };

  var _useIsFocusVisible = (0, _focusVisible.useIsFocusVisible)(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState4 = _react.default.useState(false),
      childIsFocusVisible = _React$useState4[0],
      setChildIsFocusVisible = _React$useState4[1];

  function handleBlur() {
    if (childIsFocusVisible) {
      setChildIsFocusVisible(false);
      onBlurVisible();
    }
  }

  var handleFocus = function handleFocus(event) {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    if (isFocusVisible(event)) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }

    var childrenProps = children.props;

    if (childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }
  };

  var handleClose = function handleClose(event) {
    if (!isControlled) {
      setOpenState(false);
    }

    if (onClose) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(function () {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  };

  var handleLeave = function handleLeave(event) {
    var childrenProps = children.props;

    if (event.type === 'blur') {
      if (childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }

      handleBlur(event);
    }

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (leaveDelay) {
      event.persist();
      leaveTimer.current = setTimeout(function () {
        handleClose(event);
      }, leaveDelay);
    } else {
      handleClose(event);
    }
  };

  var handleTouchStart = function handleTouchStart(event) {
    ignoreNonTouchEvents.current = true;
    var childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }

    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    clearTimeout(touchTimer.current);
    event.persist();
    touchTimer.current = setTimeout(function () {
      handleEnter(event);
    }, enterTouchDelay);
  };

  var handleTouchEnd = function handleTouchEnd(event) {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(function () {
      handleClose(event);
    }, leaveTouchDelay);
  }; // can be removed once we drop support for non ref forwarding class components


  var handleOwnRef = (0, _reactHelpers.useForkRef)(_react.default.useCallback(function (instance) {
    // #StrictMode ready
    setChildNode(_reactDom.default.findDOMNode(instance));
  }, []), focusVisibleRef);
  var handleRef = (0, _reactHelpers.useForkRef)(children.ref, handleOwnRef);
  var open = isControlled ? openProp : openState; // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  } // For accessibility and SEO concerns, we render the title to the DOM node when
  // the tooltip is hidden. However, we have made a tradeoff when
  // `disableHoverListener` is set. This title logic is disabled.
  // It's allowing us to keep the implementation size minimal.
  // We are open to change the tradeoff.


  var shouldShowNativeTitle = !open && !disableHoverListener;
  var childrenProps = (0, _extends2.default)({
    'aria-describedby': open ? id || defaultId.current : null,
    title: shouldShowNativeTitle && typeof title === 'string' ? title : null
  }, other, {}, children.props, {
    className: (0, _clsx.default)(other.className, children.props.className)
  });

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = handleEnter;
    childrenProps.onMouseLeave = handleLeave;
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = handleFocus;
    childrenProps.onBlur = handleLeave;
  }

  var interactiveWrapperListeners = interactive ? {
    onMouseOver: childrenProps.onMouseOver,
    onMouseLeave: childrenProps.onMouseLeave,
    onFocus: childrenProps.onFocus,
    onBlur: childrenProps.onBlur
  } : {};
  process.env.NODE_ENV !== "production" ? (0, _warning.default)(!children.props.title, ['Material-UI: you have provided a `title` prop to the child of <Tooltip />.', "Remove this title prop `".concat(children.props.title, "` or the Tooltip component.")].join('\n')) : void 0;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.cloneElement(children, (0, _extends2.default)({
    ref: handleRef
  }, childrenProps)), _react.default.createElement(_Popper.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.popper, interactive && classes.popperInteractive),
    placement: placement,
    anchorEl: childNode,
    open: childNode ? open : false,
    id: childrenProps['aria-describedby'],
    transition: true
  }, interactiveWrapperListeners, PopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return _react.default.createElement(TransitionComponent, (0, _extends2.default)({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), _react.default.createElement("div", {
      className: (0, _clsx.default)(classes.tooltip, classes["tooltipPlacement".concat((0, _helpers.capitalize)(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch)
    }, title));
  }));
}

process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  /**
   * Tooltip reference element.
   */
  children: _utils.elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * Do not respond to focus events.
   */
  disableFocusListener: _propTypes.default.bool,

  /**
   * Do not respond to hover events.
   */
  disableHoverListener: _propTypes.default.bool,

  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay: _propTypes.default.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay: _propTypes.default.number,

  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * This prop is used with aria-describedby to solve the accessibility issue.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,

  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   */
  interactive: _propTypes.default.bool,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay: _propTypes.default.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay: _propTypes.default.number,

  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: _propTypes.default.bool,

  /**
   * Tooltip placement.
   */
  placement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: _propTypes.default.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: _propTypes.default.node.isRequired,

  /**
   * The component used for the transition.
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTooltip'
})(Tooltip);

exports.default = _default;