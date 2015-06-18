#Create a regular polygon
regularPolygon = (sides) -> i/sides for i in [0...sides]

#Create a point with duplicate verticies
nullPolygon = (vertices, angle) -> angle for i in [0...vertices]
