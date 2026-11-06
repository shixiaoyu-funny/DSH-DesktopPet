"""Measure non-black character boxes for indexed frames (f01.png ...)."""

import glob
import os
import sys

import numpy as np
from PIL import Image


def main() -> None:
    folder = sys.argv[1]
    pattern = sys.argv[2] if len(sys.argv) > 2 else "f*.png"
    for path in sorted(glob.glob(os.path.join(folder, pattern))):
        image = np.asarray(Image.open(path).convert("RGBA"))
        rgb = image[:, :, :3]
        mask = rgb.max(axis=2) > 8
        ys, xs = np.where(mask)
        if len(xs) == 0:
            print(f"{os.path.basename(path)} empty")
            continue
        x0, x1 = int(xs.min()), int(xs.max())
        y0, y1 = int(ys.min()), int(ys.max())
        print(
            f"{os.path.basename(path)[:-4]} "
            f"x0={x0} x1={x1} w={x1 - x0 + 1} "
            f"y0={y0} y1={y1} h={y1 - y0 + 1} "
            f"footY={y1} cx={(x0 + x1) / 2:.1f}"
        )


if __name__ == "__main__":
    main()
