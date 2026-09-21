#!/usr/bin/env python3
"""Record the public teaching app, paced by the measured local narration."""

from __future__ import annotations

import json
import os
import pathlib
import re
import secrets
import time

from playwright.sync_api import sync_playwright

BASE = pathlib.Path(__file__).resolve().parent
W, H = 1920, 1080
DEFAULT_URL = "http://127.0.0.1:7413/preview.html"


def write_nofollow(path: pathlib.Path, text: str) -> None:
    if path.is_symlink():
        raise SystemExit(f"refusing symlink output: {path}")
    stage = path.with_name(f".{path.name}.tmp-{secrets.token_hex(8)}")
    flags = os.O_WRONLY | os.O_CREAT | os.O_EXCL | getattr(os, "O_NOFOLLOW", 0)
    fd = os.open(stage, flags, 0o600)
    try:
        with os.fdopen(fd, "w") as handle:
            handle.write(text)
        os.replace(stage, path)
    except BaseException:
        stage.unlink(missing_ok=True)
        raise


def beat_targets() -> tuple[list[float], float]:
    narration = json.loads((BASE / "assets/audio/narr.json").read_text())
    footage = [line for line in narration["lines"] if line["role"] == "footage"]
    outro = next(line for line in narration["lines"] if line["role"] == "outro")
    first = footage[0]["start"]
    targets = [round(line["start"] - first, 3) for line in footage]
    tail = round(outro["start"] - footage[-1]["start"], 3)
    return targets, tail


def main() -> None:
    url = os.environ.get("KC_VIDEO_TARGET_URL", DEFAULT_URL).strip() or DEFAULT_URL
    targets, tail = beat_targets()
    if len(targets) != 21:
        raise SystemExit(f"expected 21 footage beats, got {len(targets)}")

    events: list[dict] = []
    clock = {"start": 0.0, "video": 0.0}

    def now() -> float:
        return time.monotonic() - clock["start"]

    def hold_until(target: float, page) -> None:
        remaining = target - now()
        if remaining < -0.3:
            print(f"overrun={-remaining:.2f}s target={target:.2f}s")
        if remaining > 0:
            page.wait_for_timeout(int(remaining * 1000))

    def mark(page, label: str, locator, beat: int, kind: str = "focus") -> None:
        locator.wait_for(state="visible", timeout=10_000)
        box = locator.bounding_box()
        if box is None:
            raise SystemExit(f"no box for {label}")
        event = {
            "t_ms": int(now() * 1000),
            "kind": kind,
            "label": label,
            "beat": beat,
            "focal": {
                "x": round(box["x"] + box["width"] / 2, 1),
                "y": round(box["y"] + box["height"] / 2, 1),
            },
            "bbox": {"w": round(box["width"], 1), "h": round(box["height"], 1)},
            "viewport": {"width": W, "height": H},
        }
        events.append(event)
        print(f"beat={beat:02d} t={event['t_ms']/1000:7.3f}s {label}")

    def lesson_button(page, title: str):
        return page.get_by_role("button", name=re.compile(re.escape(title))).first

    def open_lesson(page, beat: int, title: str) -> None:
        hold_until(targets[beat] - 0.9, page)
        lesson_button(page, title).click()
        hold_until(targets[beat], page)
        mark(page, title, page.locator("main").first, beat)

    def open_tab(page, beat: int, tab: str, label: str) -> None:
        hold_until(targets[beat] - 0.7, page)
        page.get_by_role("button", name=tab, exact=True).click()
        hold_until(targets[beat], page)
        mark(page, label, page.locator("main").first, beat)

    def run_lesson(page, beat: int, label: str) -> None:
        hold_until(targets[beat] - 3.0, page)
        page.get_by_role("button", name="实验", exact=True).click()
        page.get_by_role("button", name="运行实验", exact=True).click()
        page.wait_for_timeout(2400)
        hold_until(targets[beat], page)
        mark(page, label, page.locator("main").first, beat)

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True, args=["--force-color-profile=srgb"])
        context = browser.new_context(
            viewport={"width": W, "height": H},
            record_video_dir=str(BASE),
            record_video_size={"width": W, "height": H},
            device_scale_factor=1,
        )
        context.add_init_script("localStorage.removeItem('authentic-coding-ai-academy-progress-v1')")
        page = context.new_page()
        clock["video"] = time.monotonic()

        try:
            page.goto(url, wait_until="networkidle", timeout=45_000)
        except Exception as error:
            raise SystemExit(f"local preview navigation failed: {type(error).__name__}") from None
        page.get_by_role("heading", name="一次模型调用").wait_for(timeout=30_000)
        page.wait_for_timeout(1500)
        clock["start"] = time.monotonic()

        hold_until(targets[0], page)
        mark(page, "一次模型调用", page.locator("main").first, 0)
        run_lesson(page, 1, "一次调用完成")

        open_lesson(page, 2, "消息与角色")
        open_tab(page, 3, "讲解", "消息角色")

        open_lesson(page, 4, "代码上下文")
        run_lesson(page, 5, "相关上下文")

        open_lesson(page, 6, "工具调用")
        open_tab(page, 7, "讲解", "工具定义")

        open_lesson(page, 8, "Agent 循环")
        run_lesson(page, 9, "循环与停止")

        open_lesson(page, 10, "文件工具")
        run_lesson(page, 11, "搜索读取修改")

        open_lesson(page, 12, "测试闭环")
        run_lesson(page, 13, "失败修复验证")

        open_lesson(page, 14, "上下文管理")
        run_lesson(page, 15, "上下文压缩")

        open_lesson(page, 16, "安全边界")
        open_tab(page, 17, "讲解", "权限与沙箱")

        open_lesson(page, 18, "Authentic Coding AI")
        run_lesson(page, 19, "完整任务流程")

        hold_until(targets[20], page)
        mark(page, "修改和验证证据", page.locator("main").first, 20)
        hold_until(targets[-1] + tail, page)

        video = page.video
        if video is None:
            raise SystemExit("video recording did not start")
        context.close()
        video_path = video.path()
        browser.close()

    if not pathlib.Path(video_path).is_file():
        raise SystemExit("recorded video file is missing")

    write_nofollow(BASE / "MAIN_WEBM", str(video_path))
    write_nofollow(
        BASE / "events.json",
        json.dumps(
            {
                "viewport": {"width": W, "height": H},
                "preroll_s": round(clock["start"] - clock["video"], 3),
                "events": events,
            },
            ensure_ascii=False,
            indent=2,
        ),
    )
    print(f"MAIN_WEBM={video_path}")
    print(f"events={len(events)} preroll={clock['start'] - clock['video']:.3f}s")


if __name__ == "__main__":
    main()
