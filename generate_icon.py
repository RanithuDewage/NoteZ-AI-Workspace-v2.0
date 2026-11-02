from PIL import Image, ImageDraw, ImageFont
import os

def create_app_icon():
    img_dir = os.path.join(os.path.dirname(__file__), "static", "images")
    os.makedirs(img_dir, exist_ok=True)

    size = (256, 256)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Outer rounded box with Sky Blue gradient fill
    # Background rounded rect
    draw.rounded_rectangle([16, 16, 240, 240], radius=50, fill="#0284c7")

    # Inner Notebook Sheet
    draw.rounded_rectangle([60, 50, 196, 206], radius=16, fill="#ffffff")

    # Binder Rings
    for y in [75, 110, 145, 180]:
        draw.ellipse([80, y, 94, y + 14], fill="#0ea5e9")

    # Note Lines
    for y in [105, 130, 155]:
        draw.rounded_rectangle([110, y, 175, y + 8], radius=4, fill="#e0f2fe")

    # AI Sparkle Star top right
    draw.polygon([(170, 40), (178, 55), (195, 60), (178, 65), (170, 80), (162, 65), (145, 60), (162, 55)], fill="#f59e0b")

    png_path = os.path.join(img_dir, "app_logo.png")
    ico_path = os.path.join(img_dir, "app_icon.ico")

    img.save(png_path, "PNG")
    img.save(ico_path, format="ICO", sizes=[(256, 256), (128, 128), (64, 64), (48, 48), (32, 32), (16, 16)])
    print(f"Generated icon files: {png_path}, {ico_path}")

if __name__ == "__main__":
    create_app_icon()
