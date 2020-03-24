/// <reference path="../../lib/mesh-ui.d.ts" />
import { render } from './dom';
import htm from './htm';
import { isStateObject, isCustomElementWatcher } from './type-checks';

/* Hyperscript function renders Component or DOM nodes */
export function jsx(tagName: string | MeshUI.IComponent, props: MeshUI.IProps, ...children: any[]) {
    // Create Component if tagName is a function:
    if (typeof tagName === "function") return tagName(props, children);

    // Otherwise create HTML element:
    const element = document.createElement(tagName);

    // Loop over & add props:
    props && Object.keys(props).map((name: string) => 
        props.hasOwnProperty(name) && setHtmlProp(element, name, props[name]));

    // Add children:
    render(children, element);

    // Return created element:
    return element;
}

/* OP version of HTMLElement.setAttribute (supports events, special cases) */
export function setHtmlProp(element: HTMLElement, name: string, value: any) {
    const validProps = ["innerText", "value", "disabled", "classList", "nodeValue"];
    const caselessName: string = name.toLowerCase().trim();
    const trimmedName: string = name.trim();

    // If state, attach element:
    if (isStateObject(value)) 
        return value.attach(element, name);

    // If custom element watcher, attach to internal state:
    if (isCustomElementWatcher(value)) 
        return setHtmlProp(element, name, value.__meshInternalState__);

    // className becomes class:
    if (caselessName == "classname")
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

/* Lit tagged template version of jsx() [thx htm]: */
export const dom = htm.bind(jsx);