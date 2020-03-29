/// <reference path="../../lib/mesh-ui.d.ts" />
import { isStateObject, isAttributeWatcher } from './type-checks';

/* Special cases for setting property > attribute */
const validProps = ["innerText", "value", "disabled", "classList", "nodeValue", "textContent"];

/* OP version of HTMLElement.setAttribute (supports events, special cases) */
export function setHtmlProp(element: HTMLElement, name: string, value: any) {
    const caselessName: string = name.toLowerCase().trim();
    const trimmedName: string = name.trim();

    // If state, attach element:
    if (isStateObject(value)) 
        return value.attach(element, name);

    // If custom element watcher, attach to internal state:
    else if (isAttributeWatcher(value)) 
        return setHtmlProp(element, name, value.__meshInternalState__);

    
    else if (caselessName.startsWith("style::") && typeof value === "string")
        element.style[caselessName.replace("style::", "")] = value;

    // className becomes class:
    else if (caselessName == "classname")
        element.setAttribute("class", value);

    // Event listeners as functions:
    else if (caselessName.startsWith("on") && typeof value == "function")
        element.addEventListener(caselessName.replace("on", ""), value);

    // Property > Attributes:
    else if (validProps.indexOf(trimmedName) != -1)
        element[trimmedName] = value;

    // Apply as HTML attribute:
    else element.setAttribute(name, value.toString());
}

export function styleFromObject(styleObject: Record<string, string>) {

}