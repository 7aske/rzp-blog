import React, { createContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "../@types/User";

interface AppContext {
	ctx: AppState,
	setCtx: Dispatch<SetStateAction<AppState>>
}

type AppState = {
	user: User | null;
}

const initialAppState: AppState = {
	user: null,
};

export const AppContext = createContext<AppContext>({
	ctx: initialAppState, setCtx: () => {
	},
});

export const AppContextProvider = (props: any) => {
	const [appState, setAppState] = useState(initialAppState);

	return <AppContext.Provider value={{ctx: appState, setCtx: setAppState}}>
		{props.children}
	</AppContext.Provider>;
};
