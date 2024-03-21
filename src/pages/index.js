import Link from 'next/link';
import Head from 'next/head';
import axios from "axios";
import  { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import logger from '../pino_logger/logger.js'

function Header(){
	return (
		<div className="top-bar">
			<div className="menu" id="title"><h1><Link href='/'><a>Quiz &#39;N&#39; Sum</a></Link></h1></div>
			<div className="menu" id="about"><h1><Link href='/about'><a>About</a></Link></h1></div>
		</div>
	);
}

//clears text box value once called
function handleReset(){
	const textarea=document.querySelector('#textinput')
	textarea.value=''
	logger.info('Text box successfully reset')
}

function Button(props){
	return <button className={props.type ? props.type : "defaultButton"} id={props.name ? props.name : "button"} onClick={props.handler}>
		{props.title ? props.title : "Button"}</button>
}

//export handler takes the list items, puts into correct format within an array, then export as questions.txt (or whatever name the user chooses)
async function handleExport(){
	const element = document.createElement("a")
	const list = Array.from(document.querySelector('#question-output').childNodes)
	const filetype = document.querySelector('#export-selector').value
	const notification = document.querySelector('#notification')
	if(filetype === ''){
		notification.textContent="Please select an export type"
		notification.style.display = "block"
		logger.error('No export type selected')
		return;
	}
	let questionsList = []
	list.forEach((item)=>{
		questionsList.push("Question "+(list.indexOf(item)+1)+": "+item.innerText+"\n")
	})
	//text file
	if(filetype == 'text'){
		const file = new Blob(questionsList, {type: 'text/plain;charset=utf-8'});
		element.href = URL.createObjectURL(file)
		element.download = "questions.txt"
		document.body.appendChild(element)
		element.click()
		logger.info('Successfully exported text questions')
	//PDF file
	} else if (filetype == 'pdf'){
		const file = new jsPDF('p','pt')
		await html2canvas(document.querySelector('#question-container'), {
		}).then((canvas) => {
			file.addImage(canvas.toDataURL("image/png"), 'PNG', 15, 15,)
		})
		file.save("questions.pdf")
		logger.info('Successfully exported PDF questions')
	}
	notification.textContent=""
	notification.style.display = "none"
}

// Function that carries out the initial post to pages/api/get_questions.js
async function handleGen() {
	const input = document.querySelector('#textinput').value
	const option = document.querySelector('#ques-gen-selector').value
	const list = document.querySelector('#question-output')
	const notification = document.querySelector('#notification')
	const exportbuttons = document.querySelector('#export-container')
	exportbuttons.style.display="none"
	notification.style.display="none"
	let questions;
	//empties the quiz output box when called
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
	//if user gives no input, they will be given an indicator to provide input, then function returns nothing
	if(input===""){
		notification.textContent="Input text to use Question Generation!"
		notification.style.display="block"
		logger.error('No text inputted')
		return;
	}
	//if user has not selected an option, they will be given an indicator to select, then function returns nothing
	if(option===""){
		notification.textContent="Please select Generation Option"
		notification.style.display="block"
		logger.error('No option selected')
		return;
	}
	//generation status for user
	notification.style.display="block"
	notification.textContent="Generating..."
	axios
	.post('/api/get_questions', {
		text: input,
		option: option,
	}).then((response) => {
		logger.info('Posted to API')
		logger.info(response.data.questions)
		if(option==='faq' || option==='mcq'){
			questions = response.data.questions.questions
		} else if (option == 'bool'){
			questions = response.data.questions
		}
		questions.forEach((item)=>{
			let listItem=document.createElement("li")
			if(option==='bool'){
				listItem.textContent = item
			} else if(option==='faq'){
				listItem.textContent = item.Question
			} else if(option==='mcq'){
				let multipleChoiceList = document.createElement("ul")
				let multipleChoices = item.options
				multipleChoices.push(toProperCase(item.answer))
				multipleChoices = shuffleArray(multipleChoices)
				multipleChoices.forEach((selection) =>{
					let l = document.createElement("li")
					l.textContent = selection
					multipleChoiceList.appendChild(l)
				})
				listItem.textContent = item.question_statement
				listItem.appendChild(multipleChoiceList)
			}
			list.appendChild(listItem)
		})
		notification.style.display="none"
		exportbuttons.style.display="block"
		list.scrollIntoView({behavior: "smooth"})


	}).catch(err => logger.error(err))
}


/* questgen returns the answer for MCQs in lower case, this function converts them
to proper case */
function toProperCase(s){
  return s.toLowerCase().replace(/^(.)|\s(.)/g,
          function($1) { return $1.toUpperCase(); });
}


// Shuffle array function for mcq - so the answer isn't in the same list location each time.
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
 }

function Main(){
	return (
		<div className="container">
			<Head>
				<title>Quiz &#39;N&#39; Sum</title>
			</Head>
			<Header/>
			<h2>Enter your text below for instant summarisation!</h2>
			{/* Text box */}
			<div id="text-container">
				<div id="text-container-inner">
					<textarea rows='15' cols='80' id="textinput" placeholder='Enter your message...'></textarea>
				</div>
			</div>
			<div id = "notification"></div>
			{/* Buttons */}
			<div id="button-container">
				<Button type="text-buttons" name="reset-text-button" handler={handleReset} title="Reset Text"/>
				<select name="gen-selection" id="ques-gen-selector">
					<option value="">Select Generation Option</option>
					<option value="bool">Boolean (Yes/No)</option>
					<option value="mcq">Multiple Choice</option>
					<option value="faq">FAQ</option>
				</select>
				<Button type="text-buttons" name="ques-gen-button" handler={handleGen} title="Generate Questions"/>
			</div>
			{/* Question box/output */}
			<div id="question-container">
				<ol id='question-output'>
				</ol>
			</div>
			{/* Export type selector */}
			<div id="export-container">
				<select name="export" id="export-selector">
					<option value="">Export as...</option>
					<option value="text">Text</option>
					<option value="pdf">PDF</option>
				</select>
				<Button type="export-buttons" name="export-button" handler={handleExport} title="Export"/>
			</div>
		</div>
	)
}

export default function App() {
	logger.info("Served generator website")
	return (
		<div className="App">
			<Main/>
		</div>
	);
}