export function isStateObject(value) {
    if (value.__isMeshStateFunction__ && typeof value === "function") return true;
    return false;
}

export function isCustomElementWatcher(value) {
    if (value.__isMeshCustomElementWatcher__ && typeof value === "function") return true;
    return false;
}