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