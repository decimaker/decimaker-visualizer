import React from 'react';
import {BaseComponent} from '../base-component';
import {NavLink} from 'react-router-dom';
import {RouteComponentProps, withRouter} from 'react-router';

class HeaderComponent extends BaseComponent<RouteComponentProps<{}>>
{
    public render(): React.ReactNode
    {
        return <header>
            <ul>
                <li><NavLink to="/start">Start</NavLink></li>
                <li><NavLink to="/sub-page/red">Red subpage</NavLink></li>
                <li><NavLink to="/sub-page/green">Green subpage</NavLink></li>
                <li><NavLink to="/sub-page/blue">Blue subpage</NavLink></li>
                <li><NavLink to="/does-not-exist">Does not exist</NavLink></li>
            </ul>
        </header>;
    }
}

export const Header = withRouter(HeaderComponent);