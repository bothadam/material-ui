import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import warning from 'warning';
import withStyles from '../styles/withStyles';
import { lighten } from '../styles/colorManipulator';
import useTheme from '../styles/useTheme';
const TRANSITION_DURATION = 4; // seconds

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    overflow: 'hidden',
    height: 4
  },

  /* Styles applied to the root & bar2 element if `color="primary"`; bar2 if `variant-"buffer"`. */
  colorPrimary: {
    backgroundColor: lighten(theme.palette.primary.light, 0.6)
  },

  /* Styles applied to the root & bar2 elements if `color="secondary"`; bar2 if `variant="buffer"`. */
  colorSecondary: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.4)
  },

  /* Styles applied to the root element if `variant="determinate"`. */
  determinate: {},

  /* Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: {},

  /* Styles applied to the root element if `variant="buffer"`. */
  buffer: {
    backgroundColor: 'transparent'
  },

  /* Styles applied to the root element if `variant="query"`. */
  query: {
    transform: 'rotate(180deg)'
  },

  /* Styles applied to the additional bar element if `variant="buffer"`. */
  dashed: {
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    animation: '$buffer 3s infinite linear'
  },

  /* Styles applied to the additional bar element if `variant="buffer"` & `color="primary"`. */
  dashedColorPrimary: {
    backgroundImage: `radial-gradient(${lighten(theme.palette.primary.light, 0.6)} 0%, ${lighten(theme.palette.primary.light, 0.6)} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px'
  },

  /* Styles applied to the additional bar element if `variant="buffer"` & `color="secondary"`. */
  dashedColorSecondary: {
    backgroundImage: `radial-gradient(${lighten(theme.palette.secondary.light, 0.4)} 0%, ${lighten(theme.palette.secondary.light, 0.6)} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px'
  },

  /* Styles applied to the layered bar1 & bar2 elements. */
  bar: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left'
  },

  /* Styles applied to the bar elements if `color="primary"`; bar2 if `variant` not "buffer". */
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the bar elements if `color="secondary"`; bar2 if `variant` not "buffer". */
  barColorSecondary: {
    backgroundColor: theme.palette.secondary.main
  },

  /* Styles applied to the bar1 element if `variant="indeterminate or query"`. */
  bar1Indeterminate: {
    width: 'auto',
    animation: '$mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
  },

  /* Styles applied to the bar1 element if `variant="determinate"`. */
  bar1Determinate: {
    transition: `transform .${TRANSITION_DURATION}s linear`
  },

  /* Styles applied to the bar1 element if `variant="buffer"`. */
  bar1Buffer: {
    zIndex: 1,
    transition: `transform .${TRANSITION_DURATION}s linear`
  },

  /* Styles applied to the bar2 element if `variant="indeterminate or query"`. */
  bar2Indeterminate: {
    width: 'auto',
    animation: '$mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
    animationDelay: '1.15s'
  },

  /* Styles applied to the bar2 element if `variant="buffer"`. */
  bar2Buffer: {
    transition: `transform .${TRANSITION_DURATION}s linear`
  },
  // Legends:
  // || represents the viewport
  // -  represents a light background
  // x  represents a dark background
  '@keyframes mui-indeterminate1': {
    //  |-----|---x-||-----||-----|
    '0%': {
      left: '-35%',
      right: '100%'
    },
    //  |-----|-----||-----||xxxx-|
    '60%': {
      left: '100%',
      right: '-90%'
    },
    '100%': {
      left: '100%',
      right: '-90%'
    }
  },
  '@keyframes mui-indeterminate2': {
    //  |xxxxx|xxxxx||-----||-----|
    '0%': {
      left: '-200%',
      right: '100%'
    },
    //  |-----|-----||-----||-x----|
    '60%': {
      left: '107%',
      right: '-8%'
    },
    '100%': {
      left: '107%',
      right: '-8%'
    }
  },
  '@keyframes buffer': {
    '0%': {
      opacity: 1,
      backgroundPosition: '0px -23px'
    },
    '50%': {
      opacity: 0,
      backgroundPosition: '0px -23px'
    },
    '100%': {
      opacity: 1,
      backgroundPosition: '-200px -23px'
    }
  }
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

const LinearProgress = React.forwardRef(function LinearProgress(props, ref) {
  const {
    classes,
    className: classNameProp,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "color", "value", "valueBuffer", "variant"]);

  const theme = useTheme();
  const className = clsx(classes.root, classNameProp, color === 'primary' ? classes.colorPrimary : classes.colorSecondary, {
    determinate: classes.determinate,
    indeterminate: classes.indeterminate,
    buffer: classes.buffer,
    query: classes.query
  }[variant]);
  const dashedClass = clsx(classes.dashed, color === 'primary' ? classes.dashedColorPrimary : classes.dashedColorSecondary);
  const bar1ClassName = clsx(classes.bar, (variant === 'indeterminate' || variant === 'query') && classes.bar1Indeterminate, color === 'primary' ? classes.barColorPrimary : classes.barColorSecondary, {
    determinate: classes.bar1Determinate,
    buffer: classes.bar1Buffer
  }[variant]);
  const bar2ClassName = clsx(classes.bar, (variant === 'indeterminate' || variant === 'query') && classes.bar2Indeterminate, variant === 'buffer' ? [classes.bar2Buffer, color === 'primary' ? classes.colorPrimary : classes.colorSecondary] : color === 'primary' ? classes.barColorPrimary : classes.barColorSecondary);
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      let transform = value - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else {
      process.env.NODE_ENV !== "production" ? warning(false, 'Material-UI: you need to provide a value prop ' + 'when using the determinate or buffer variant of LinearProgress .') : void 0;
    }
  }

  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else {
      process.env.NODE_ENV !== "production" ? warning(false, 'Material-UI: you need to provide a valueBuffer prop ' + 'when using the buffer variant of LinearProgress.') : void 0;
    }
  }

  return React.createElement("div", _extends({
    className: className,
    role: "progressbar"
  }, rootProps, {
    ref: ref
  }, other), variant === 'buffer' ? React.createElement("div", {
    className: dashedClass
  }) : null, React.createElement("div", {
    className: bar1ClassName,
    style: inlineStyles.bar1
  }), variant === 'determinate' ? null : React.createElement("div", {
    className: bar2ClassName,
    style: inlineStyles.bar2
  }));
});
process.env.NODE_ENV !== "production" ? LinearProgress.propTypes = {
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
  color: PropTypes.oneOf(['primary', 'secondary']),

  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number,

  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: PropTypes.number,

  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   */
  variant: PropTypes.oneOf(['determinate', 'indeterminate', 'buffer', 'query'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiLinearProgress'
})(LinearProgress);