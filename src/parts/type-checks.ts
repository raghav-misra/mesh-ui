export function isStateObject(value) {
    if (value.__isMeshStateFunction__ && typeof value === "function") return true;
    return false;
}

export function isAttributeWatcher(value) {
    if (value.__isMeshAttributeWatcher__ && typeof value === "object") return true;
    return false;
}