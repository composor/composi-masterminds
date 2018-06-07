import { createElement } from '../createElement'
import { removeElement} from '../removeElement'

export function handleNewElement(node, isSVG, parent, element, oldNode) {
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