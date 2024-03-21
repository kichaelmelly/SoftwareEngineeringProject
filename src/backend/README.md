# Backend Python code

## What's going on here?

This is where all of the core logic of the code lives *i.e. question generation, text summarisation, etc*. It has been implemented using a Flask web server and communicates with the frontend via API calls.

In an attempt to modularise the code we have harnessed the powerful behaviour of Flask's blueprints. Each component of the code is stored in its own separate directory with all routing defined in their respective `routes.py`.

`questgen/que` contains the logic for all the different types of question that can be generated, stored in each file respectively

```shell
backend/
├── __init__.py
├── questgen
│   ├── que             
│   │   ├── __init__.py
│   │   ├── bool.py
│   │   ├── faq.py
│   │   ├── mcq.py
│   │   └── pphrase.py
│   └── routes.py
└── requirements.txt
```
