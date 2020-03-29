/// <reference path="../../lib/mesh-ui.d.ts" />
export function isStateObject(value): value is MeshUI.IStateValue {
    if (value.__isMeshStateFunction__ && typeof value === "function") return true;
    return false;
}

export function isAttributeWatcher(value): value is MeshUI.IAttributeWatcher {
    if (value.__isMeshAttributeWatcher__ && typeof value === "function") return true;
    return false;
}