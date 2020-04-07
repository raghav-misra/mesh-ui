import { isStateObject, isAttributeWatcher, acceptsUserInput } from './type-checks';

/* Special cases for setting property > attribute */
const validProps = ["innerText", "value", "disabled", "classList", "nodeValue", "textContent"];

/* OP version of HTMLElement.setAttribute (supports events, special cases) */
export function setHtmlProp(element: HTMLElement, name: string, value: any) {
    const trimmedName: string = name.trim();

    // If state, call special state function:
    if (isStateObject(value))
        addPropIfState(element, trimmedName, value);

    // If custom element watcher, call with special watcher function:
    else if (isAttributeWatcher(value)) 
        addPropIfWatcher(element, trimmedName, value);

    // Individual style rules
    else if (trimmedName.startsWith("m-css:")) 
        element.style[trimmedName.replace("m-css:", "").trim()] = value.trim();

    // Add event handlers:
    else if (trimmedName.startsWith("m-on:") && typeof value === "function")
        element.addEventListener(trimmedName.replace("m-on:", "").trim(), value);

    // Property > Attributes:
    else if (validProps.indexOf(trimmedName) != -1)
        element[trimmedName] = value;

    // Apply as HTML attribute:
    else element.setAttribute(trimmedName, value.toString());
}

function addPropIfState(element: HTMLElement, name: string, value: MeshUI.IStateValue<any>) {
    const currentValue = value();
    const canBeBound = acceptsUserInput(element);

    // Event handler exception:
    if (name.startsWith("m-on:") && typeof currentValue === "function") {
        const eventName = name.replace("m-on:", "").trim();
        element.addEventListener(eventName, currentValue as EventListener);
        value.attachCallback<Function>((oldValue, newValue) => {
            element.removeEventListener(eventName, oldValue as EventListener);
            element.addEventListener(eventName, newValue as EventListener);
        }, null);
    }

    // Model for two-way binding:
    else if (name === "m-model" && canBeBound !== false) {
        // Set default value:
        if (canBeBound === "value") 
                (element as MeshUI.TInputElements).value = currentValue;
        else element.innerText = currentValue;

        // Set up change watcher:
        element.addEventListener("input", () => {
            if (canBeBound === "value") 
                value((element as MeshUI.TInputElements).value);
            else value(element.innerText);
        });
    } 

    // Fallback, just attach value:
    else value.attach(element, name);
}

function addPropIfWatcher(element: HTMLElement, name: string, value: MeshUI.IAttributeWatcher) {
    const currentValue = value.__meshInternalState__() as string;
    const [target, attribute] = value.__elementAttribute__;
    const canBeBound = acceptsUserInput(element);

    // Model for two-way binding:
    if (name === "m-model" && canBeBound !== false) {
        // Set default value:
        if (canBeBound === "value") 
                (element as MeshUI.TInputElements).value = currentValue;
        else element.innerText = currentValue;

        // Set up change watcher:
        element.addEventListener("input", () => {
            if (canBeBound === "value") 
                target.setAttribute(attribute, (element as MeshUI.TInputElements).value);
            else target.setAttribute(attribute, element.innerText);
        });
    } 
    // Else use internal state to bind
    else addPropIfState(element, name, value.__meshInternalState__);
}