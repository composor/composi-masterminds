import { createElement } from '../createElement'
import { removeElement} from '../removeElement'

/**
 * @description When oldNode does not exist or node.type is different, create a new element.
 * @param {Node} node 
 * @param {boolean} isSVG 
 * @param {Node} parent 
 * @param {Node} element 
 * @param {Node} oldNode 
 * @returns {Node} Node
 */
export function createNewElement(node, isSVG, parent, element, oldNode) {
  const newElement = createElement(node, isSVG)
  if (parent) {
    parent.insertBefore(newElement, element)
    if (oldNode != null) {
      removeElement(parent, element, oldNode)
    }
  }
  element = newElement
  return element
}
