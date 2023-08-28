from django.shortcuts import render
from django.conf import settings
import json
# 
import os

def index(request):
    currency_data = []
    file_path = os.path.join(settings.BASE_DIR, 'currencies.json')
    
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)

        for key, value in data.items():
            currency_data.append({'name': key, 'value': value})

    return render(request, 'preferences/index.html', {'currencies': currency_data})