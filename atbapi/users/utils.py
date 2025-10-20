from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile
import requests 
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken

def compress_image(image_field, size=(800,800), quality=85):
    # Open the image
    # Convert to RGB if it's a PNG - якщо зображення PNG, перетворити на RGB
    image = Image.open(image_field).convert('RGB')

    # Зберігаємо оригінальне зображення його пропорції aspect ratio
    image.thumbnail(size, Image.LANCZOS)

    # робимо ім'я нового зображення
    uid = str(uuid.uuid4())[:10]
    image_name=f'{uid}.webp'

    # зберігаємо зображення в пам'яті
    output = io.BytesIO()

    image.save(output, format='WEBP', quality=quality)

    output.seek(0)

    # зберігаємо зображення в моделі
    optimized_image = ContentFile(output.getvalue())

    # повертаємо оптимізоване зображення та ім'я файлу
    return optimized_image, image_name

def verify_recaptcha(token):
    secret_key = settings.RECAPTCHA_SECRET_KEY
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": secret_key,
        "response": token
    }
    response = requests.post(url, data=payload)
    result = response.json()

    print(result)

    return result


def generate_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    refresh["id"] = user.id
    refresh["username"] = user.username
    refresh["email"] = user.email
    refresh["image"] = user.image_small if user.image_small else None
    refresh["date_joined"] = user.date_joined.strftime("%Y-%m-%d %H:%M:%S")

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }