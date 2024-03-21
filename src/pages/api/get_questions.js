import axios from "axios";

export default async function handler(req, res) {
	const instance = axios.create({
		baseURL: process.env.BASE_URL,
	});


// API function that posts the text from the frontend to the flask endpoint, then returns the processed 'questions' to the frontend.
	const option = req.body.option
	await instance
		.post("/get_"+option+"_questions",{
            text: req.body.text,
        })
		.then((response) => {
			const data = response.data.questions;
			res.status(200).json({ "questions": data });
		})
		.catch((error) => {
			return res.status(error.status || 500).end(error.message);
		});
}