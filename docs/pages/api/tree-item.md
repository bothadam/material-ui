---
filename: /packages/material-ui-lab/src/TreeItem/TreeItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeItem API

<p class="description">The API documentation of the TreeItem React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TreeItem from '@material-ui/lab/TreeItem';
// or
import { TreeItem } from '@material-ui/lab';
```

You can learn more about the difference by [reading our guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">collapseIcon</span> | <span class="prop-type">node</span> |  | The icon used to collapse the node. |
| <span class="prop-name">endIcon</span> | <span class="prop-type">node</span> |  | The icon displayed next to a end node. |
| <span class="prop-name">expandIcon</span> | <span class="prop-type">node</span> |  | The icon used to expand the node. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon to display next to the tree node's label. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The tree node label. |
| <span class="prop-name required">nodeId&nbsp;*</span> | <span class="prop-type">string</span> |  | The id of the node. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the transition. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTreeItem`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiTreeItem-root</span> | Styles applied to the root element.
| <span class="prop-name">group</span> | <span class="prop-name">MuiTreeItem-group</span> | Styles applied to the `role="group"` element.
| <span class="prop-name">content</span> | <span class="prop-name">MuiTreeItem-content</span> | Styles applied to the tree node content.
| <span class="prop-name">iconContainer</span> | <span class="prop-name">MuiTreeItem-iconContainer</span> | Styles applied to the tree node icon and collapse/expand icon.
| <span class="prop-name">label</span> | <span class="prop-name">MuiTreeItem-label</span> | Styles applied to the label element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeItem/TreeItem.js) for more detail.

## Demos

- [Tree View](/components/tree-view/)

