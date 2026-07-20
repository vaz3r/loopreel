#!/usr/bin/env python3
"""
Analyze spacing in rendered slides.
Checks the pixel positions of regmarks, header, and footer.
"""

import os
import sys
from PIL import Image
import numpy as np

def analyze_slide(image_path):
    """Analyze spacing in a single slide."""
    img = Image.open(image_path)
    pixels = np.array(img)
    
    # Canvas dimensions
    height, width = pixels.shape[:2]
    print(f"\nAnalyzing: {os.path.basename(image_path)}")
    print(f"  Canvas: {width}x{height}")
    
    # Find regmarks (white/gray pixels in corners)
    # Top-left corner: look for pixels in the regmark zone (20-50px from edge)
    regmark_zone_start = 20
    regmark_zone_end = 50
    
    # Check for regmark pixels in top-left corner
    top_left_region = pixels[regmark_zone_start:regmark_zone_end, regmark_zone_start:regmark_zone_end]
    # Look for non-black pixels (regmarks are white/gray)
    regmark_pixels = np.where(top_left_region.sum(axis=2) > 100)
    if len(regmark_pixels[0]) > 0:
        print(f"  Regmarks found in top-left corner")
    else:
        print(f"  No regmarks found in top-left corner")
    
    # Find header position (look for text near top)
    # Header is typically at top: 80px
    header_y = 80
    header_region = pixels[header_y-10:header_y+10, 80:200]  # Check left side
    # Look for non-black pixels (text)
    header_pixels = np.where(header_region.sum(axis=2) > 100)
    if len(header_pixels[0]) > 0:
        print(f"  Header text found at y={header_y}")
    else:
        print(f"  No header text found at y={header_y}")
    
    # Find footer position (look for text near bottom)
    # Footer is typically at bottom: 80px
    footer_y = height - 80
    footer_region = pixels[footer_y-10:footer_y+10, 80:200]  # Check left side
    # Look for non-black pixels (text)
    footer_pixels = np.where(footer_region.sum(axis=2) > 100)
    if len(footer_pixels[0]) > 0:
        print(f"  Footer text found at y={footer_y}")
    else:
        print(f"  No footer text found at y={footer_y}")
    
    # Calculate clearance
    print(f"\n  Clearance analysis:")
    print(f"    Regmark zone: {regmark_zone_start}px - {regmark_zone_end}px from edge")
    print(f"    Header position: {header_y}px from top")
    print(f"    Footer position: {footer_y}px from bottom ({height - footer_y}px from top)")
    print(f"    Header clearance: {header_y - regmark_zone_end}px from regmark zone")
    print(f"    Footer clearance: {height - footer_y - regmark_zone_end}px from regmark zone")

def main():
    if len(sys.argv) < 2:
        print("Usage: python analyze-spacing.py <image_path> [image_path2 ...]")
        sys.exit(1)
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            analyze_slide(image_path)
        else:
            print(f"File not found: {image_path}")

if __name__ == "__main__":
    main()