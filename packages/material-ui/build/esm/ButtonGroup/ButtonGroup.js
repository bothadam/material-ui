import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import '../Button'; // So we don't have any override priority issue.

export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'inline-flex',
      borderRadius: theme.shape.borderRadius
    },

    /* Styles applied to the root element if variant="contained". */
    contained: {
      boxShadow: theme.shadows[2]
    },

    /* Styles applied to the root element if fullWidth={true}. */
    fullWidth: {
      width: '100%'
    },

    /* Styles applied to the children. */
    grouped: {
      minWidth: 40,
      '&:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      }
    },

    /* Styles applied to the children if variant="outlined". */
    groupedOutlined: {
      '&:not(:first-child)': {
        borderLeftColor: 'transparent',
        marginLeft: -1
      }
    },

    /* Styles applied to the children if variant="outlined" & color="primary". */
    groupedOutlinedPrimary: {
      '&:hover': {
        borderColor: theme.palette.primary.main
      }
    },

    /* Styles applied to the children if variant="outlined" & color="secondary". */
    groupedOutlinedSecondary: {
      '&:hover': {
        borderColor: theme.palette.secondary.main
      }
    },

    /* Styles applied to the children if variant="contained". */
    groupedContained: {
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.grey[400])
      }
    },

    /* Styles applied to the children if variant="contained" & color="primary". */
    groupedContainedPrimary: {
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.primary.dark)
      }
    },

    /* Styles applied to the children if variant="contained" & color="secondary". */
    groupedContainedSecondary: {
      '&:not(:last-child)': {
        borderRight: "1px solid ".concat(theme.palette.secondary.dark)
      }
    }
  };
};
var ButtonGroup = React.forwardRef(function ButtonGroup(props, ref) {
  var children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      _props$disableRipple = props.disableRipple,
      disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'outlined' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "color", "component", "disabled", "disableFocusRipple", "disableRipple", "fullWidth", "size", "variant"]);

  var outlined = variant === 'outlined';
  var contained = variant !== "outlined";
  var primary = color === 'primary';
  var secondary = color === 'secondary';
  var buttonClassName = clsx(classes.grouped, outlined && [classes.groupedOutlined, primary && classes.groupedOutlinedPrimary, secondary && classes.groupedOutlinedSecondary], contained && [classes.groupedContained, primary && classes.groupedContainedPrimary, secondary && classes.groupedContainedSecondary]);
  return React.createElement(Component, _extends({
    role: "group",
    className: clsx(classes.root, classNameProp, contained && classes.contained, fullWidth && classes.fullWidth),
    ref: ref
  }, other), React.Children.map(children, function (child) {
    if (!React.isValidElement(child)) {
      return null;
    }

    process.env.NODE_ENV !== "production" ? warning(child.type !== React.Fragment, ["Material-UI: the ButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n')) : void 0;
    return React.cloneElement(child, {
      className: clsx(buttonClassName, child.props.className),
      disabled: child.props.disabled || disabled,
      color: child.props.color || color,
      disableFocusRipple: disableFocusRipple,
      disableRipple: disableRipple,
      fullWidth: fullWidth,
      size: child.props.size || size,
      variant: child.props.variant || variant
    });
  }));
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes = {
  /**
   * The content of the button group.
   */
  children: PropTypes.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the buttons will be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the button keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the button ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * If `true`, the buttons will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,

  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'contained'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiButtonGroup'
})(ButtonGroup);