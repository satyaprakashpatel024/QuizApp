import React from "react";
import Start from "./components/Start.js";
import Quiz from "./components/Quiz.js";
import Result from "./components/Result.js";
import { DataProvider } from "./context/dataContext.js";

function AttemptQuiz() {
	return (
		<DataProvider>
			{/* Welcome Page */}
			<Start />

			{/* Quiz Page */}
			<Quiz />

			{/* Result Page */}
			<Result />
		</DataProvider>
	);
}

export default AttemptQuiz;
