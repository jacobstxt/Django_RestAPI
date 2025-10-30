# Проєкт Django API (Reddit)
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

## Додаю CustomUser
```
py manage.py startapp users
pip install -r requirements.txt - ставляться бібліотеки з requirements.txt

py manage.py makemigrations users
py manage.py migrate

py manage.py runserver 4099

http://127.0.0.1:4099/api/users/generate/ - в Postman генерую рандомних юзерів
```

## Створюю проект на React+Vite
```
npm create vite@latest
```


## Додаю бібліотеку для взаємодії сервера з фронтендом
```
pip install django-cors-headers


Додаю в settings.py в Middleware [
    "corsheaders.middleware.CorsMiddleware",  # має бути якомога вище
    "django.middleware.common.CommonMiddleware",
]

Далі прописую в цьому самому файлику 
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## Ставлю замість axios redux toolkit
```
npm i @reduxjs/toolkit react-redux 
```

## Буду використовувати Tailwindcss для стилізації
```
npm install tailwindcss @tailwindcss/vite
```

## Для маршрутизації на фронтенді ставлю react-router
```
 npm i react-router
```

## Start Working Reddit
## Create topic
```
cd atbapi
py manage.py startapp topics
py manage.py makemigrations topics
py manage.py migrate
```
## Роблю Seed topics
```
python manage.py shell
from topics.seed_topics import run
run()
```


## Create posts
```
cd atbapi
py manage.py startapp posts
py manage.py makemigrations posts
py manage.py migrate
```


## Запуск проекту
```
.venv\Scripts\activate.bat
cd atbapi
py manage.py runserver 4099
```



