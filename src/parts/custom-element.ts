/// <reference path="../../mesh-ui.d.ts" />
import { render } from './dom';
import { state } from './state';

function getAttributes(el: HTMLElement) {
    const attributes: Record<string, string> = Object.create(null);
    Array.from(el.attributes).forEach(key => {
        attributes[key.nodeName] = key.nodeValue;
    });
    return attributes;
}

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

        const stateWrapper = () => internalState();
        stateWrapper.attachCallback = (callback: MeshUI.IStateWatchCallback<string>, initialData: any) => 
            internalState.attachCallback(callback, initialData);
        stateWrapper.__isMeshAttributeWatcher__ = true;
        stateWrapper.__meshInternalState__ = internalState;
        return stateWrapper as MeshUI.IAttributeWatcher;
    };

    // Holds lifecycle callbacks: 
    const lifecycleCallbacks = {
        connect: [],
        disconnect: []
    };

    // Inner component class:
    const elementClass = class extends checkedConfig.extends {
        // Watchers and data binding:
        static get observedAttributes() { return checkedConfig.statefulAttributes; }
        attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            attributeWatchers[name] && attributeWatchers[name].forEach(
                s => (s as MeshUI.IStateValue)(newValue));
        }

        // When Element Is Created:
        constructor() {
            super(); const instance = this;

            // Add default values to attributes if blank:
            Object.keys(checkedConfig.defaultAttributeValues).forEach(attribute => 
                checkedConfig.defaultAttributeValues.hasOwnProperty(attribute) &&
                !instance.hasAttribute(attribute) && instance.setAttribute(
                    attribute, checkedConfig.defaultAttributeValues[attribute])
            );

            // Make sure all statefulAttributes exist:
            checkedConfig.statefulAttributes.forEach(attribute => 
                !instance.hasAttribute(attribute) && instance.setAttribute(attribute, "")
            );

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
                watch: (attribute: string) => watchElement(instance, attribute),
                props: getAttributes(instance),
                children: Array.from(instance.children),
                on: (eventName: string, handler: Function) => 
                    instance.addEventListener(eventName, handler as EventListener),
                connect: (callback: Function) => lifecycleCallbacks.connect.push(callback),
                disconnect: (callback: Function) => lifecycleCallbacks.disconnect.push(callback),
                
                $instance: instance,
            });

            // Append children if not falsy:
            children && render(children, instance);
        }

        // Lifecycle hooks:
        connectedCallback() {
            lifecycleCallbacks.connect.forEach(c => c());
        }
        disconnectedCallback() {
            lifecycleCallbacks.disconnect.forEach(c => c());
        }
    }

    customElements.define(checkedConfig.tagName, elementClass);
    return elementClass;
}