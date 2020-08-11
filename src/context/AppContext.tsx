import React, { createContext, useState } from "react";

type AppState = {
	user: User | null;
}

const initialAppState: AppState = {
	user: null,
};

export const AppContext = createContext([{}, () => {}]);

export const AppContextProvider = (props: any) => {
	const [appState, setAppState] = useState(initialAppState);

	return <AppContext.Provider value={[appState, setAppState]}>
		{props.children}
	</AppContext.Provider>;
};
