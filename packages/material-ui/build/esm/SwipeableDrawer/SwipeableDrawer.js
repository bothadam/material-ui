import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import Drawer, { getAnchor, isHorizontal } from '../Drawer/Drawer';
import { duration } from '../styles/transitions';
import useTheme from '../styles/useTheme';
import { getTransitionProps } from '../transitions/utils';
import NoSsr from '../NoSsr';
import SwipeArea from './SwipeArea'; // This value is closed to what browsers are using internally to
// trigger a native scroll.

var UNCERTAINTY_THRESHOLD = 3; // px
// We can only have one node at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.

var nodeThatClaimedTheSwipe = null; // Exported for test purposes.

export function reset() {
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
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
var useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var SwipeableDrawer = React.forwardRef(function SwipeableDrawer(props, ref) {
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
      ModalPropsProp = _objectWithoutProperties(_props$ModalProps, ["BackdropProps"]),
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
      other = _objectWithoutProperties(props, ["anchor", "disableBackdropTransition", "disableDiscovery", "disableSwipeToOpen", "hideBackdrop", "hysteresis", "minFlingVelocity", "ModalProps", "onClose", "onOpen", "open", "PaperProps", "SwipeAreaProps", "swipeAreaWidth", "transitionDuration", "variant"]);

  var theme = useTheme();

  var _React$useState = React.useState(false),
      maybeSwiping = _React$useState[0],
      setMaybeSwiping = _React$useState[1];

  var swipeInstance = React.useRef({
    isSwiping: null
  });
  var swipeAreaRef = React.useRef();
  var backdropRef = React.useRef();
  var paperRef = React.useRef();
  var touchDetected = React.useRef(false);
  var openRef = React.useRef(open); // Use a ref so the open value used is always up to date inside useCallback.

  useEnhancedEffect(function () {
    openRef.current = open;
  }, [open]);
  var setPosition = React.useCallback(function (translate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$mode = options.mode,
        mode = _options$mode === void 0 ? null : _options$mode,
        _options$changeTransi = options.changeTransition,
        changeTransition = _options$changeTransi === void 0 ? true : _options$changeTransi;
    var anchorRtl = getAnchor(theme, anchor);
    var rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
    var horizontalSwipe = isHorizontal(anchor);
    var transform = horizontalSwipe ? "translate(".concat(rtlTranslateMultiplier * translate, "px, 0)") : "translate(0, ".concat(rtlTranslateMultiplier * translate, "px)");
    var drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    var transition = '';

    if (mode) {
      transition = theme.transitions.create('all', getTransitionProps({
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
  var handleBodyTouchEnd = React.useCallback(function (event) {
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
    var anchorRtl = getAnchor(theme, anchor);
    var horizontal = isHorizontal(anchor);
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
  var handleBodyTouchMove = React.useCallback(function (event) {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    }

    var anchorRtl = getAnchor(theme, anchor);
    var horizontalSwipe = isHorizontal(anchor);
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
  var handleBodyTouchStart = React.useCallback(function (event) {
    // We are not supposed to handle this touch move.
    if (nodeThatClaimedTheSwipe !== null && nodeThatClaimedTheSwipe !== swipeInstance.current) {
      return;
    }

    var anchorRtl = getAnchor(theme, anchor);
    var horizontalSwipe = isHorizontal(anchor);
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
  React.useEffect(function () {
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
  React.useEffect(function () {
    return function () {
      // We need to release the lock.
      if (nodeThatClaimedTheSwipe === swipeInstance.current) {
        nodeThatClaimedTheSwipe = null;
      }
    };
  }, []);
  React.useEffect(function () {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);
  var handleBackdropRef = React.useCallback(function (instance) {
    // #StrictMode ready
    backdropRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  var handlePaperRef = React.useCallback(function (instance) {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  return React.createElement(React.Fragment, null, React.createElement(Drawer, _extends({
    open: variant === 'temporary' && maybeSwiping ? true : open,
    variant: variant,
    ModalProps: _extends({
      BackdropProps: _extends({}, BackdropProps, {
        ref: handleBackdropRef
      })
    }, ModalPropsProp),
    PaperProps: _extends({}, PaperProps, {
      style: _extends({
        pointerEvents: variant === 'temporary' && !open ? 'none' : ''
      }, PaperProps.style),
      ref: handlePaperRef
    }),
    anchor: anchor,
    transitionDuration: transitionDuration,
    onClose: onClose,
    ref: ref
  }, other)), !disableSwipeToOpen && variant === 'temporary' && React.createElement(NoSsr, null, React.createElement(SwipeArea, _extends({
    anchor: anchor,
    ref: swipeAreaRef,
    width: swipeAreaWidth
  }, SwipeAreaProps))));
});
process.env.NODE_ENV !== "production" ? SwipeableDrawer.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),

  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   */
  disableBackdropTransition: PropTypes.bool,

  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   */
  disableDiscovery: PropTypes.bool,

  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   */
  disableSwipeToOpen: PropTypes.bool,

  /**
   * @ignore
   */
  hideBackdrop: PropTypes.bool,

  /**
   * Affects how far the drawer must be opened/closed to change his state.
   * Specified as percent (0-1) of the width of the drawer
   */
  hysteresis: PropTypes.number,

  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   */
  minFlingVelocity: PropTypes.number,

  /**
   * @ignore
   */
  ModalProps: PropTypes.shape({
    BackdropProps: PropTypes.shape({
      component: elementTypeAcceptingRef
    })
  }),

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func.isRequired,

  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func.isRequired,

  /**
   * If `true`, the drawer is open.
   */
  open: PropTypes.bool.isRequired,

  /**
   * @ignore
   */
  PaperProps: PropTypes.shape({
    component: elementTypeAcceptingRef,
    style: PropTypes.object
  }),

  /**
   * Props applied to the swipe area element.
   */
  SwipeAreaProps: PropTypes.object,

  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  swipeAreaWidth: PropTypes.number,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * @ignore
   */
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
export default SwipeableDrawer;