import React from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { AppContextProvider } from "./context/AppContext";
import { Router } from "./router/Router";

function App() {
	return (
		<main className="App">
			<HashRouter basename="/">
				<AppContextProvider>
					<Navbar/>
					<Router/>
					<Footer/>
				</AppContextProvider>
			</HashRouter>
		</main>
	);
}

export default App;
