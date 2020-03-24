declare module MeshUI {
    interface IProps {
        [name: string]: any;
    }

    type IComponent = (props?: IProps, children?: any[]) => any; 

    function jsx(tagName: string | Function, props: IProps, children: any[]);

    function dom(strings: string[], ...templates: any[]);

    function render(child: any, parent: Node): Node;

    function displace(parent: Node, oldChild: Node, newChild: any): Node;
}