import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import CoverPage from './CoverPage';
const Start = () => {
	const navigate = useNavigate();
	const { startQuiz, showStart } = useContext(DataContext);
	return (
		<CoverPage>
		<section className="w-full" style={{ display: `${showStart ? "block" : "none"}` }}>
			<div className="container">
				<div className="row vh-100 align-items-center justify-content-center">
					<div className="col-lg-8 flex flex-col items-center justify-center">
						<h1 className="fw-bold mb-4 text-white">Basic Quiz</h1>
						<div>
							<button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">
								Start Quiz
							</button>
							<button onClick={() => navigate("/home")} className="ml-5 btn px-4 py-2 bg-light text-dark fw-bold">
								Home
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		</CoverPage>
	);
};

export default Start;
