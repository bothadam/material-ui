import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import { elementAcceptingRef } from '@material-ui/utils';
import { fade } from '../styles/colorManipulator';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Grow from '../Grow';
import Popper from '../Popper';
import { useForkRef } from '../utils/reactHelpers';
import { useIsFocusVisible } from '../utils/focusVisible';
import useTheme from '../styles/useTheme';
export var styles = function styles(theme) {
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
      backgroundColor: fade(theme.palette.grey[700], 0.9),
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
    tooltipPlacementLeft: _defineProperty({
      transformOrigin: 'right center',
      margin: '0 24px '
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
    tooltipPlacementRight: _defineProperty({
      transformOrigin: 'left center',
      margin: '0 24px'
    }, theme.breakpoints.up('sm'), {
      margin: '0 14px'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
    tooltipPlacementTop: _defineProperty({
      transformOrigin: 'center bottom',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    }),

    /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
    tooltipPlacementBottom: _defineProperty({
      transformOrigin: 'center top',
      margin: '24px 0'
    }, theme.breakpoints.up('sm'), {
      margin: '14px 0'
    })
  };
};

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
      TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["children", "classes", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterTouchDelay", "id", "interactive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);

  var theme = useTheme();

  var _React$useState = React.useState(false),
      openState = _React$useState[0],
      setOpenState = _React$useState[1];

  var _React$useState2 = React.useState(0),
      forceUpdate = _React$useState2[1];

  var _React$useState3 = React.useState(),
      childNode = _React$useState3[0],
      setChildNode = _React$useState3[1];

  var ignoreNonTouchEvents = React.useRef(false);

  var _React$useRef = React.useRef(openProp != null),
      isControlled = _React$useRef.current;

  var defaultId = React.useRef();
  var closeTimer = React.useRef();
  var enterTimer = React.useRef();
  var leaveTimer = React.useRef();
  var touchTimer = React.useRef();
  React.useEffect(function () {
    process.env.NODE_ENV !== "production" ? warning(!(childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button'), ['Material-UI: you are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Place a `div` container on top of the element.'].join('\n')) : void 0;
  }, [isControlled, title, childNode]);
  React.useEffect(function () {
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
  React.useEffect(function () {
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

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState4 = React.useState(false),
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


  var handleOwnRef = useForkRef(React.useCallback(function (instance) {
    // #StrictMode ready
    setChildNode(ReactDOM.findDOMNode(instance));
  }, []), focusVisibleRef);
  var handleRef = useForkRef(children.ref, handleOwnRef);
  var open = isControlled ? openProp : openState; // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  } // For accessibility and SEO concerns, we render the title to the DOM node when
  // the tooltip is hidden. However, we have made a tradeoff when
  // `disableHoverListener` is set. This title logic is disabled.
  // It's allowing us to keep the implementation size minimal.
  // We are open to change the tradeoff.


  var shouldShowNativeTitle = !open && !disableHoverListener;

  var childrenProps = _extends({
    'aria-describedby': open ? id || defaultId.current : null,
    title: shouldShowNativeTitle && typeof title === 'string' ? title : null
  }, other, {}, children.props, {
    className: clsx(other.className, children.props.className)
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
  process.env.NODE_ENV !== "production" ? warning(!children.props.title, ['Material-UI: you have provided a `title` prop to the child of <Tooltip />.', "Remove this title prop `".concat(children.props.title, "` or the Tooltip component.")].join('\n')) : void 0;
  return React.createElement(React.Fragment, null, React.cloneElement(children, _extends({
    ref: handleRef
  }, childrenProps)), React.createElement(Popper, _extends({
    className: clsx(classes.popper, interactive && classes.popperInteractive),
    placement: placement,
    anchorEl: childNode,
    open: childNode ? open : false,
    id: childrenProps['aria-describedby'],
    transition: true
  }, interactiveWrapperListeners, PopperProps), function (_ref) {
    var placementInner = _ref.placement,
        TransitionPropsInner = _ref.TransitionProps;
    return React.createElement(TransitionComponent, _extends({
      timeout: theme.transitions.duration.shorter
    }, TransitionPropsInner, TransitionProps), React.createElement("div", {
      className: clsx(classes.tooltip, classes["tooltipPlacement".concat(capitalize(placementInner.split('-')[0]))], ignoreNonTouchEvents.current && classes.touch)
    }, title));
  }));
}

process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * Do not respond to focus events.
   */
  disableFocusListener: PropTypes.bool,

  /**
   * Do not respond to hover events.
   */
  disableHoverListener: PropTypes.bool,

  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener: PropTypes.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay: PropTypes.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay: PropTypes.number,

  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * This prop is used with aria-describedby to solve the accessibility issue.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,

  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   */
  interactive: PropTypes.bool,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay: PropTypes.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay: PropTypes.number,

  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,

  /**
   * Tooltip placement.
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: PropTypes.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes.node.isRequired,

  /**
   * The component used for the transition.
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Props applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiTooltip'
})(Tooltip);