/// <reference path="../../lib/mesh-ui.d.ts" />
export function isStateObject(value): value is MeshUI.IStateValue {
    if (value.__isMeshStateFunction__ && typeof value === "function") return true;
    return false;
}

export function isAttributeWatcher(value): value is MeshUI.IAttributeWatcher {
    if (value.__isMeshAttributeWatcher__ && typeof value === "function") return true;
    return false;
}

export function acceptsUserInput(element: HTMLElement): "value" | "innerText" | false {
    // Input element:
    const isInput = 
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement;

    // Normal element w/editable inner content:
    const contentEditable = element.contentEditable;

    if (isInput) return "value";
    else if (contentEditable) return "innerText";
    else return false;
}