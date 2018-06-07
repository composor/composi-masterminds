import {removeElement} from '../removeElement'
import {getKey} from '../getKey'

/**
 * Function to remove oldChild element when patching.
 * @param {Node} element 
 * @param {any[]} oldChildren
 * @param {HTMLElement[]} oldElements
 * @param {number} i 
 */
export function removeOldChild(element, oldChildren, oldElements, i) {
  while (i < oldChildren.length) {
    if (getKey(oldChildren[i]) == null) {
      removeElement(element, oldElements[i], oldChildren[i])
    }
    i++
  } 
}