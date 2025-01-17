import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwitchBase from '../internal/SwitchBase';
import RadioButtonIcon from './RadioButtonIcon';
import { fade } from '../styles/colorManipulator';
import { capitalize, createChainedFunction } from '../utils/helpers';
import withStyles from '../styles/withStyles';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      color: theme.palette.text.secondary
    },

    /* Pseudo-class applied to the root element if `checked={true}`. */
    checked: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      '&$checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent'
          }
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  };
};
var defaultCheckedIcon = React.createElement(RadioButtonIcon, {
  checked: true
});
var defaultIcon = React.createElement(RadioButtonIcon, null);
var Radio = React.forwardRef(function Radio(props, ref) {
  var checkedProp = props.checked,
      classes = props.classes,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      nameProp = props.name,
      onChangeProp = props.onChange,
      other = _objectWithoutProperties(props, ["checked", "classes", "color", "name", "onChange"]);

  var radioGroup = React.useContext(RadioGroupContext);
  var checked = checkedProp;
  var onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  var name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return React.createElement(SwitchBase, _extends({
    color: color,
    type: "radio",
    icon: defaultIcon,
    checkedIcon: defaultCheckedIcon,
    classes: {
      root: clsx(classes.root, classes["color".concat(capitalize(color))]),
      checked: classes.checked,
      disabled: classes.disabled
    },
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Radio.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),

  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * This prop can be used to pass a ref callback to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element will be required.
   */
  required: PropTypes.bool,

  /**
   * The input component prop `type`.
   */
  type: PropTypes.string,

  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
export default withStyles(styles, {
  name: 'MuiRadio'
})(Radio);