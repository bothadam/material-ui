import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import FormGroup from '../FormGroup';
import { useForkRef } from '../utils/reactHelpers';
import RadioGroupContext from './RadioGroupContext';
var RadioGroup = React.forwardRef(function RadioGroup(props, ref) {
  var actions = props.actions,
      children = props.children,
      name = props.name,
      valueProp = props.value,
      onChange = props.onChange,
      other = _objectWithoutProperties(props, ["actions", "children", "name", "value", "onChange"]);

  var rootRef = React.useRef(null);

  var _React$useRef = React.useRef(valueProp != null),
      isControlled = _React$useRef.current;

  var _React$useState = React.useState(function () {
    if (!isControlled) {
      return props.defaultValue;
    }

    return null;
  }),
      valueState = _React$useState[0],
      setValue = _React$useState[1];

  React.useImperativeHandle(actions, function () {
    return {
      focus: function focus() {
        var input = rootRef.current.querySelector('input:not(:disabled):checked');

        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }

        if (input) {
          input.focus();
        }
      }
    };
  }, []);
  React.useEffect(function () {
    process.env.NODE_ENV !== "production" ? warning(isControlled === (valueProp != null), ["Material-UI: A component is changing ".concat(isControlled ? 'a ' : 'an un', "controlled RadioGroup to be ").concat(isControlled ? 'un' : '', "controlled."), 'Input elements should not switch from uncontrolled to controlled (or vice versa).', 'Decide between using a controlled or uncontrolled RadioGroup ' + 'element for the lifetime of the component.', 'More info: https://fb.me/react-controlled-components'].join('\n')) : void 0;
  }, [valueProp, isControlled]);
  var value = isControlled ? valueProp : valueState;

  var handleChange = function handleChange(event) {
    if (!isControlled) {
      setValue(event.target.value);
    }

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  var context = {
    name: name,
    onChange: handleChange,
    value: value
  };
  var handleRef = useForkRef(ref, rootRef);
  return React.createElement(FormGroup, _extends({
    role: "radiogroup",
    ref: handleRef
  }, other), React.createElement(RadioGroupContext.Provider, {
    value: context
  }, children));
});
process.env.NODE_ENV !== "production" ? RadioGroup.propTypes = {
  /**
   * @ignore
   */
  actions: PropTypes.shape({
    current: PropTypes.object
  }),

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,

  /**
   * The name used to reference the value of the control.
   */
  name: PropTypes.string,

  /**
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {string} value The `value` of the selected radio button
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * Value of the selected radio button.
   */
  value: PropTypes.string
} : void 0;
export default RadioGroup;