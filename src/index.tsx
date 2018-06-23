import 'reflect-metadata';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {container} from './services/container';
import {Container} from 'inversify';
import {BrowserRouter} from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router';
import {StartPage} from './components/start-page/start-page';
import {NoMatchPage} from './components/no-match-page/no-match-page';
import {SubPage} from './components/sub-page/sub-page';
import {ExampleService} from './services/example-service';
import {Header} from './components/header/header';

container.bind(Container).toConstantValue(container);
container.bind(ExampleService).toSelf();

const appElement = document.createElement('div');
appElement.classList.add('app');

declare const BASE_HREF: string;

ReactDOM.render(
    <BrowserRouter basename={BASE_HREF}>
        <>
            <Header />
            <main>
                <Switch>
                    <Route path="/start" component={StartPage} />
                    <Route path="/sub-page/:color" component={SubPage} />
                    <Redirect exact from="/" to="/start" />
                    <Route component={NoMatchPage} />
                </Switch>
            </main>
        </>
    </BrowserRouter>,
    document.body.appendChild(appElement)
);