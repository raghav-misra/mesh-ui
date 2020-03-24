/// <reference path="../../lib/mesh-ui.d.ts" />
import { render } from './dom';

export function customElement(config: MeshUI.IElementConfig) {
    // Check passed configuration for falsy values:
    const checkedConfig: MeshUI.IElementConfig = {
        tagName: config.tagName,
        render: config.render,
        extends: config.extends || HTMLElement,
        statefulAttributes: config.statefulAttributes || [],
        defaultAttributeValues: config.defaultAttributeValues || Object.create(null)
    };

    // Get super class to extend from:
    let valueToExtend: MeshUI.Type<HTMLElement>;
    if (Array.isArray(checkedConfig.extends)) valueToExtend = checkedConfig.extends[0];
    else valueToExtend = checkedConfig.extends;

    // Inner component class:
    const elementClass = class extends valueToExtend {
        static get observedAttributes() { return checkedConfig.statefulAttributes; }

        constructor() {
            super(); const instance = this;

            // Predefine default values:
            Object.keys(checkedConfig.defaultAttributeValues).forEach(name => 
                checkedConfig.defaultAttributeValues.hasOwnProperty(name) && (
                !instance.hasAttribute(name)) &&
                instance.setAttribute(name, checkedConfig[name]
            ));

            // Check that all statefulAttributes defined:
            checkedConfig.statefulAttributes.forEach
                (name => !instance.hasAttribute(name) && instance.setAttribute(name, ""));

            // Call render:

            // Append children if not falsy:
        }
    }
}

/*
customElement({
    // Tag name in HTML || required
    tagName: "hello-world",

    // Function that returns children or falsy value || required
    render(utils) {

    },

    // Native/Custom Element Constructor and/or to extend from || default: HTMLElement
    extends: [HTMLAnchorElement, "a"],

    // Attributes to observe changes on || default: undefined
    statefulAttributes: ["data-name"],

    // Default attribute values || default: undefined 
    defaultAttributeValues: {           
        "data-name": "xdddd"
    }
});
*/