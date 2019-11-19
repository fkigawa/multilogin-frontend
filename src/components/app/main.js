/*
This is the entry point for the app. Here, I am rendering the App component where there is a root id (in index.html).
The BrowserRouter wraps the App in order to access the router functionality that streamlines url changes.

Within the index.html file, the bundle file is rendered into HTML, alongside the App component
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
