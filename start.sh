#!/bin/bash

# Exit early on errors
set -eu

# Python buffers stdout. Without this, you won't see what you "print" in the Activity Logs
export PYTHONUNBUFFERED=true

# Install Python 3 virtual env
VIRTUALENV=portfolio_env

if [ ! -d $VIRTUALENV ]; then
  python3 -m venv $VIRTUALENV
fi

if [ ! -f $VIRTUALENV/bin/pip ]; then
  curl --silent --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | $VIRTUALENV/bin/python
fi

#activate virtual env

$VIRTUALENV/Scripts/activate

# Install the requirements
cd .\backend\

pip install -r requirements.txt

# Run a glorious Python 3 server
python manage.py runserver