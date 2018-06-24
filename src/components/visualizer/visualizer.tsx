import {BaseComponent} from '../base-component';
import {RenderOptionsInterface, TreeNode, TreeNodeProps} from './tree_node';
import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';

export class Visualizer<TAction, TState, TPlayer> extends BaseComponent
{

    constructor(props: any, context: any,
                renderOptions: RenderOptionsInterface<TAction, TState, TPlayer>)
    {
        super(props, context);
    }

    render(): ReactNode
    {
        const props: TreeNodeProps<string, string, string> = {
            action: 'action',
            state: 'state',
            score: 0,
            isFinal: false,
            player: 'player'
        };

        const options: RenderOptionsInterface<string, string, string> = {
            renderActionFn(action): string {
                return JSON.stringify(JSON.parse(action))
            },
            renderPlayerFn(player): string {
                return JSON.stringify(JSON.parse(player))
            },
            renderStateFn(state): string {
                return JSON.stringify(JSON.parse(state))
            },
        };

        let parentNode = new TreeNode(props, this.context, options, null);
        let exampleNode = new TreeNode(props, this.context, options, parentNode);

        return <div>VISUALIZER</div>
    }

    public renderNode(node: TreeNode<TAction, TState, TPlayer>,
                      parentNode: TreeNode<TAction, TState, TPlayer>)
    {
        // vonal a parenttől a childrenig
        // kirajzoljuk a childrent
    }
}