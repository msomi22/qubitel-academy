---
paths: ["src/academies/cbc/**/*.js", "src/academies/cbc/**/*.jsx", "src/academies/cbc/**/*.ts", "src/academies/cbc/**/*.tsx"]
---
# CBC Academy Exam Standards

- **UI & Icon Reference:** When generating or modifying exams, the UI layout and quiz icon implementation MUST strictly follow the design pattern established in `src/academies/cbc/grade-1/foundation-practice/assessments/object-matching-exam-001.js`. 
- **Placement:** New exams must be placed in their correct subject/topic directories based on the curriculum structure. Do not default to the `foundation-practice` directory.
- **Manifests:** Every new exam must be registered in the corresponding `topic.manifest.json` file.