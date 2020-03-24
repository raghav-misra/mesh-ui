declare module MeshUI {
    /* Methods */
    function jsx(tagName: string | Function, props: IProps, children: any[]);

    function dom(strings: string[], ...templates: any[]);

    function render(child: any, parent: Node): Node;

    function displace(parent: Node, oldChild: Node, newChild: any): Node;

    function state<T>(initialState: T): IState;

    /* Types */
    interface IProps {
        [name: string]: any;
    }

    type IComponent = (props?: IProps, children?: any[]) => any; 

    type IStateFunction<T = any> = (...newState: T[]) => T | void;
    interface IState extends IStateFunction {
        attach(element: HTMLElement, property: string): void;
        attachCallback(callback: IStateWatchCallback, initialData: any);
        __isMeshStateObject__: boolean;
    }
    type IStateWatchCallback<T = any> = (oldValue: T, newValue: T, data: any) => any;
}