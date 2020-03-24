/// <reference path="../../lib/mesh-ui.d.ts" />
import { setHtmlProp } from './set-property';

export function state<T = any>(initialState: T): MeshUI.IState {
    // If array, return array with states:
    if (Array.isArray(initialState)) {
        const returnArray: MeshUI.IStateArray = [];
        initialState.forEach((value) => returnArray.push(state(value)));
        return returnArray;
    }

    // If object, return object with states:
    else if (typeof initialState === 'object') {
        const returnObject: MeshUI.IStateObject = Object.create(null);
        Object.keys(initialState).forEach(key => 
            initialState.hasOwnProperty(key) && (returnObject[key] = state(initialState[key])));
        return returnObject;
    }

	// Storage inaccessible outside function:
	let internalValue = initialState;

	// Store bindings:
	const dataList = [];
	const callbacks = [];

	const returnFunction = (...newState) => {
		// Set:
		if (newState.length > 0) {
			const oldValue = internalValue;	
			internalValue = newState[0];

			dataList.forEach(({ element, property }) => 
                setHtmlProp(element, property, internalValue));
			
			callbacks.forEach((c, i) => {
				const [callback, data] = c;
				callbacks[i][1] = callback(oldValue, newState[0], data);
			});
		}
		// Get: 
		else return internalValue;
	}

	returnFunction.attach = (element: HTMLElement, property: string) => {
        // Add to bindings list:
		dataList.push({ element, property });

		// Set Property
		setHtmlProp(element, property, internalValue);
	}

    // Add callback & initialData to callback list
    returnFunction.attachCallback = (callback, data) => callbacks.push([callback, data]);
    
    // State Object Identifier:
	returnFunction.__isMeshStateFunction__ = true;

    // No touchy touchy
	Object.seal(returnFunction);
	Object.freeze(returnFunction);

    // Return it
	return returnFunction;
};
