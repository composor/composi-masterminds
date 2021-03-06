import { getKey } from './getKey'
import { updateElement } from './updateElement'
import { removeElement } from './removeElement'
import { createNewElement } from './patchElementHelpers/createNewElement'
import { removeOldChild } from './patchElementHelpers/removeOldChild'
import { updateOldElementOrKey } from './patchElementHelpers/updateOldElementOrKey'
import { removeOldKeyedElements } from './patchElementHelpers/removeOldKeyedElements'

/**
 * @description A function to diff and patch a DOM node with a virtual node.
 * @param {Node} parent The parent node of the elment being patched.
 * @param {Node} element The element being patched.
 * @param {Object} oldNode A virtual dom node from the previous patch.
 * @param {Object} node The current virtual dom node.
 * @param {boolean} [isSVG] Whether we are dealing with an SVG element or not.
 * @returns {Node} element The patched element.
 */
export function patchElement(parent, element, oldNode, node, isSVG) {
  // Short circuit patch if VNodes are identical
  if (node === oldNode) {
    return
  } else if (oldNode == null || oldNode.type !== node.type) {
    element = createNewElement(node, isSVG, parent, element, oldNode)
  } else if (oldNode.type == null) {
    element.nodeValue = node
  } else {
    updateElement(
      element,
      oldNode.props,
      node.props,
      (isSVG = isSVG || node.type === 'svg')
    )

    const oldKeyed = {}
    const newKeyed = {}
    const oldElements = []
    const oldChildren = oldNode.children
    const children = node.children

    updateOldElementOrKey(element, oldElements, oldChildren, oldKeyed)

    let i = 0
    let k = 0

    function patchElements(parent, element, oldNode, node, oldElements, oldChildren, oldKeyed, i, k, isSVG) {
      while (k < children.length) {
        let oldKey = getKey(oldChildren[i])
        let newKey = getKey(children[k])

        if (newKeyed[oldKey]) {
          i++
          continue
        }

        if (newKey != null && newKey === getKey(oldChildren[i + 1])) {
          if (oldKey == null) {
            removeElement(element, oldElements[i], oldChildren[i])
          }
          i++
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patchElement(
              element,
              oldElements[i],
              oldChildren[i],
              children[k],
              isSVG
            )
            k++
          }
          i++
        } else {
          const keyedNode = oldKeyed[newKey] || []

          if (oldKey === newKey) {
            patchElement(element, keyedNode[0], keyedNode[1], children[k], isSVG)
            i++
          } else if (keyedNode[0]) {
            patchElement(
              element,
              element.insertBefore(keyedNode[0], oldElements[i]),
              keyedNode[1],
              children[k],
              isSVG
            )
          } else {
            patchElement(element, oldElements[i], null, children[k], isSVG)
          }

          newKeyed[newKey] = children[k]
          k++
        }
      }
    }
    patchElements(parent, element, oldNode, node, oldElements, oldChildren, oldKeyed, i, k, isSVG)
    removeOldChild(element, oldChildren, oldElements, i)
    removeOldKeyedElements(element, oldKeyed, newKeyed)
  }
  return element
}
