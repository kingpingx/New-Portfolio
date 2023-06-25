# New-Portfolio
This is new Portfolio developed using Angular, Django and hosted on Python Anywhere

### backend
# set up env
    python -m venv portfolio_env

# install dependencies 
    cd backend
    pip install -r requirements.txt

# run application
    python manage.py runserver

### front-end
# To save changes to server (Django) so that current chnages will apply
    ng build --configuration production --output-path ../backend/static/angular-build --watch --output-hashing none
