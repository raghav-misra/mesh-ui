/// <reference path="../../lib/mesh-ui.d.ts" />
import { render } from './dom';
import { state } from './state';

export function customElement(config: MeshUI.IElementConfig) {
    // Check passed configuration for falsy values:
    const checkedConfig: MeshUI.IElementConfig = {
        tagName: config.tagName,
        render: config.render,
        extends: config.extends || HTMLElement,
        statefulAttributes: config.statefulAttributes || [],
        defaultAttributeValues: config.defaultAttributeValues || Object.create(null)
    };	

    // Set up attribute binding:
    const attributeWatchers: Record<string, MeshUI.IStateArray<string>> = Object.create(null);
    const watchElement = (element: HTMLElement, attribute: string) => {
        attributeWatchers[attribute] = attributeWatchers[attribute] || [];
        const internalState = state(element.getAttribute(attribute)) as MeshUI.IStateValue<string>;
        attributeWatchers[attribute].push(internalState);

        const stateWrapper: MeshUI.IElementWatcherFunction = () => internalState() as string;
        const attachCallback = (callback: MeshUI.IStateWatchCallback<string>, initialData: any) => 
            internalState.attachCallback(callback, initialData);
        return Object.assign(stateWrapper, { 
            attachCallback, __meshInternalState__: internalState }) as MeshUI.IElementWatcher;
    };

    // Inner component class:
    const elementClass = class extends checkedConfig.extends {
        static get observedAttributes() { return checkedConfig.statefulAttributes; }
        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            attributeWatchers[name] && attributeWatchers[name].forEach(
                s => (s as MeshUI.IStateValue)(newValue));
        }

        constructor() {
            super(); const instance = this;

            // Make sure all statefulAttributes exist:
            checkedConfig.statefulAttributes.forEach((attribute => 
                !instance.hasAttribute(attribute) && 
                instance.setAttribute(attribute, "")));

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
            const children = checkedConfig.render({
                // Bind values to attributes: 
                watch: (attribute) => watchElement(instance, attribute)
            });

            // Append children if not falsy:
            children && render(children, instance);
        }
    }

    customElements.define(checkedConfig.tagName, elementClass);
    return elementClass;
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