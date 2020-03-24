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

    /* JS Component Function */
    type IComponent = (props?: Record<string, any>, children?: any[]) => any; 

    /* State */
    type IStateFunction<T = any> = (...newState: T[]) => T | void;
    type IState = IStateValue | IStateObject | IStateArray;
    type IStateWatchCallback<T = any> = (oldValue: T, newValue: T, data: any) => any;
    interface IStateValue extends IStateFunction {
        attach(element: HTMLElement, property: string): void;
        attachCallback(callback: IStateWatchCallback, initialData: any);
        __isMeshStateFunction__: boolean;
    }
    interface IStateObject {
        [key: string]: IState;
        [key: number]: IState;
    }
    type IStateArray = Array<IState>;
    
    /* Custom Element */
    type IElementWatcherFunction<T = any> = (...newState: T[]) => T | void;
    interface IElementWatcher {
        
    }
    interface IElementConfig {
        tagName: string;
        render(props: IElementRenderProps): any;

        extends?: Type<HTMLElement> | [Type<HTMLElement>, string];
        statefulAttributes?: string[];
        defaultAttributeValues?: Record<string, string>;
    }
    interface IElementRenderProps {
        watch(attribute: string): IElementWatcher;
    }

    /* Utility to get class of type */
    interface Type<T> extends Function {
        new (...args: any[]): T;
    }
}