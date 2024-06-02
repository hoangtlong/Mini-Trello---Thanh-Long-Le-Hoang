	import './App.css';
	import { ref, child, set } from "firebase/database";
	import {database} from "./firebase/firebaseConfig";

	import RoutePage from "./route/Route";

	function App() {

		const dbRef = ref(database);
		
		//get(child(dbRef, `users`)).then((snapshot) => {
		//	if (snapshot.exists()) {
		//	console.log(snapshot.val());
		//	} else {
		//	console.log("No data available");
		//	}
		//}).catch((error) => {
		//	console.error(error);
		//});

	return (
		<div className="App">
			<RoutePage/>
		</div>
	);
	}

	export default App;
