import React, { useState } from "react";
import { ReactDOM } from "react-dom";
import { Switch, Route, withRouter } from "react-router-dom";
import { CommonContextProvider } from "../store/store";
import { mainRoutes, NewWindow } from "../helpers/commonUtility";

const DesktopVersion = () => {
	const window = NewWindow({ debug: false, frame: true });
	// var webC = window.webContents;
	// console.log(webC);
	// var document = webC.document;
	const el = document.createElement("div");
	return null; // ReactDOM.createPortal(<NextNote />, el);
};

const App = () => {
	// This will iterate routes to be rendered
	function renderRoutes() {
		return mainRoutes.map((route) => {
			const Comp = route.component;
			return (
				<Route key={route.path} path={route.path} exact={!!route.exact} component={Comp} />
			);
		});
	}

	return (
		<CommonContextProvider>
			<Switch>{renderRoutes()}</Switch>
		</CommonContextProvider>
	);
};

export default withRouter(App);
