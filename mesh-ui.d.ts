declare module MeshUI {
    /* Methods */
    function jsx(tagName: string | Function, props: Record<string, any>, children: any[]);
    function html(strings: string[], ...templates: any[]);

    function render(child: any, parent: Node): Node;

    function displace(parent: Node, oldChild: Node, newChild: any): Node;

    function state<T>(initialState: T): IState;

    function customElement(config: IElementConfig): Type<HTMLElement>;

    const checkType: ITypeCheckers;

    /* Types */
    interface ITypeCheckers {
        isStateObject(value): boolean;
        isCustomElementWatcher(value): boolean;
    }

    /* JS Component Function */
    type IFunctionComponent = (props?: Record<string, any>, children?: any[]) => any; 

    /* State */
    type IStateValue<T = any> = ((...newState: T[]) => T | void) & {
        attach(element: HTMLElement, property: string): void;
        attachCallback<T>(callback: IStateWatchCallback<T>, initialData: any);
        __isMeshStateFunction__: boolean;
    };
    type IState<T = any> = IStateValue<T> | IStateObject<T> | IStateArray<T>;
    type IStateWatchCallback<T = any> = (oldValue: T, newValue: T, data: any) => any;
    interface IStateObject<T = any> {
        [key: string]: IState<T>;
    }
    type IStateArray<T = any> = IState<T>[];
    
    /* Custom Element */
    type IAttributeWatcher = (() => string) & {
        attachCallback(callback: IStateWatchCallback<string>, initialData: any);
        __meshInternalState__: IStateValue<string>;
        __isMeshAttributeWatcher__: boolean;
        __elementAttribute__: [HTMLElement, string];
    }

    interface IElementConfig {
        tagName: string;
        render(props: IElementRenderProps): any;

        extends?: Type<HTMLElement>;
        statefulAttributes?: string[];
        defaultAttributeValues?: Record<string, string>;
    }
    interface IElementRenderProps {
        watch(attribute: string): IAttributeWatcher;
        props: Record<string, string>;
        children: (Node & ChildNode)[];
        on(eventName: string, handler: Function): void;

        connect(callback: Function): void;
        disconnect(callback: Function): void;

        $instance: HTMLElement;
    }

    /* Misc */
    interface Type<T> extends Function {
        new (...args: any[]): T;
    }
    type TInputElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}