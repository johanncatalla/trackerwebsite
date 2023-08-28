from django.shortcuts import render
from django.conf import settings
import json
import os

from .models import UserPreferences
from django.contrib import messages

def index(request):
    currency_data = []
    file_path = os.path.join(settings.BASE_DIR, 'currencies.json')
        
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)

        for key, value in data.items():
            currency_data.append({'name': key, 'value': value})

    exists = UserPreferences.objects.filter(user=request.user).exists()
    user_preferences = None
    
    if exists:
        user_preferences = UserPreferences.objects.get(user=request.user)
    
    if request.method == 'GET':        
        return render(request, 'preferences/index.html', {'currencies': currency_data, 
                                                          'user_preferences': user_preferences})
    else:
        currency = request.POST['currency']
        if exists:
            user_preferences.currency = currency
            user_preferences.save()
        else:
            UserPreferences.objects.create(user=request.user, currency=currency)
        messages.success(request, 'Changes Saved')
        return render(request, 'preferences/index.html', {'currencies': currency_data, 
                                                          'user_preferences': user_preferences})


        
