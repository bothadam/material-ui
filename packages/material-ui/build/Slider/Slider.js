"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _colorManipulator = require("../styles/colorManipulator");

var _focusVisible = require("../utils/focusVisible");

var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _reactHelpers = require("../utils/reactHelpers");

var _ValueLabel = _interopRequireDefault(require("./ValueLabel"));

function asc(a, b) {
  return a - b;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function findClosest(values, currentValue) {
  var _values$reduce = values.reduce(function (acc, value, index) {
    var distance = Math.abs(currentValue - value);

    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance: distance,
        index: index
      };
    }

    return acc;
  }, null),
      closestIndex = _values$reduce.index;

  return closestIndex;
}

function trackFinger(event, touchId) {
  if (touchId.current !== undefined && event.changedTouches) {
    for (var i = 0; i < event.changedTouches.length; i += 1) {
      var touch = event.changedTouches[i];

      if (touch.identifier === touchId.current) {
        return {
          x: touch.pageX,
          y: touch.pageY
        };
      }
    }

    return false;
  }

  return {
    x: event.pageX,
    y: event.pageY
  };
}

function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}

function percentToValue(percent, min, max) {
  return (max - min) * percent + min;
}

function getDecimalPrecision(num) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    var parts = num.toExponential().split('e-');
    var matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step) {
  var nearest = Math.round(value / step) * step;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

function setValueIndex(_ref) {
  var values = _ref.values,
      source = _ref.source,
      newValue = _ref.newValue,
      index = _ref.index;

  // Performance shortcut
  if (values[index] === newValue) {
    return source;
  }

  var output = (0, _toConsumableArray2.default)(values);
  output[index] = newValue;
  return output;
}

function focusThumb(_ref2) {
  var sliderRef = _ref2.sliderRef,
      activeIndex = _ref2.activeIndex,
      setActive = _ref2.setActive;

  if (!sliderRef.current.contains(document.activeElement) || Number(document.activeElement.getAttribute('data-index')) !== activeIndex) {
    sliderRef.current.querySelector("[data-index=\"".concat(activeIndex, "\"]")).focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

var axisProps = {
  horizontal: {
    offset: function offset(percent) {
      return {
        left: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        width: "".concat(percent, "%")
      };
    }
  },
  'horizontal-reverse': {
    offset: function offset(percent) {
      return {
        right: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        width: "".concat(percent, "%")
      };
    }
  },
  vertical: {
    offset: function offset(percent) {
      return {
        bottom: "".concat(percent, "%")
      };
    },
    leap: function leap(percent) {
      return {
        height: "".concat(percent, "%")
      };
    }
  }
};
var defaultMarks = [];

var Identity = function Identity(x) {
  return x;
};

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 2,
      width: '100%',
      boxSizing: 'content-box',
      padding: '11px 0',
      display: 'inline-block',
      position: 'relative',
      cursor: 'pointer',
      touchAction: 'none',
      color: theme.palette.primary.main,
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      '&$disabled': {
        cursor: 'default',
        color: theme.palette.grey[400]
      },
      '&$vertical': {
        width: 2,
        height: '100%',
        padding: '0 11px'
      }
    },

    /* Styles applied to the root element if `marks` is provided with at least one label. */
    marked: {
      marginBottom: 20,
      '&$vertical': {
        marginBottom: 'auto',
        marginRight: 20
      }
    },

    /* Pseudo-class applied to the root element if `orientation="vertical"`. */
    vertical: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the rail element. */
    rail: {
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: 2,
      borderRadius: 1,
      backgroundColor: 'currentColor',
      opacity: 0.38,
      '$vertical &': {
        height: '100%',
        width: 2
      }
    },

    /* Styles applied to the track element. */
    track: {
      display: 'block',
      position: 'absolute',
      height: 2,
      borderRadius: 1,
      backgroundColor: 'currentColor',
      '$vertical &': {
        width: 2
      }
    },

    /* Styles applied to the thumb element. */
    thumb: {
      position: 'absolute',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -5,
      boxSizing: 'border-box',
      borderRadius: '50%',
      outline: 0,
      backgroundColor: 'currentColor',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.create(['box-shadow'], {
        duration: theme.transitions.duration.shortest
      }),
      '&$focusVisible,&:hover': {
        boxShadow: "0px 0px 0px 8px ".concat((0, _colorManipulator.fade)(theme.palette.primary.main, 0.16)),
        '@media (hover: none)': {
          boxShadow: 'none'
        }
      },
      '&$active': {
        boxShadow: "0px 0px 0px 14px ".concat((0, _colorManipulator.fade)(theme.palette.primary.main, 0.16))
      },
      '$disabled &': {
        pointerEvents: 'none',
        width: 8,
        height: 8,
        marginLeft: -4,
        marginTop: -3,
        '&:hover': {
          boxShadow: 'none'
        }
      },
      '$vertical &': {
        marginLeft: -5,
        marginBottom: -6
      },
      '$vertical$disabled &': {
        marginLeft: -3,
        marginBottom: -4
      }
    },

    /* Pseudo-class applied to the thumb element if it's active. */
    active: {},

    /* Pseudo-class applied to the thumb element if keyboard focused. */
    focusVisible: {},

    /* Styles applied to the thumb label element. */
    valueLabel: {},

    /* Styles applied to the mark element. */
    mark: {
      position: 'absolute',
      width: 2,
      height: 2,
      borderRadius: 1,
      backgroundColor: 'currentColor'
    },

    /* Styles applied to the mark element if active (depending on the value). */
    markActive: {
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.primary.main, 0.76)
    },

    /* Styles applied to the mark label element. */
    markLabel: (0, _extends2.default)({}, theme.typography.body2, {
      color: theme.palette.text.secondary,
      position: 'absolute',
      top: 22,
      transform: 'translateX(-50%)',
      whiteSpace: 'nowrap',
      '$vertical &': {
        top: 'auto',
        left: 22,
        transform: 'translateY(50%)'
      }
    }),

    /* Styles applied to the mark label element if active (depending on the value). */
    markLabelActive: {
      color: theme.palette.text.primary
    }
  };
};

exports.styles = styles;

var Slider = _react.default.forwardRef(function Slider(props, ref) {
  var ariaLabel = props['aria-label'],
      ariaLabelledby = props['aria-labelledby'],
      ariaValuetext = props['aria-valuetext'],
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'span' : _props$component,
      defaultValue = props.defaultValue,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      getAriaValueText = props.getAriaValueText,
      _props$marks = props.marks,
      marksProp = _props$marks === void 0 ? defaultMarks : _props$marks,
      _props$max = props.max,
      max = _props$max === void 0 ? 100 : _props$max,
      _props$min = props.min,
      min = _props$min === void 0 ? 0 : _props$min,
      name = props.name,
      onChange = props.onChange,
      onChangeCommitted = props.onChangeCommitted,
      onMouseDown = props.onMouseDown,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$step = props.step,
      step = _props$step === void 0 ? 1 : _props$step,
      _props$ThumbComponent = props.ThumbComponent,
      ThumbComponent = _props$ThumbComponent === void 0 ? 'span' : _props$ThumbComponent,
      valueProp = props.value,
      _props$ValueLabelComp = props.ValueLabelComponent,
      ValueLabelComponent = _props$ValueLabelComp === void 0 ? _ValueLabel.default : _props$ValueLabelComp,
      _props$valueLabelDisp = props.valueLabelDisplay,
      valueLabelDisplay = _props$valueLabelDisp === void 0 ? 'off' : _props$valueLabelDisp,
      _props$valueLabelForm = props.valueLabelFormat,
      valueLabelFormat = _props$valueLabelForm === void 0 ? Identity : _props$valueLabelForm,
      other = (0, _objectWithoutProperties2.default)(props, ["aria-label", "aria-labelledby", "aria-valuetext", "classes", "className", "component", "defaultValue", "disabled", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "step", "ThumbComponent", "value", "ValueLabelComponent", "valueLabelDisplay", "valueLabelFormat"]);
  var theme = (0, _useTheme.default)();

  var _React$useRef = _react.default.useRef(valueProp != null),
      isControlled = _React$useRef.current;

  var touchId = _react.default.useRef(); // We can't use the :active browser pseudo-classes.
  // - The active state isn't triggered when clicking on the rail.
  // - The active state isn't transfered when inversing a range slider.


  var _React$useState = _react.default.useState(-1),
      active = _React$useState[0],
      setActive = _React$useState[1];

  var _React$useState2 = _react.default.useState(-1),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = _react.default.useState(defaultValue),
      valueState = _React$useState3[0],
      setValueState = _React$useState3[1];

  var valueDerived = isControlled ? valueProp : valueState;
  var range = Array.isArray(valueDerived);

  var instanceRef = _react.default.useRef();

  var values = range ? valueDerived.sort(asc) : [valueDerived];
  values = values.map(function (value) {
    return clamp(value, min, max);
  });
  var marks = marksProp === true && step !== null ? (0, _toConsumableArray2.default)(Array(Math.floor((max - min) / step) + 1)).map(function (_, index) {
    return {
      value: min + step * index
    };
  }) : marksProp;
  instanceRef.current = {
    source: valueDerived // Keep track of the input value to leverage immutable state comparison.

  };

  var _useIsFocusVisible = (0, _focusVisible.useIsFocusVisible)(),
      isFocusVisible = _useIsFocusVisible.isFocusVisible,
      onBlurVisible = _useIsFocusVisible.onBlurVisible,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState4 = _react.default.useState(-1),
      focusVisible = _React$useState4[0],
      setFocusVisible = _React$useState4[1];

  var sliderRef = _react.default.useRef();

  var handleFocusRef = (0, _reactHelpers.useForkRef)(focusVisibleRef, sliderRef);
  var handleRef = (0, _reactHelpers.useForkRef)(ref, handleFocusRef);
  var handleFocus = (0, _useEventCallback.default)(function (event) {
    var index = Number(event.currentTarget.getAttribute('data-index'));

    if (isFocusVisible(event)) {
      setFocusVisible(index);
    }

    setOpen(index);
  });
  var handleBlur = (0, _useEventCallback.default)(function () {
    if (focusVisible !== -1) {
      setFocusVisible(-1);
      onBlurVisible();
    }

    setOpen(-1);
  });
  var handleMouseOver = (0, _useEventCallback.default)(function (event) {
    var index = Number(event.currentTarget.getAttribute('data-index'));
    setOpen(index);
  });
  var handleMouseLeave = (0, _useEventCallback.default)(function () {
    setOpen(-1);
  });
  var handleKeyDown = (0, _useEventCallback.default)(function (event) {
    var index = Number(event.currentTarget.getAttribute('data-index'));
    var value = values[index];
    var tenPercents = (max - min) / 10;
    var marksValues = marks.map(function (mark) {
      return mark.value;
    });
    var marksIndex = marksValues.indexOf(value);
    var newValue;

    switch (event.key) {
      case 'Home':
        newValue = min;
        break;

      case 'End':
        newValue = max;
        break;

      case 'PageUp':
        if (step) {
          newValue = value + tenPercents;
        }

        break;

      case 'PageDown':
        if (step) {
          newValue = value - tenPercents;
        }

        break;

      case 'ArrowRight':
      case 'ArrowUp':
        if (step) {
          newValue = value + step;
        } else {
          newValue = marksValues[marksIndex + 1] || marksValues[marksValues.length - 1];
        }

        break;

      case 'ArrowLeft':
      case 'ArrowDown':
        if (step) {
          newValue = value - step;
        } else {
          newValue = marksValues[marksIndex - 1] || marksValues[0];
        }

        break;

      default:
        return;
    }

    event.preventDefault();

    if (step) {
      newValue = roundValueToStep(newValue, step);
    }

    newValue = clamp(newValue, min, max);

    if (range) {
      var previousValue = newValue;
      newValue = setValueIndex({
        values: values,
        source: valueDerived,
        newValue: newValue,
        index: index
      }).sort(asc);
      focusThumb({
        sliderRef: sliderRef,
        activeIndex: newValue.indexOf(previousValue)
      });
    }

    if (!isControlled) {
      setValueState(newValue);
    }

    setFocusVisible(index);

    if (onChange) {
      onChange(event, newValue);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  });

  var previousIndex = _react.default.useRef();

  var axis = orientation;

  if (theme.direction === 'rtl' && orientation !== "vertical") {
    axis += '-reverse';
  }

  var getFingerNewValue = _react.default.useCallback(function (_ref3) {
    var finger = _ref3.finger,
        _ref3$move = _ref3.move,
        move = _ref3$move === void 0 ? false : _ref3$move,
        values2 = _ref3.values,
        source = _ref3.source;
    var slider = sliderRef.current;

    var _slider$getBoundingCl = slider.getBoundingClientRect(),
        width = _slider$getBoundingCl.width,
        height = _slider$getBoundingCl.height,
        bottom = _slider$getBoundingCl.bottom,
        left = _slider$getBoundingCl.left;

    var percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom + (0, _ownerWindow.default)(slider).pageYOffset - finger.y) / height;
    } else {
      percent = (finger.x - left - (0, _ownerWindow.default)(slider).pageXOffset) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    var newValue;
    newValue = percentToValue(percent, min, max);

    if (step) {
      newValue = roundValueToStep(newValue, step);
    } else {
      var marksValues = marks.map(function (mark) {
        return mark.value;
      });
      var closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }

    newValue = clamp(newValue, min, max);
    var activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values2, newValue);
      } else {
        activeIndex = previousIndex.current;
      }

      var previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        source: source,
        newValue: newValue,
        index: activeIndex
      }).sort(asc);
      activeIndex = newValue.indexOf(previousValue);
      previousIndex.current = activeIndex;
    }

    return {
      newValue: newValue,
      activeIndex: activeIndex
    };
  }, [max, min, axis, range, step, marks]);

  var handleTouchMove = (0, _useEventCallback.default)(function (event) {
    var finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    var _getFingerNewValue = getFingerNewValue({
      finger: finger,
      move: true,
      values: values,
      source: valueDerived
    }),
        newValue = _getFingerNewValue.newValue,
        activeIndex = _getFingerNewValue.activeIndex;

    focusThumb({
      sliderRef: sliderRef,
      activeIndex: activeIndex,
      setActive: setActive
    });

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(event, newValue);
    }
  });
  var handleTouchEnd = (0, _useEventCallback.default)(function (event) {
    var finger = trackFinger(event, touchId);

    if (!finger) {
      return;
    }

    var _getFingerNewValue2 = getFingerNewValue({
      finger: finger,
      values: values,
      source: valueDerived
    }),
        newValue = _getFingerNewValue2.newValue;

    setActive(-1);

    if (event.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }

    touchId.current = undefined;
    document.body.removeEventListener('mousemove', handleTouchMove);
    document.body.removeEventListener('mouseup', handleTouchEnd); // eslint-disable-next-line no-use-before-define

    document.body.removeEventListener('mouseenter', handleMouseEnter);
    document.body.removeEventListener('touchmove', handleTouchMove);
    document.body.removeEventListener('touchend', handleTouchEnd);
  });
  var handleMouseEnter = (0, _useEventCallback.default)(function (event) {
    // If the slider was being interacted with but the mouse went off the window
    // and then re-entered while unclicked then end the interaction.
    //
    // In Firefox, the event can be triggered when a new DOM node is inserted and hovered.
    // We need to make sure that the relatedTarget (The EventTarget the pointing device exited from)
    // is not null (it should be the html element)
    if (event.buttons === 0 && event.relatedTarget !== null) {
      handleTouchEnd(event);
    }
  });
  var handleTouchStart = (0, _useEventCallback.default)(function (event) {
    // Workaround as Safari has partial support for touchAction: 'none'.
    event.preventDefault();
    var touch = event.changedTouches[0];

    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }

    var finger = trackFinger(event, touchId);

    var _getFingerNewValue3 = getFingerNewValue({
      finger: finger,
      values: values,
      source: valueDerived
    }),
        newValue = _getFingerNewValue3.newValue,
        activeIndex = _getFingerNewValue3.activeIndex;

    focusThumb({
      sliderRef: sliderRef,
      activeIndex: activeIndex,
      setActive: setActive
    });

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('touchend', handleTouchEnd);
  });

  _react.default.useEffect(function () {
    if (disabled) {
      return function () {};
    }

    var slider = sliderRef.current;
    slider.addEventListener('touchstart', handleTouchStart);
    return function () {
      slider.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('mousemove', handleTouchMove);
      document.body.removeEventListener('mouseup', handleTouchEnd);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, handleMouseEnter, handleTouchEnd, handleTouchMove, handleTouchStart]);

  var handleMouseDown = (0, _useEventCallback.default)(function (event) {
    if (onMouseDown) {
      onMouseDown(event);
    }

    if (disabled) {
      return;
    }

    event.preventDefault();
    var finger = trackFinger(event, touchId);

    var _getFingerNewValue4 = getFingerNewValue({
      finger: finger,
      values: values,
      source: valueDerived
    }),
        newValue = _getFingerNewValue4.newValue,
        activeIndex = _getFingerNewValue4.activeIndex;

    focusThumb({
      sliderRef: sliderRef,
      activeIndex: activeIndex,
      setActive: setActive
    });

    if (!isControlled) {
      setValueState(newValue);
    }

    if (onChange) {
      onChange(event, newValue);
    }

    document.body.addEventListener('mousemove', handleTouchMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseup', handleTouchEnd);
  });
  var trackOffset = valueToPercent(range ? values[0] : min, min, max);
  var trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;
  var trackStyle = (0, _extends2.default)({}, axisProps[axis].offset(trackOffset), {}, axisProps[axis].leap(trackLeap));
  return _react.default.createElement(Component, (0, _extends2.default)({
    ref: handleRef,
    className: (0, _clsx.default)(classes.root, className, disabled && classes.disabled, marks.length > 0 && marks.some(function (mark) {
      return mark.label;
    }) && classes.marked, {
      vertical: classes.vertical
    }[orientation]),
    onMouseDown: handleMouseDown
  }, other), _react.default.createElement("span", {
    className: classes.rail
  }), _react.default.createElement("span", {
    className: classes.track,
    style: trackStyle
  }), _react.default.createElement("input", {
    value: values.join(','),
    name: name,
    type: "hidden"
  }), marks.map(function (mark) {
    var percent = valueToPercent(mark.value, min, max);
    var style = axisProps[axis].offset(percent);
    var markActive = range ? mark.value >= values[0] && mark.value <= values[values.length - 1] : mark.value <= values[0];
    return _react.default.createElement(_react.default.Fragment, {
      key: mark.value
    }, _react.default.createElement("span", {
      style: style,
      className: (0, _clsx.default)(classes.mark, markActive && classes.markActive)
    }), _react.default.createElement("span", {
      "aria-hidden": true,
      style: style,
      className: (0, _clsx.default)(classes.markLabel, markActive && classes.markLabelActive)
    }, mark.label));
  }), values.map(function (value, index) {
    var percent = valueToPercent(value, min, max);
    var style = axisProps[axis].offset(percent);
    return _react.default.createElement(ValueLabelComponent, {
      key: index,
      valueLabelFormat: valueLabelFormat,
      valueLabelDisplay: valueLabelDisplay,
      className: classes.valueLabel,
      value: value,
      index: index,
      open: open === index || active === index,
      disabled: disabled
    }, _react.default.createElement(ThumbComponent, {
      className: (0, _clsx.default)(classes.thumb, active === index && classes.active, focusVisible === index && classes.focusVisible),
      tabIndex: disabled ? null : 0,
      role: "slider",
      style: style,
      "data-index": index,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      "aria-orientation": orientation,
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": value,
      "aria-valuetext": getAriaValueText ? getAriaValueText(value, index) : ariaValuetext,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseOver: handleMouseOver,
      onMouseLeave: handleMouseLeave
    }));
  }));
});

process.env.NODE_ENV !== "production" ? Slider.propTypes = {
  /**
   * The label of the slider.
   */
  'aria-label': _propTypes.default.string,

  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': (0, _utils.chainPropTypes)(_propTypes.default.string, function (props) {
    var range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext']) {
      return new Error('Material-UI: you need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range input.');
    }

    return null;
  }),

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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]),

  /**
   * If `true`, the slider will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format
   * @param {number} index The thumb label's index to format
   */
  getAriaValueText: _propTypes.default.func,

  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks will be spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   */
  marks: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.array]),

  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   */
  max: _propTypes.default.number,

  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   */
  min: _propTypes.default.number,

  /**
   * Name attribute of the hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChange: _propTypes.default.func,

  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback
   * @param {any} value The new value
   */
  onChangeCommitted: _propTypes.default.func,

  /**
   * @ignore
   */
  onMouseDown: _propTypes.default.func,

  /**
   * The slider orientation.
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   */
  step: _propTypes.default.number,

  /**
   * The component used to display the value label.
   */
  ThumbComponent: _propTypes.default.elementType,

  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)]),

  /**
   * The value label component.
   */
  ValueLabelComponent: _propTypes.default.elementType,

  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   */
  valueLabelDisplay: _propTypes.default.oneOf(['on', 'auto', 'off']),

  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   */
  valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSlider'
})(Slider);

exports.default = _default;