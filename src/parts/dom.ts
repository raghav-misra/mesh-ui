/// <reference path="../../lib/mesh-ui.d.ts" />
import { isStateObject, isCustomElementWatcher } from './type-checks';

/* Converts child to Node, and appends it to parent Node */
export function render(child: any, parent: Node): Node {
    // Nodified child:
	let childAsNode: Node = child;

	// Loop thru child array:
	if (Array.isArray(child)) child.forEach(c => render(c, parent));

	// Is It A DOM Node?
	else if (child instanceof Node) parent.appendChild(child);

	// Is it Revue State?
	else if (isStateObject(child) && typeof child === "function") {
		// Render Current Value:
		childAsNode = render(child(), parent);

		// Bind as replacement:
        child.attachCallback(
            (oldValue, newValue, data) => displace(parent, data, newValue), 
        childAsNode);
	}

	// Is it Attr Watcher:
	else if (isCustomElementWatcher(child))
		childAsNode = render(child.__meshInternalState__, parent);

	// Fallback: convert to string & render Text node:
	else {
		childAsNode = document.createTextNode(child.toString());
		parent.appendChild(childAsNode);	
	}

    return childAsNode;
}

/* Wraps Node.replaceChild but converts new child to Node */
export function displace(parent, oldChild, newChild) {
	let childAsNode = newChild;

	// Is It A DOM Node?
	if (newChild instanceof Node) parent.replaceChild(newChild, oldChild)

	// Fallback: convert to string & render Text node:
	else {
		childAsNode = document.createTextNode(newChild.toString());
		parent.replaceChild(childAsNode, oldChild);
	}

	return childAsNode;
}
