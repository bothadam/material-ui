import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import warning from 'warning';
import { getThemeProps, useTheme } from '@material-ui/styles'; // This variable will be true once the server-side hydration is completed.

var hydrationCompleted = false;

function useMediaQuery(queryInput) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var theme = useTheme();
  var props = getThemeProps({
    theme: theme,
    name: 'MuiUseMediaQuery',
    props: {}
  });
  process.env.NODE_ENV !== "production" ? warning(typeof queryInput !== 'function' || theme !== null, ['Material-UI: the `query` argument provided is invalid.', 'You are providing a function without a theme in the context.', 'One of the parent elements needs to use a ThemeProvider.'].join('\n')) : void 0;
  var query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, ''); // Wait for jsdom to support the match media feature.
  // All the browsers Material-UI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.

  var supportMatchMedia = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  var _props$options = _extends({}, props, {}, options),
      _props$options$defaul = _props$options.defaultMatches,
      defaultMatches = _props$options$defaul === void 0 ? false : _props$options$defaul,
      _props$options$noSsr = _props$options.noSsr,
      noSsr = _props$options$noSsr === void 0 ? false : _props$options$noSsr,
      _props$options$ssrMat = _props$options.ssrMatchMedia,
      ssrMatchMedia = _props$options$ssrMat === void 0 ? null : _props$options$ssrMat;

  var _React$useState = React.useState(function () {
    if ((hydrationCompleted || noSsr) && supportMatchMedia) {
      return window.matchMedia(query).matches;
    }

    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    } // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.


    return defaultMatches;
  }),
      match = _React$useState[0],
      setMatch = _React$useState[1];

  React.useEffect(function () {
    hydrationCompleted = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    var queryList = window.matchMedia(query);

    var updateMatch = function updateMatch() {
      setMatch(queryList.matches);
    };

    updateMatch();
    queryList.addListener(updateMatch);
    return function () {
      queryList.removeListener(updateMatch);
    };
  }, [query, supportMatchMedia]);
  return match;
}

export function testReset() {
  hydrationCompleted = false;
}
export default useMediaQuery;