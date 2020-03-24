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
        isStateObject: boolean;
        isCustomElementWatcher: boolean;
    }

    interface IElementConfig {
        tagName: string;
        render(props: IElementRenderProps): any;

        extends?: string | [Type<HTMLElement>, string];
        statefulAttributes?: string[];
        defaultAttributeValues?: Record<string, string>;
    }

    interface IElementRenderProps {

    }

    type IComponent = (props?: Record<string, any>, children?: any[]) => any; 

    type IStateFunction<T = any> = (...newState: T[]) => T | void;
    interface IState extends IStateFunction {
        attach(element: HTMLElement, property: string): void;
        attachCallback(callback: IStateWatchCallback, initialData: any);
        __isMeshStateObject__: boolean;
    }
    type IStateWatchCallback<T = any> = (oldValue: T, newValue: T, data: any) => any;

    interface Type<T> extends Function {
        new (...args: any[]): T;
    }
}