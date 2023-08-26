from waitress import serve
from trackerwebsite.wsgi import application
serve(application, host='localhost', port='8000')
