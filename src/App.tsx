import React from "react";
import { HashRouter } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { AppContextProvider } from "./context/AppContext";
import { Router } from "./router/Router";
import { Head } from "./components/meta/Head";

function App() {
	return (
		<main className="App">
			<Head title="Placeholder Company"
			      author="Placeholder Company"
			      description="Placeholder Company Blog"
			      image={process.env.REACT_APP_PUBLIC_URL + "/code.png"}/>
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
