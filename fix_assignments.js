import fs from 'fs';
let data = JSON.parse(fs.readFileSync('public/data.json', 'utf8'));

data.assignments = [
  { "id": "AS00015", "class_id": "CL003", "name": "Calculus Quiz 1", "due_date": "2025-11-10", "type": "quiz", "weight": 10, "max_points": 50 },
  { "id": "AS00019", "class_id": "CL003", "name": "Calculus Midterm", "due_date": "2025-12-15", "type": "test", "weight": 30, "max_points": 100 },
  { "id": "AS00075", "class_id": "CL012", "name": "Chem Lab 1", "due_date": "2026-01-10", "type": "lab", "weight": 15, "max_points": 100 },
  { "id": "AS00076", "class_id": "CL012", "name": "Chem Worksheet 4", "due_date": "2026-01-20", "type": "homework", "weight": 5, "max_points": 20 },
  { "id": "AS00077", "class_id": "CL012", "name": "Chem Lab 2", "due_date": "2026-02-05", "type": "lab", "weight": 15, "max_points": 100 },
  { "id": "AS00079", "class_id": "CL012", "name": "Chem Final Essay", "due_date": "2026-03-01", "type": "essay", "weight": 20, "max_points": 100 }
];

fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));
