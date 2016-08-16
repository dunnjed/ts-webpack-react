import * as React from "react";


export interface HelloProps { compiler: string; framework: string; }

export default class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>
        The {this.props.compiler} and {this.props.framework} compiler is working
        </h1>;
    }
}