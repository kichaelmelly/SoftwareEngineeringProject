# This file acts like a namespace - it allows us to select the functions we want to expose.
# From another file, we can import this directory as evident
# see src/backend/api/questions/routes.py

from .bool import gen_bool
from .que import gen_question