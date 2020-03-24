# mesh-ui

### Render once, update forever.

Paint your components only one time, and let data binding and event handling do the rest. 

## Why MeshUI?

- Tiny API (comes in under 5KB).
- Easy to learn. No extending classes, or dealing with messy `this` values.
- Purely function-based, call a function, write a function, call *that* function.
- On top of functional components, MeshUI has first-class support for custom elements!

## Get Started

Mesh is distributed as an ES Module  and as a global via a `<script>` tag. For most cases, the ES Module is recommended, but if you decide to use the global you can access it via `window.MeshUI` or just `MeshUI`. All examples  will use ESM.

**NPM** is the recommended method to get started: `npm i mesh-ui`.
(Doesn't work yet sorry)

*ESM*: `import MeshUI from 'mesh-ui';` 

*Global*: `<script src="./node_modules/.../mesh-ui.global.js"></script>`

**CDN** scripts are available, courtesy of *JSDelivr*. These are easy to drop in to your files to play around without any NPM config.

*ESM*: `import MeshUI from 'https://cdn.jsdelivr.net/gh/raghav-misra/mesh-ui/lib/mesh-ui.esm.js';`

*Global*: `<script src="https://cdn.jsdelivr.net/gh/raghav-misra/mesh-ui/lib/mesh-ui.global.js"></script>`

*D.TS*: [https://cdn.jsdelivr.net/gh/raghav-misra/mesh-ui/lib/mesh-ui.d.ts](https://cdn.jsdelivr.net/gh/raghav-misra/mesh-ui/lib/mesh-ui.d.ts)

## How was MeshUI built?

- Written in **Typescript**!
- Bundled using **Webpack**!
- Lit/Tagged Template JSX from **htm** (bundled into library)!



 
