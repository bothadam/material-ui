import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import getScrollbarSize from '../utils/getScrollbarSize';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow'; // Do we have a vertical scrollbar?

function isOverflowing(container) {
  var doc = ownerDocument(container);

  if (doc.body === container) {
    var win = ownerWindow(doc);
    return win.innerWidth > doc.documentElement.clientWidth;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(node, show) {
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(node) {
  return parseInt(window.getComputedStyle(node)['padding-right'], 10) || 0;
}

var BLACKLIST = ['template', 'script', 'style'];

function isHideable(node) {
  return node.nodeType === 1 && BLACKLIST.indexOf(node.tagName.toLowerCase()) === -1;
}

function siblings(container, mount, currentNode, nodesToExclude, callback) {
  var blacklist = [mount, currentNode].concat(_toConsumableArray(nodesToExclude));
  [].forEach.call(container.children, function (node) {
    if (blacklist.indexOf(node) === -1 && isHideable(node)) {
      callback(node);
    }
  });
}

function ariaHiddenSiblings(container, mountNode, currentNode) {
  var nodesToExclude = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var show = arguments.length > 4 ? arguments[4] : undefined;
  siblings(container, mountNode, currentNode, nodesToExclude, function (node) {
    return ariaHidden(node, show);
  });
}

function findIndexOf(containerInfo, callback) {
  var idx = -1;
  containerInfo.some(function (item, index) {
    if (callback(item)) {
      idx = index;
      return true;
    }

    return false;
  });
  return idx;
}

function handleContainer(containerInfo, props) {
  var restoreStyle = {};
  var style = {};
  var restorePaddings = [];
  var fixedNodes;

  if (!props.disableScrollLock) {
    restoreStyle.overflow = containerInfo.container.style.overflow;
    restoreStyle['padding-right'] = containerInfo.container.style.paddingRight;
    style.overflow = 'hidden';

    if (isOverflowing(containerInfo.container)) {
      var scrollbarSize = getScrollbarSize(); // Use computed style, here to get the real padding to add our scrollbar width.

      style['padding-right'] = "".concat(getPaddingRight(containerInfo.container) + scrollbarSize, "px"); // .mui-fixed is a global helper.

      fixedNodes = ownerDocument(containerInfo.container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedNodes, function (node) {
        restorePaddings.push(node.style.paddingRight);
        node.style.paddingRight = "".concat(getPaddingRight(node) + scrollbarSize, "px");
      });
    }
  }

  Object.keys(style).forEach(function (key) {
    containerInfo.container.style[key] = style[key];
  });

  var restore = function restore() {
    if (fixedNodes) {
      [].forEach.call(fixedNodes, function (node, i) {
        if (restorePaddings[i]) {
          node.style.paddingRight = restorePaddings[i];
        } else {
          node.style.removeProperty('padding-right');
        }
      });
    }

    Object.keys(restoreStyle).forEach(function (key) {
      if (restoreStyle[key]) {
        containerInfo.container.style.setProperty(key, restoreStyle[key]);
      } else {
        containerInfo.container.style.removeProperty(key);
      }
    });
  };

  return restore;
}

function getHiddenSiblings(container) {
  var hiddenSiblings = [];
  [].forEach.call(container.children, function (node) {
    if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') {
      hiddenSiblings.push(node);
    }
  });
  return hiddenSiblings;
}
/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */


var ModalManager =
/*#__PURE__*/
function () {
  function ModalManager() {
    _classCallCheck(this, ModalManager);

    // this.modals[modalIndex] = modal
    this.modals = []; // this.contaniners[containerIndex] = {
    //   modals: [],
    //   container,
    //   restore: null,
    // }

    this.contaniners = [];
  }

  _createClass(ModalManager, [{
    key: "add",
    value: function add(modal, container) {
      var modalIndex = this.modals.indexOf(modal);

      if (modalIndex !== -1) {
        return modalIndex;
      }

      modalIndex = this.modals.length;
      this.modals.push(modal); // If the modal we are adding is already in the DOM.

      if (modal.modalRef) {
        ariaHidden(modal.modalRef, false);
      }

      var hiddenSiblingNodes = getHiddenSiblings(container);
      ariaHiddenSiblings(container, modal.mountNode, modal.modalRef, hiddenSiblingNodes, true);
      var containerIndex = findIndexOf(this.contaniners, function (item) {
        return item.container === container;
      });

      if (containerIndex !== -1) {
        this.contaniners[containerIndex].modals.push(modal);
        return modalIndex;
      }

      this.contaniners.push({
        modals: [modal],
        container: container,
        restore: null,
        hiddenSiblingNodes: hiddenSiblingNodes
      });
      return modalIndex;
    }
  }, {
    key: "mount",
    value: function mount(modal, props) {
      var containerIndex = findIndexOf(this.contaniners, function (item) {
        return item.modals.indexOf(modal) !== -1;
      });
      var containerInfo = this.contaniners[containerIndex];

      if (!containerInfo.restore) {
        containerInfo.restore = handleContainer(containerInfo, props);
      }
    }
  }, {
    key: "remove",
    value: function remove(modal) {
      var modalIndex = this.modals.indexOf(modal);

      if (modalIndex === -1) {
        return modalIndex;
      }

      var containerIndex = findIndexOf(this.contaniners, function (item) {
        return item.modals.indexOf(modal) !== -1;
      });
      var containerInfo = this.contaniners[containerIndex];
      containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
      this.modals.splice(modalIndex, 1); // If that was the last modal in a container, clean up the container.

      if (containerInfo.modals.length === 0) {
        // The modal might be closed before it had the chance to be mounted in the DOM.
        if (containerInfo.restore) {
          containerInfo.restore();
        }

        if (modal.modalRef) {
          // In case the modal wasn't in the DOM yet.
          ariaHidden(modal.modalRef, true);
        }

        ariaHiddenSiblings(containerInfo.container, modal.mountNode, modal.modalRef, containerInfo.hiddenSiblingNodes, false);
        this.contaniners.splice(containerIndex, 1);
      } else {
        // Otherwise make sure the next top modal is visible to a screen reader.
        var nextTop = containerInfo.modals[containerInfo.modals.length - 1]; // as soon as a modal is adding its modalRef is undefined. it can't set
        // aria-hidden because the dom element doesn't exist either
        // when modal was unmounted before modalRef gets null

        if (nextTop.modalRef) {
          ariaHidden(nextTop.modalRef, false);
        }
      }

      return modalIndex;
    }
  }, {
    key: "isTopModal",
    value: function isTopModal(modal) {
      return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
    }
  }]);

  return ModalManager;
}();

export { ModalManager as default };