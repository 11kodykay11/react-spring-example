import React, { useReducer } from "react";

const CommonContext = React.createContext();

/* -------------------------------------------------------------------------------------------------------------------------------------------------
 ###--STATE--###
 -------------------------------------------------------------------------------------------------------------------------------------------------*/
// STATE - This defines the type of data maintained in the Redux store.
const CommonInitialState = {
	anyStateVariable: null,
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------
 ###--ACTIONS--###
 -------------------------------------------------------------------------------------------------------------------------------------------------*/
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
const actionTypes = {
	ACTION_NAME: "ACTION_VALUE",
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------
 ###--ACTION CREATORS--###
 -------------------------------------------------------------------------------------------------------------------------------------------------*/
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
const commonActions = {
	actionName: (dispatch, parameter) => dispatch({ type: actionTypes.ACTION_NAME, parameter }),
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------
 ###--REDUCERS--###
 -------------------------------------------------------------------------------------------------------------------------------------------------*/
// REDUCERS - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
//Switch can also be used here
const CommonReducer = (state, action) => {
	if (action.type === actionTypes.ACTION_NAME) {
		return {
			...state,
			anyStateVariable: action.parameter,
		};
	}

	return state;
};

/* -------------------------------------------------------------------------------------------------------------------------------------------------
 ###--PROVIDER--###
 -------------------------------------------------------------------------------------------------------------------------------------------------*/
// PROVIDER - Provider is context provided to children. This is basically state and dispatch passed to children.
// Only used in TOP parent function
const Provider = ({ context, reducer, initialState, children }) => {
	const Context = context;
	const [state, dispatch] = useReducer(reducer, initialState);
	window.log("Provider...", state);
	return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

// EXPORTS for multiple context providers
export const CommonContextProvider = ({ children }) => {
	return (
		<Provider context={CommonContext} reducer={CommonReducer} initialState={CommonInitialState}>
			{children}
		</Provider>
	);
};

export const COMMON_STORE = {
	actions: commonActions,
	context: CommonContext,
};
