/// <reference path="../../lib/mesh-ui.d.ts" />
import { render } from './dom';
import htm from './htm';
import { setHtmlProp } from './set-property';


/* Hyperscript function renders Component or DOM nodes */
export function jsx(tagName: string | MeshUI.IComponent, props: Record<string, any>, ...children: any[]) {
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



/* Lit tagged template version of jsx() [thx htm]: */
export const html = htm.bind(jsx);