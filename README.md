# Проєкт Django API
```
py -m venv .venv
py --version
```

## Активую env
```
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
py -m pip install Django
python -m django --version
```

## Створюю проект
```
django-admin startproject atbapi
cd atbapi
py manage.py runserver 4099
```

## Встановлюю базу даних
```
pip install psycopg2-binary
В файлику settings.py 
 DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': '',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'PORT': ''
    }
}
py manage.py migrate
```


