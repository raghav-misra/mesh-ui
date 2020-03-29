/// <reference path="../../lib/mesh-ui.d.ts" />
import { isStateObject, isAttributeWatcher } from './type-checks';

/* Special cases for setting property > attribute */
const validProps = ["innerText", "value", "disabled", "classList", "nodeValue", "textContent"];

/* OP version of HTMLElement.setAttribute (supports events, special cases) */
export function setHtmlProp(element: HTMLElement, name: string, value: any) {
    const trimmedName: string = name.trim();

    // If state, call special state function:
    if (isStateObject(value))
        addPropIfState(element, trimmedName, value);

    // Individual style rules
    else if (trimmedName.startsWith("m-css:")) 
        element.style[trimmedName.replace("m-css:", "").trim()] = value.trim();

    // Add event handlers:
    else if (trimmedName.startsWith("m-on:") && typeof value === "function")
        element.addEventListener(trimmedName.replace("m-on:", "").trim(), value);

    // If custom element watcher, call with internal state:
    else if (isAttributeWatcher(value)) 
        addPropIfState(element, trimmedName, value.__meshInternalState__);

    // Property > Attributes:
    else if (validProps.indexOf(trimmedName) != -1)
        element[trimmedName] = value;

    // Apply as HTML attribute:
    else element.setAttribute(trimmedName, value.toString());
}

export function addPropIfState(element: HTMLElement, name: string, value: MeshUI.IStateValue<any>) {
    const currentValue = value();

    // Event handler exception:
    if (name.startsWith("m-on:") && typeof currentValue === "function") {
        const eventName = name.replace("m-on:", "").trim();
        element.addEventListener(eventName, currentValue as EventListener);
        value.attachCallback<Function>((oldValue, newValue) => {
            element.removeEventListener(eventName, oldValue as EventListener);
            element.addEventListener(eventName, newValue as EventListener);
        }, null);
    }

    // Fallback, just attach value:
    else value.attach(element, name);
}