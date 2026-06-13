from playwright.sync_api import sync_playwright
import time

VIEWPORTS = [
    ('desktop_1280', 1280, 1080),
    ('mobile_375', 375, 812),
    ('tablet_768', 768, 1024),
]

URL = 'http://localhost:5175'

def capture(url, output_path, viewport_width=1280, viewport_height=1080):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': viewport_width, 'height': viewport_height})
        # Disable animations to skip boot sequence
        page.add_init_script("""
            window.__disableAnimations = true;
            // Override localStorage to skip boot
        """)
        page.goto(url, wait_until='networkidle', timeout=15000)
        # Wait a moment for any JS-driven render
        page.wait_for_timeout(2000)
        # Try to dismiss the boot sequence if present by clicking or waiting
        # The boot sequence auto-completes; let's just wait for content
        page.screenshot(path=output_path, full_page=False)
        browser.close()
        print(f"Saved: {output_path}")

if __name__ == '__main__':
    for name, w, h in VIEWPORTS:
        output = f'/Users/davidmcdougall/Desktop/david-mcdougall-studio/screenshots/{name}.png'
        print(f"Capturing {name} ({w}x{h})...")
        capture(URL, output, w, h)
