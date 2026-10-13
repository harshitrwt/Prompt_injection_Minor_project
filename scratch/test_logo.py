import os

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Outer circle with inner 4-point star cutout creating Cordon C logo -->
  <path fill="#242424" fill-rule="evenodd" d="
    M 88 33
    A 44 44 0 1 0 88 67
    C 78 62, 68 59, 62 61
    C 56 63, 54 74, 52 83
    C 51 88, 45 88, 44 83
    C 42 73, 40 60, 31 55
    C 24 51, 24 49, 31 45
    C 40 40, 42 27, 44 17
    C 45 12, 51 12, 52 17
    C 54 26, 56 37, 62 39
    C 68 41, 78 38, 88 33
    Z
  "/>
</svg>'''

with open("scratch/test_logo.svg", "w") as f:
    f.write(svg_content)
print("Saved scratch/test_logo.svg")
