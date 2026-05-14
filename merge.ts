import fs from 'fs';

const part1 = JSON.parse(fs.readFileSync('./public/data.json', 'utf8'));
const part2 = JSON.parse(fs.readFileSync('./public/data_part2.json', 'utf8'));

part1.enrollments = part2.enrollments || [];
part1.grades = part2.grades || [];
part1.student_services = part2.student_services || [];
part1.general_recommendations = part2.general_recommendations || [];
part1.submissions = part2.submissions || [];

fs.writeFileSync('./public/data.json', JSON.stringify(part1, null, 2));
