<h1 align="center">Quiz 'N' Sum</h3>

<div align="center">

[![ESLint](https://github.com/SETAP2021/cw-code-t22/actions/workflows/reviewdog.yml/badge.svg)](https://github.com/SETAP2021/cw-code-t22/actions/workflows/reviewdog.yml)
[![Checks](https://github.com/SETAP2021/cw-code-t22/actions/workflows/pychecks.yml/badge.svg)](https://github.com/SETAP2021/cw-code-t22/actions/workflows/pychecks.yml)
[![Pylint](https://github.com/SETAP2021/cw-code-t22/actions/workflows/pylint.yml/badge.svg)](https://github.com/SETAP2021/cw-code-t22/actions/workflows/pylint.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

</div>

---

<p align="center"> An easy way to summarise and generate questions for your notes!
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Quiz 'N' Sum throws away your revision notes and provides an active learning platform for you to learn from! With the pasting of a little bit of text and the click of a few buttons, a learner is given a bespoke set of questions to revise from. We aim to make revision for exams and tests no hassle at all.

## 🏁 Getting Started <a name = "getting_started"></a>

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

#### For the frontend:

1. Install Node.js

    For Windows, simply install the LTS from the website https://nodejs.org/en/

    For Linux, type the following commands into your Command Line Interface:

    ```sh
    curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh -o install_nvm.sh
    bash install_nvm.sh
    ```

#### For the Backend:

1. Install the latest version of Python (...Python3.x)

   * https://www.python.org/downloads/

2. If pip isn't already installed (from your Python installation):

   * https://pip.pypa.io/en/stable/installation/

Once all installations are complete, simply clone the repo into a directory of your choice.

### Installing

#### Running the Frontend

1. Once inside the repo directory, enter the src folder and install all required modules/dependencies:

    ```sh
    cd src
    npm install
    ```

2. Run the nextjs server using the command:

    ```sh
    npx next dev
    ```

3. You should have an output that looks like this:

    ```sh
    ready - started server on 0.0.0.0:3000, url: http://localhost:3000
    event - compiled client and server successfully in 776 ms (124 modules)
    ```

    This indicates that the server is running and has successfully compiled.
    You can now access the website by opening your browser and inputting the URL http://localhost:3000.

#### Running the Backend

1. Enter the backend folder:

    ```sh
    cd src/backend
    ```

2. Install the required dependencies by running the command:

    ```sh
    pip install -r requirements.txt
    ```

    This should install all required dependencies which allow you to run the server.

3. Run the flask server using the command:

    ```sh
    flask run
    ```

4. You should have an output that looks like this:

    ```sh
    * Serving Flask app 'wsgi.py' (lazy loading)
    * Environment: development
    * Debug mode: on
    * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
    * Restarting with stat
    * Debugger is active!
    * Debugger PIN: 516-458-968
    ```

    This indicates the server is running and ready to take requests from our frontend (The website).

## 🔧 Running the tests <a name = "tests"></a>

In order to run the tests:

1. Run the frontend on a different terminal.

2. Run the backend on another terminal.

3. Open up a different terminal and change the directory to the src folder.

    ```sh
    cd src
    ```

4. Install playwright and run the tests

    ```sh
    npx playwright install
    npx playwright test
    ```

## 🎈 Usage <a name="usage"></a>

1. Once the Frontend server and Backend server are both running, simply input a piece of text of your choice into the input box on the website.

2. After a few seconds, the Backend will process your input and then return an output to the frontend, where it is outputted into a question box.

3. You can choose what to do with the output, leave it, read it out, or export it.

4. In order to export, simply select an export type (text or PDF) and save to your machine.

5. Enjoy your generated questions!

## ⛏️ Built Using <a name = "built_using"></a>

### Frontend

- [React](https://reactjs.org/) - Library
- [Next.js](https://nextjs.org/) - Web/Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Axios](https://axios-http.com/) - HTTP Client/Library
- [jsPDF](https://github.com/parallax/jsPDF) - PDF Generation Library
- [html2canvas](https://github.com/niklasvh/html2canvas) - JS HTML Renderer

### Backend

- [Flask](https://flask.palletsprojects.com/en/2.1.x/) - Web Application Framework
- [Flask_Cors](https://github.com/corydolphin/flask-cors) - Flask Extension for CORS handling
- [Pytest](https://github.com/pytest-dev/pytest/) - Python Testing Framework
- [NLTK](https://github.com/nltk/nltk) - NLP platform (Natural Language Toolkit)
- [Pytorch](https://pytorch.org/) - Machine Learning Framework
- [Hugging_Face_Transformers](https://huggingface.co/docs/transformers/index) - Deep Learning Library

## ✍️ Authors <a name = "authors"></a>

- [Connor Brooks @Viibrant](https://github.com/Viibrant) - Backend
- [Azamat @UP957417](https://github.com/UP957417) - Backend
- [Michael Kelly @UP2010416](https://github.com/UP2010416) - Frontend
- [Ben Singleton @UP2013394](https://github.com/UP2013394) - Frontend
- [Rhys Werrell @UP2014399](https://github.com/UP2014399) - Frontend & Testing

