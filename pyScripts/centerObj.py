import os
import math

def center(src, dst):
    with open(src, "r") as f:
        lines = f.read().split("\n")
    vertices = [list(map(float, line.split()[1:])) for line in lines if line.startswith("v ")]
    min_x = min([v[0] for v in vertices])
    max_x = max([v[0] for v in vertices])
    min_y = min([v[1] for v in vertices])
    min_z = min([v[2] for v in vertices])
    max_z = max([v[2] for v in vertices])
    for i in range(len(vertices)):
        vertices[i][0] -= (min_x + max_x) / 2
        vertices[i][1] -= min_y
        vertices[i][2] -= (min_z + max_z) / 2
    for i in range(len(vertices)):
        newY = vertices[i][1] * math.cos(math.radians(90)) - vertices[i][2] * math.sin(math.radians(90))
        newZ = vertices[i][1] * math.sin(math.radians(90)) + vertices[i][2] * math.cos(math.radians(90))
        vertices[i][1] = newY
        vertices[i][2] = newZ
    with open(dst, "w") as f:
        for line in lines:
            if line.startswith("v "):
                # f.write("v " + " ".join(map(str, vertices.pop(0))) + "\n")
                # rewrite, rounding to 4th decimal place
                f.write("v " + " ".join([str(round(v, 4)) for v in vertices.pop(0)]) + "\n")
            else:
                f.write(line + "\n")
        

center(
    os.getcwd() + "/pyScripts/warehouse_orig.obj", 
    os.getcwd() + "/public/threeAssets/warehouse.obj"
)
