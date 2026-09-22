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


def download_image_as_file(url: str, timeout: int = 10, max_size: int = 5 * 1024 * 1024) -> io.BytesIO:
    try:
        resp = requests.get(url, stream=True, timeout=timeout)
        resp.raise_for_status()
    except requests.RequestException as e:
        raise ValueError(f"Не вдалося завантажити з URL: {e}")

    content_type = resp.headers.get("Content-Type", "")
    if not content_type.startswith("image/"):
        raise ValueError(f"URL не містить зображення (Content-Type={content_type})")

    buf = io.BytesIO()
    total = 0
    for chunk in resp.iter_content(chunk_size=8192):
        if not chunk:
            continue
        total += len(chunk)
        if total > max_size:
            raise ValueError(f"Розмір зображення перевищує ліміт {max_size} байт")
        buf.write(chunk)

    buf.seek(0)
    return buf



def generate_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    refresh["id"] = user.id
    refresh["username"] = user.username
    refresh["email"] = user.email
    refresh["image_small"] = user.image_small.url if user.image_small else None
    refresh["image_medium"] = user.image_medium.url if user.image_medium else None
    refresh["image_large"] = user.image_large.url if user.image_large else None
    refresh["date_joined"] = user.date_joined.strftime("%Y-%m-%d %H:%M:%S")

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }