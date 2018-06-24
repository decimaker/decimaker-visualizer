import * as React from 'react';
import {BaseComponent} from '../base-component';
import {ReactNode} from 'react';

export interface RenderOptionsInterface<TAction, TState, TPlayer>
{
    renderPlayerFn(player: TPlayer): string;
    renderActionFn(action: TAction): string;
    renderStateFn(state: TState): string;
}

export interface TreeNodeProps<TAction, TState, TPlayer>
{
    score: number;
    state: TState;
    action: TAction;
    isFinal: boolean;
    player: TPlayer;
}

export class TreeNode<TAction, TState, TPlayer> extends BaseComponent<TreeNodeProps<TAction, TState, TPlayer>>
{
    constructor(props: TreeNodeProps<TAction, TState, TPlayer>,
                context: any,
                renderOptions: RenderOptionsInterface<TAction, TState, TPlayer>,
                parentNode: TreeNode<TAction, TState, TPlayer> | null)
    {
        super(props, context);
    }

    render(): ReactNode
    {
        return (
            <div>{this.props.score}</div>
        );
    }
}