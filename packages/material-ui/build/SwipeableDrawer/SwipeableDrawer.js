"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("@material-ui/utils");

var _Drawer = _interopRequireWildcard(require("../Drawer/Drawer"));

var _transitions = require("../styles/transitions");

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _utils2 = require("../transitions/utils");

var _NoSsr = _interopRequireDefault(require("../NoSsr"));

var _SwipeArea = _interopRequireDefault(require("./SwipeArea"));

// This value is closed to what browsers are using internally to
// trigger a native scroll.
var UNCERTAINTY_THRESHOLD = 3; // px
// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.

var nodeThatClaimedTheSwipe = null; // Exported for test purposes.

function reset() {
  nodeThatClaimedTheSwipe = null;
}

function calculateCurrentX(anchor, touches) {
  return anchor === 'right' ? document.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}

function calculateCurrentY(anchor, touches) {
  return anchor === 'bottom' ? window.innerHeight - touches[0].clientY : touches[0].clientY;
}

function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}

function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(Math.max(open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate, 0), maxTranslate);
}

var disableSwipeToOpenDefault = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
var transitionDurationDefault = {
  enter: _transitions.duration.enteringScreen,
  exit: _transitions.duration.leavingScreen
};
var useEnhancedEffect = typeof window !== 'undefined' ? _react.default.useLayoutEffect : _react.default.useEffect;

var SwipeableDrawer = _react.default.forwardRef(function SwipeableDrawer(props, ref) {
  var _props$anchor = props.anchor,
      anchor = _props$anchor === void 0 ? 'left' : _props$anchor,
      _props$disableBackdro = props.disableBackdropTransition,
      disableBackdropTransition = _props$disableBackdro === void 0 ? false : _props$disableBackdro,
      _props$disableDiscove = props.disableDiscovery,
      disableDiscovery = _props$disableDiscove === void 0 ? false : _props$disableDiscove,
      _props$disableSwipeTo = props.disableSwipeToOpen,
      disableSwipeToOpen = _props$disableSwipeTo === void 0 ? disableSwipeToOpenDefault : _props$disableSwipeTo,
      hideBackdrop = props.hideBackdrop,
      _props$hysteresis = props.hysteresis,
      hysteresis = _props$hysteresis === void 0 ? 0.55 : _props$hysteresis,
      _props$minFlingVeloci = props.minFlingVelocity,
      minFlingVelocity = _props$minFlingVeloci === void 0 ? 400 : _props$minFlingVeloci,
      _props$ModalProps = props.ModalProps;
  _props$ModalProps = _props$ModalProps === void 0 ? {} : _props$ModalProps;
  var BackdropProps = _props$ModalProps.BackdropProps,
      ModalPropsProp = (0, _objectWithoutProperties2.default)(_props$ModalProps, ["BackdropProps"]),
      onClose = props.onClose,
      onOpen = props.onOpen,
      open = props.open,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      SwipeAreaProps = props.SwipeAreaProps,
      _props$swipeAreaWidth = props.swipeAreaWidth,
      swipeAreaWidth = _props$swipeAreaWidth === void 0 ? 20 : _props$swipeAreaWidth,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? transitionDurationDefault : _props$transitionDura,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'temporary' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["anchor", "disableBackdropTransition", "disableDiscovery", "disableSwipeToOpen", "hideBackdrop", "hysteresis", "minFlingVelocity", "ModalProps", "onClose", "onOpen", "open", "PaperProps", "SwipeAreaProps", "swipeAreaWidth", "transitionDuration", "variant"]);
  var theme = (0, _useTheme.default)();

  var _React$useState = _react.default.useState(false),
      maybeSwiping = _React$useState[0],
      setMaybeSwiping = _React$useState[1];

  var swipeInstance = _react.default.useRef({
    isSwiping: null
  });

  var swipeAreaRef = _react.default.useRef();

  var backdropRef = _react.default.useRef();

  var paperRef = _react.default.useRef();

  var touchDetected = _react.default.useRef(false);

  var openRef = _react.default.useRef(open); // Use a ref so the open value used is always up to date inside useCallback.


  useEnhancedEffect(function () {
    openRef.current = open;
  }, [open]);

  var setPosition = _react.default.useCallback(function (translate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$mode = options.mode,
        mode = _options$mode === void 0 ? null : _options$mode,
        _options$changeTransi = options.changeTransition,
        changeTransition = _options$changeTransi === void 0 ? true : _options$changeTransi;
    var anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    var rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
    var horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    var transform = horizontalSwipe ? "translate(".concat(rtlTranslateMultiplier * translate, "px, 0)") : "translate(0, ".concat(rtlTranslateMultiplier * translate, "px)");
    var drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    var transition = '';

    if (mode) {
      transition = theme.transitions.create('all', (0, _utils2.getTransitionProps)({
        timeout: transitionDuration
      }, {
        mode: mode
      }));
    }

    if (changeTransition) {
      drawerStyle.webkitTransition = transition;
      drawerStyle.transition = transition;
    }

    if (!disableBackdropTransition && !hideBackdrop) {
      var backdropStyle = backdropRef.current.style;
      backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);

      if (changeTransition) {
        backdropStyle.webkitTransition = transition;
        backdropStyle.transition = transition;
      }
    }
  }, [anchor, disableBackdropTransition, hideBackdrop, theme, transitionDuration]);

  var handleBodyTouchEnd = _react.default.useCallback(function (event) {
    if (!touchDetected.current) {
      return;
    }

    nodeThatClaimedTheSwipe = null;
    touchDetected.current = false;
    setMaybeSwiping(false); // The swipe wasn't started.

    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }

    swipeInstance.current.isSwiping = null;
    var anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    var horizontal = (0, _Drawer.isHorizontal)(anchor);
    var current;

    if (horizontal) {
      current = calculateCurrentX(anchorRtl, event.changedTouches);
    } else {
      current = calculateCurrentY(anchorRtl, event.changedTouches);
    }

    var startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    var maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    var currentTranslate = getTranslate(current, startLocation, openRef.current, maxTranslate);
    var translateRatio = currentTranslate / maxTranslate;

    if (openRef.current) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose();
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(0, {
          mode: 'exit'
        });
      }

      return;
    }

    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: 'enter'
      });
    }
  }, [anchor, hysteresis, minFlingVelocity, onClose, onOpen, setPosition, theme]);

  var handleBodyTouchMove = _react.default.useCallback(function (event) {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    }

    var anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    var horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    var currentX = calculateCurrentX(anchorRtl, event.touches);
    var currentY = calculateCurrentY(anchorRtl, event.touches); // We don't know yet.

    if (swipeInstance.current.isSwiping == null) {
      var dx = Math.abs(currentX - swipeInstance.current.startX);
      var dy = Math.abs(currentY - swipeInstance.current.startY); // We are likely to be swiping, let's prevent the scroll event on iOS.

      if (dx > dy) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }

      var definitelySwiping = horizontalSwipe ? dx > dy && dx > UNCERTAINTY_THRESHOLD : dy > dx && dy > UNCERTAINTY_THRESHOLD;

      if (definitelySwiping === true || (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)) {
        swipeInstance.current.isSwiping = definitelySwiping;

        if (!definitelySwiping) {
          handleBodyTouchEnd(event);
          return;
        } // Shift the starting point.


        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY; // Compensate for the part of the drawer displayed on touch start.

        if (!disableDiscovery && !openRef.current) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= swipeAreaWidth;
          } else {
            swipeInstance.current.startY -= swipeAreaWidth;
          }
        }
      }
    }

    if (!swipeInstance.current.isSwiping) {
      return;
    }

    var startLocation = horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY;
    var maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    var translate = getTranslate(horizontalSwipe ? currentX : currentY, startLocation, openRef.current, maxTranslate);

    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }

    var velocity = (translate - swipeInstance.current.lastTranslate) / (performance.now() - swipeInstance.current.lastTime) * 1e3; // Low Pass filter.

    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;
    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now(); // We are swiping, let's prevent the scroll event on iOS.

    if (event.cancelable) {
      event.preventDefault();
    }

    setPosition(translate);
  }, [setPosition, handleBodyTouchEnd, anchor, disableDiscovery, swipeAreaWidth, theme]);

  var handleBodyTouchStart = _react.default.useCallback(function (event) {
    // We are not supposed to handle this touch move.
    if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== swipeInstance.current) {
      return;
    }

    var anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    var horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    var currentX = calculateCurrentX(anchorRtl, event.touches);
    var currentY = calculateCurrentY(anchorRtl, event.touches);

    if (!openRef.current) {
      if (disableSwipeToOpen || event.target !== swipeAreaRef.current) {
        return;
      }

      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }

    nodeThatClaimedTheSwipe = swipeInstance.current;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;
    setMaybeSwiping(true);

    if (!openRef.current && paperRef.current) {
      // The ref may be null when a parent component updates while swiping.
      setPosition(getMaxTranslate(horizontalSwipe, paperRef.current) + (disableDiscovery ? 20 : -swipeAreaWidth), {
        changeTransition: false
      });
    }

    swipeInstance.current.velocity = 0;
    swipeInstance.current.lastTime = null;
    swipeInstance.current.lastTranslate = null;
    touchDetected.current = true;
  }, [setPosition, anchor, disableDiscovery, disableSwipeToOpen, swipeAreaWidth, theme]);

  _react.default.useEffect(function () {
    if (variant === 'temporary') {
      document.body.addEventListener('touchstart', handleBodyTouchStart);
      document.body.addEventListener('touchmove', handleBodyTouchMove, {
        passive: false
      });
      document.body.addEventListener('touchend', handleBodyTouchEnd);
      return function () {
        document.body.removeEventListener('touchstart', handleBodyTouchStart);
        document.body.removeEventListener('touchmove', handleBodyTouchMove, {
          passive: false
        });
        document.body.removeEventListener('touchend', handleBodyTouchEnd);
      };
    }

    return undefined;
  }, [variant, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);

  _react.default.useEffect(function () {
    return function () {
      // We need to release the lock.
      if (nodeThatClaimedTheSwipe === swipeInstance.current) {
        nodeThatClaimedTheSwipe = null;
      }
    };
  }, []);

  _react.default.useEffect(function () {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);

  var handleBackdropRef = _react.default.useCallback(function (instance) {
    // #StrictMode ready
    backdropRef.current = _reactDom.default.findDOMNode(instance);
  }, []);

  var handlePaperRef = _react.default.useCallback(function (instance) {
    // #StrictMode ready
    paperRef.current = _reactDom.default.findDOMNode(instance);
  }, []);

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Drawer.default, (0, _extends2.default)({
    open: variant === 'temporary' && maybeSwiping ? true : open,
    variant: variant,
    ModalProps: (0, _extends2.default)({
      BackdropProps: (0, _extends2.default)({}, BackdropProps, {
        ref: handleBackdropRef
      })
    }, ModalPropsProp),
    PaperProps: (0, _extends2.default)({}, PaperProps, {
      style: (0, _extends2.default)({
        pointerEvents: variant === 'temporary' && !open ? 'none' : ''
      }, PaperProps.style),
      ref: handlePaperRef
    }),
    anchor: anchor,
    transitionDuration: transitionDuration,
    onClose: onClose,
    ref: ref
  }, other)), !disableSwipeToOpen && variant === 'temporary' && _react.default.createElement(_NoSsr.default, null, _react.default.createElement(_SwipeArea.default, (0, _extends2.default)({
    anchor: anchor,
    ref: swipeAreaRef,
    width: swipeAreaWidth
  }, SwipeAreaProps))));
});

process.env.NODE_ENV !== "production" ? SwipeableDrawer.propTypes = {
  /**
   * @ignore
   */
  anchor: _propTypes.default.oneOf(['left', 'top', 'right', 'bottom']),

  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   */
  disableBackdropTransition: _propTypes.default.bool,

  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery: _propTypes.default.bool,

  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   */
  disableSwipeToOpen: _propTypes.default.bool,

  /**
   * @ignore
   */
  hideBackdrop: _propTypes.default.bool,

  /**
   * Affects how far the drawer must be opened/closed to change his state.
   * Specified as percent (0-1) of the width of the drawer
   */
  hysteresis: _propTypes.default.number,

  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   */
  minFlingVelocity: _propTypes.default.number,

  /**
   * @ignore
   */
  ModalProps: _propTypes.default.shape({
    BackdropProps: _propTypes.default.shape({
      component: _utils.elementTypeAcceptingRef
    })
  }),

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: _propTypes.default.func.isRequired,

  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: _propTypes.default.func.isRequired,

  /**
   * If `true`, the drawer is open.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * @ignore
   */
  PaperProps: _propTypes.default.shape({
    component: _utils.elementTypeAcceptingRef,
    style: _propTypes.default.object
  }),

  /**
   * Props applied to the swipe area element.
   */
  SwipeAreaProps: _propTypes.default.object,

  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth: _propTypes.default.number,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * @ignore
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var _default = SwipeableDrawer;
exports.default = _default;