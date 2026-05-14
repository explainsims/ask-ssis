import fs from 'fs';

let data = JSON.parse(fs.readFileSync('public/data.json', 'utf8'));

// Restore a rich set of assignments
data.assignments = [
  // CL003 (AP Calculus AB - T003 - MAT401)
  { "id": "AS00015", "class_id": "CL003", "name": "Derivatives Quiz", "due_date": "2025-11-10", "type": "quiz", "weight": 10, "max_points": 50 },
  { "id": "AS00019", "class_id": "CL003", "name": "Related Rates Problem Set", "due_date": "2025-11-20", "type": "homework", "weight": 5, "max_points": 20 },
  
  // CL012 (AP Chemistry - T006 - SCI402)
  { "id": "AS00075", "class_id": "CL012", "name": "Stoichiometry Lab", "due_date": "2026-01-10", "type": "lab", "weight": 15, "max_points": 100 },
  { "id": "AS00076", "class_id": "CL012", "name": "Gas Laws Worksheet", "due_date": "2026-01-20", "type": "homework", "weight": 5, "max_points": 20 },
  { "id": "AS00077", "class_id": "CL012", "name": "Titration Lab Report", "due_date": "2026-02-05", "type": "lab", "weight": 15, "max_points": 100 },
  { "id": "AS00079", "class_id": "CL012", "name": "Kinetics Unit Test", "due_date": "2026-03-01", "type": "test", "weight": 20, "max_points": 100 },

  // CL019 (AP English Language - T011 - ENG401)
  { "id": "AS00101", "class_id": "CL019", "name": "Rhetorical Analysis Essay", "due_date": "2025-10-15", "type": "essay", "weight": 20, "max_points": 100 },
  { "id": "AS00102", "class_id": "CL019", "name": "Synthesis Prompt Practice", "due_date": "2025-11-05", "type": "homework", "weight": 10, "max_points": 50 },
  
  // CL034 (Visual Arts - T018 - ART101)
  { "id": "AS00201", "class_id": "CL034", "name": "Portfolio Draft 1", "due_date": "2025-12-01", "type": "project", "weight": 25, "max_points": 100 }
];

// Restore Fred's submissions
data.submissions = [
  // CL003
  { "student_id": "S0006", "assignment_id": "AS00015", "status": "submitted", "submitted_at": "2025-11-09", "score": 42 },
  { "student_id": "S0006", "assignment_id": "AS00019", "status": "missing" },
  
  // CL012
  { "student_id": "S0006", "assignment_id": "AS00075", "status": "late", "submitted_at": "2026-01-13", "score": 65 },
  { "student_id": "S0006", "assignment_id": "AS00076", "status": "submitted", "submitted_at": "2026-01-19", "score": 18 },
  { "student_id": "S0006", "assignment_id": "AS00077", "status": "missing" },
  { "student_id": "S0006", "assignment_id": "AS00079", "status": "missing" },

  // CL019
  { "student_id": "S0006", "assignment_id": "AS00101", "status": "submitted", "submitted_at": "2025-10-14", "score": 85 },
  { "student_id": "S0006", "assignment_id": "AS00102", "status": "missing" },
  
  // CL034
  { "student_id": "S0006", "assignment_id": "AS00201", "status": "submitted", "submitted_at": "2025-11-30", "score": 92 }
];

fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));
console.log("Restored Fred Tanaka's assignments & submissions.");
