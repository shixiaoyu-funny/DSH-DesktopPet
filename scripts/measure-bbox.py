"""Measure the visible character box in extracted RGBA frames.

Prints both the alpha-derived box (when the WebM alpha layer decoded) and the
non-black RGB box (fallback when the decoder filled transparency with black).
"""

import glob
import os
import sys

import numpy as np
from PIL import Image


def main() -> None:
    folder = sys.argv[1]
    files = sorted(glob.glob(os.path.join(folder, "*.png")))
    if not files:
        print("no png")
        return
    for path in files:
        image = np.asarray(Image.open(path).convert("RGBA"))
        alpha = image[:, :, 3]
        rgb = image[:, :, :3]
        alpha_box = alpha > 8
        rgb_box = rgb.max(axis=2) > 8
        print(f"== {os.path.basename(path)} ==")
        print(
            f"  alpha: min={alpha.min()} max={alpha.max()} "
            f"unique={len(np.unique(alpha))} transparent={int((alpha <= 8).sum())}"
        )
        for label, mask in (("alpha", alpha_box), ("rgb", rgb_box)):
            ys, xs = np.where(mask)
            if len(xs) == 0:
                print(f"  {label}: empty")
                continue
            x0, x1 = int(xs.min()), int(xs.max())
            y0, y1 = int(ys.min()), int(ys.max())
            print(
                f"  {label}: box=({x0},{y0})-({x1},{y1}) "
                f"w={x1 - x0 + 1} h={y1 - y0 + 1} "
                f"footY={y1} centerX={(x0 + x1) / 2:.1f}"
            )


if __name__ == "__main__":
    main()
