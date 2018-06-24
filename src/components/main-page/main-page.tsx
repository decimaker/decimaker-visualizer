import React from 'react';
import {BaseComponent} from '../base-component';
import {Visualizer} from '../visualizer/visualizer';

export class MainPage extends BaseComponent
{
    public render(): React.ReactNode
    {
        return <div className="start-page">
            <Visualizer />
        </div>;
    }
}