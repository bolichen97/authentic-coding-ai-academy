#!/usr/bin/env python3
"""Capture public course screenshots from a fresh browser session."""

from __future__ import annotations

import functools
import http.server
import pathlib
import re
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "docs" / "screenshots"
STORAGE_KEY = "authentic-coding-ai-academy-progress-v1"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        pass


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                headless=True,
                args=["--force-color-profile=srgb"],
            )
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                device_scale_factor=1,
            )
            context.add_init_script(
                f"localStorage.removeItem({STORAGE_KEY!r})"
            )
            page = context.new_page()
            page.goto(
                f"http://127.0.0.1:{server.server_port}/preview.html",
                wait_until="networkidle",
                timeout=45_000,
            )
            page.get_by_role("heading", name="一次模型调用").wait_for()
            page.screenshot(path=OUTPUT / "01-course-overview.png")

            page.get_by_role("button", name="A · Prompt", exact=True).click()
            page.get_by_role("button", name="2 实验", exact=True).click()
            page.get_by_role("button", name="运行实验", exact=True).click()
            page.get_by_text("本课已完成", exact=True).wait_for()
            page.screenshot(path=OUTPUT / "02-first-lesson-complete.png")

            page.get_by_role(
                "button",
                name=re.compile("Authentic Coding AI"),
            ).first.click()
            page.get_by_role(
                "button",
                name="B · 修改和验证证据",
                exact=True,
            ).click()
            page.get_by_role("button", name="2 实验", exact=True).click()
            page.get_by_role("button", name="运行实验", exact=True).click()
            page.get_by_text("本课已完成", exact=True).wait_for()
            page.screenshot(path=OUTPUT / "03-complete-agent-flow.png")

            context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=2)

    for image in sorted(OUTPUT.glob("*.png")):
        print(image)


if __name__ == "__main__":
    main()
