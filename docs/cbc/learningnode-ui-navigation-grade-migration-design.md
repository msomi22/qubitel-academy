# LearningNode UI Navigation and Grade Migration Design

> Project: `msomi22/qubitel-academy`
>
> Purpose: document how the LearningNode model should be presented in the UI so CBC content is easy to navigate, easy to extend, and aligned with the KICD hierarchy.
>
> Core hierarchy:
>
> ```text
> Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content
> ```

---

## 1. Review of the Proposed Direction

The proposed direction is sound.

The important shift is that **LearningNode is not only a data model**. It must also become the foundation for navigation, page rendering, breadcrumbs, progress, and content discovery.

The UI should not be hardcoded around one grade, one learning area, or one exam type. Instead, each node in the learning graph should be independently reachable and renderable.

This gives us:

- cleaner curriculum alignment
- easier navigation
- easier back/forward movement through the hierarchy
- easier jumping from any page to a parent or sibling
- easier extension to Grade 2, Grade 7, Grade 8, and other academies
- less duplicated UI
- fewer hardcoded assumptions
- safer migration from legacy CBC structure

The key product rule is:

> Every meaningful curriculum item should be a LearningNode, and every LearningNode should have its own page.

---

## 2. Core Design Principle

LearningNode should drive both:

1. **Curriculum structure**
2. **User interface structure**

That means the same hierarchy used in data should appear naturally in the UI.

```text
Academy
  → Grade
    → Learning Area
      → Theme
        → Strand
          → Sub-strand
            → Content
```

A learner, teacher, or parent should be able to move:

- downward into children
- upward to parents
- sideways to siblings
- directly to a specific node through search/jump
- back to a previously visited page
- forward to the next recommended learning item

---

## 3. KICD-Aligned Naming Rule

For CBC content, use KICD naming as the canonical naming.

Use:

```text
Learning Area
```

Do not use:

```text
Subject
```

as the canonical CBC curriculum term.

For example, Grade 1 should use:

```text
English Activities
```

not just:

```text
English
```

A short UI alias such as `English` may be used only as a display shortcut where space is limited, but canonical metadata and breadcrumbs should preserve KICD naming.

Correct breadcrumb:

```text
CBC Academy → Grade 1 → English Activities → Greetings → Listening and Speaking → Pronunciation and Vocabulary
```

---

## 4. LearningNode Page Rule

Every LearningNode must have its own page.

This includes:

- academy page
- grade page
- learning area page
- theme page
- strand page
- sub-strand page
- content page
- assessment page
- exam page
- revision page
- practice page
- notes page

The page does not need to be complex. The same generic page shell can render many node kinds.

The page should answer:

1. Where am I?
2. What is this node about?
3. What can I do here?
4. What child items are available?
5. What can I jump to?
6. What should I do next?

---

## 5. Generic LearningNode Page Shell

Every node page should use a shared page shell.

Recommended structure:

```text
Page Header
  Breadcrumbs
  Node title
  Short description
  Progress / status

Main Actions
  Continue
  Revise
  Start practice
  Start exam
  View notes

Child Navigation
  Cards or compact list of child nodes grouped by kind

Related / Jump Navigation
  Parent
  Siblings
  Theme jump
  Strand jump
  Learning area jump
  Search / quick switcher

Page Body
  Node-specific content or overview

Footer Navigation
  Previous
  Parent
  Next
```

This creates consistency and avoids building separate custom pages for each curriculum level.

---

## 6. Navigation Requirements

### 6.1 Breadcrumb navigation

Every page must show the full path from academy to the current node.

Example:

```text
CBC Academy → Grade 1 → English Activities → Greetings → Listening and Speaking
```

Each breadcrumb segment should be clickable.

This allows jumping from:

```text
Content → Theme
Content → Learning Area
Content → Grade
```

without pressing back repeatedly.

---

### 6.2 Parent navigation

Every page except the root should have a clear parent navigation action.

Example:

```text
Back to English Activities
Back to Greetings
Back to Listening and Speaking
```

The parent action should be visible near the top and also available near the bottom on mobile.

---

### 6.3 Child navigation

Each non-leaf node should show its children.

Examples:

On a Grade page:

```text
Grade 1
  - English Activities
  - Mathematical Activities
  - Environmental Activities
```

On a Learning Area page:

```text
English Activities
  - Greetings
  - School
  - Family
  - Home
```

On a Theme page:

```text
Greetings
  - Listening and Speaking
  - Reading
  - Language Use
  - Writing
```

On a Strand page:

```text
Listening and Speaking
  - Pronunciation and Vocabulary
```

On a Sub-strand page:

```text
Pronunciation and Vocabulary
  - Notes
  - Practice
  - Revision Questions
  - Assessments
```

---

### 6.4 Sibling navigation

Each page should allow movement to sibling nodes.

Examples:

From Theme `Greetings`, learner can move to:

```text
Previous: none
Next: School
```

From Theme `School`, learner can move to:

```text
Previous: Greetings
Next: Family
```

From Strand `Listening and Speaking`, learner can move to:

```text
Reading
Language Use
Writing
```

Sibling navigation should be compact and not clutter the page.

---

### 6.5 Quick jump navigation

Users should be able to jump to a specific level without restarting navigation.

Recommended jump menu:

```text
Jump to:
- Grade
- Learning Area
- Theme
- Strand
- Sub-strand
- Notes
- Practice
- Revision
- Exams
```

On mobile, this can be a compact dropdown or bottom sheet.

On desktop, it can be a side panel or command palette.

---

### 6.6 Search / command palette

A search or command palette should allow direct navigation to any node.

Examples:

```text
Search: greetings
Search: grade 1 english activities
Search: pronunciation and vocabulary
Search: missing letters
Search: revision questions
```

Search results should show the hierarchy context.

Example:

```text
Pronunciation and Vocabulary
Grade 1 → English Activities → Greetings → Listening and Speaking
```

---

## 7. Page Types

### 7.1 Academy Page

Purpose:

Show all available academies or the selected academy overview.

For CBC Academy, show:

- academy description
- available grades
- recent progress
- continue learning
- teacher/parent entry points if available

Example page:

```text
CBC Academy
  - Grade 1
  - Grade 2
  - Grade 3
  - Grade 7
  - Grade 8
```

---

### 7.2 Grade Page

Purpose:

Show all Learning Areas for a specific grade.

Example:

```text
Grade 1

Learning Areas:
- English Activities
- Kiswahili Activities
- Mathematical Activities
- Environmental Activities
```

The Grade page should not show every theme, strand, and exam at once. That would be cluttered.

It should show only the next level: Learning Areas.

Optional sections:

- Continue where you left off
- Recommended next
- Recent exams
- Overall progress

---

### 7.3 Learning Area Page

Purpose:

Show all themes or major curriculum branches under a Learning Area.

Example:

```text
Grade 1 → English Activities

Themes:
1. Greetings
2. School
3. Family
4. Home
5. Time
6. Weather and our Environment
...
```

The Learning Area page may also show learning-area-wide content such as:

- overall revision
- term exam
- full learning-area exam
- learning-area overview notes
- progress summary

This supports the requirement that exams can sit under a Learning Area when they cover the whole area.

---

### 7.4 Theme Page

Purpose:

Show all strands available under a theme.

Example:

```text
Grade 1 → English Activities → Greetings

Strands:
- Listening and Speaking
- Reading
- Language Use
- Writing
```

The Theme page should also show:

- suggested vocabulary
- theme overview
- theme revision
- theme-level assessment if available

Theme page should not overload the learner with all content from every strand. It should guide them into strands.

---

### 7.5 Strand Page

Purpose:

Show sub-strands under a strand.

Example:

```text
Grade 1 → English Activities → Greetings → Listening and Speaking

Sub-strands:
- Pronunciation and Vocabulary
```

A Strand page can also contain:

- strand-level notes
- strand-level revision
- strand-level assessment
- progress across sub-strands

This supports the requirement that exams can be under a Strand.

---

### 7.6 Sub-strand Page

Purpose:

Show the actual learning units and content actions under the sub-strand.

Example:

```text
Grade 1 → English Activities → Greetings → Listening and Speaking → Pronunciation and Vocabulary

Available content:
- Notes
- Practice
- Revision Questions
- Assessment
```

This is the most important curriculum unit page.

It should show:

- specific learning outcomes
- suggested vocabulary
- key inquiry questions
- number of lessons
- learner actions
- content cards

This supports the requirement that exams can be under a Sub-strand.

---

### 7.7 Content Page

Purpose:

Show the actual learning content.

A Content page is where the learner reads, listens, practices, revises, or starts an assessment.

Content page should be simple and focused.

Recommended sections:

1. **Content header**
   - title
   - breadcrumb
   - short purpose
   - estimated time
   - read-aloud option if supported

2. **Learning target**
   - what the learner should know or do after this content

3. **Key vocabulary**
   - short list of important words
   - pronunciation/read-aloud support where useful

4. **Learner notes**
   - short notes
   - simple examples
   - pictures or visual hints where needed

5. **Practice**
   - short interactive checks
   - matching
   - tap/select
   - listen and choose
   - write/complete

6. **Revision questions**
   - short questions
   - answers or feedback after attempt

7. **Assessment / exam links**
   - start assessment
   - start exam
   - retry failed questions

8. **Next steps**
   - next content
   - back to sub-strand
   - jump to theme
   - revise this theme

Not every content page must have all sections. The node’s `kind`, `features`, and `contentType` should determine what appears.

---

## 8. What Should Be Inside the Content Page?

The Content page should not be a cluttered dump of everything.

It should render based on content type.

### 8.1 Notes content page

A notes page should include:

- learning outcome
- short explanation
- examples
- key vocabulary
- quick check questions
- read-aloud support
- next action

Example:

```text
Greetings Notes

Today we learn how to greet people.

Good morning — used in the morning.
Good afternoon — used after noon.
Good evening — used in the evening.
Hello — used at any time.

Quick check:
Which greeting do we use in the morning?
```

---

### 8.2 Practice content page

A practice page should include:

- clear instruction
- short activity
- immediate feedback
- retry option
- next question
- progress within practice set

Example activities:

- listen and choose
- match word to picture
- tap the word you hear
- choose the missing letter
- complete a sentence
- choose the correct greeting

---

### 8.3 Revision content page

A revision page should include:

- mixed questions from the node scope
- answer feedback
- short explanations
- retry weak questions
- summary of strengths/weaknesses

Revision is different from exam. It should teach while assessing.

---

### 8.4 Assessment content page

An assessment page should include:

- question set
- score
- feedback
- retry option
- mastery status
- link back to the parent node

Assessment can exist under:

```text
Learning Area
Theme
Strand
Sub-strand
```

depending on scope.

---

### 8.5 Exam content page

An exam page should include:

- title
- instructions
- timed or untimed status
- questions
- score
- final feedback
- retry or review
- next recommended content

Exam placement should depend on coverage.

Examples:

```text
Learning Area exam:
Covers all English Activities content for a grade.

Theme exam:
Covers a theme such as Greetings.

Strand exam:
Covers Listening and Speaking under a theme.

Sub-strand exam:
Covers Pronunciation and Vocabulary only.
```

---

## 9. Exam Placement Rule

Exams and assessments can be attached to any curriculum node.

Allowed placements:

```text
Learning Area → assessment/exam
Theme → assessment/exam
Strand → assessment/exam
Sub-strand → assessment/exam
Content → mini-check
```

Use the exam’s parent node to define its scope.

Examples:

```text
grade-1-english-activities-exam-001
parent: grade-1-english-activities
scope: whole learning area
```

```text
grade-1-english-activities-greetings-exam-001
parent: grade-1-english-activities-theme-greetings
scope: theme
```

```text
grade-1-english-activities-greetings-listening-speaking-exam-001
parent: grade-1-english-activities-greetings-listening-speaking
scope: strand
```

```text
grade-1-english-activities-greetings-pronunciation-vocabulary-exam-001
parent: grade-1-english-activities-greetings-pronunciation-vocabulary
scope: sub-strand
```

This avoids creating separate hardcoded assessment systems.

---

## 10. LearningNode Presentation Contract

Each LearningNode should provide enough information for the UI to render a page.

Recommended fields:

```ts
type LearningNode = {
  id: string;
  kind:
    | 'academy'
    | 'grade'
    | 'learning-area'
    | 'theme'
    | 'strand'
    | 'sub-strand'
    | 'notes'
    | 'practice'
    | 'revision'
    | 'assessment'
    | 'exam'
    | 'activity'
    | 'content';

  label: string;
  summary?: string;

  parentId: string | null;
  childIds: string[];

  order?: number;
  routeSegment?: string;

  attributes: Record<string, unknown>;

  features?: {
    notes?: boolean;
    practice?: boolean;
    revision?: boolean;
    assessments?: boolean;
    exams?: boolean;
    readAloud?: boolean;
    timed?: boolean;
    mobileFirst?: boolean;
  };

  actions?: {
    primary?: string;
    secondary?: string[];
  };

  appearance?: {
    icon?: string;
    theme?: string;
    tone?: string;
    displayAlias?: string;
  };

  contentRef?: {
    type: 'inline' | 'file' | 'module' | 'legacy-assessment';
    value: string;
  };

  version: number;
};
```

---

## 11. UI Rendering Rules by Node Kind

### 11.1 Non-leaf nodes

These nodes mostly show navigation and overview:

```text
academy
grade
learning-area
theme
strand
sub-strand
```

They should render:

- title
- summary
- breadcrumb
- progress
- child cards
- related assessments
- quick jump
- previous/next
- parent link

### 11.2 Leaf/content nodes

These nodes show learning material or interactive tasks:

```text
notes
practice
revision
assessment
exam
activity
content
```

They should render:

- actual content
- interaction UI if required
- feedback if required
- progress
- next action
- parent link
- breadcrumbs

---

## 12. Child Grouping Rule

Children should be grouped by `kind` so pages stay simple.

Example on a Sub-strand page:

```text
Learn
- Notes

Practice
- Practice Activities

Revise
- Revision Questions

Check
- Assessment
- Exam
```

Example on a Learning Area page:

```text
Themes
- Greetings
- School
- Family

Assessments
- English Activities Term Revision
- English Activities Exam 1
```

This avoids one long unordered list.

---

## 13. Simplicity and Non-Clutter Rules

Pages should remain simple.

Rules:

- show only the next meaningful level by default
- hide advanced metadata unless needed
- use progressive disclosure
- group children by type
- avoid showing every descendant at once
- keep Grade 1 pages visually light
- make cards compact on mobile
- keep the primary action obvious
- avoid duplicate headings
- keep breadcrumb compact on mobile
- provide jump menus for deep navigation

Mobile breadcrumb can collapse like:

```text
Grade 1 / English Activities / ... / Pronunciation and Vocabulary
```

Full breadcrumb can be available in a drawer or dropdown.

---

## 14. Navigation Components Needed

### 14.1 LearningNodeBreadcrumbs

Responsibilities:

- render full path
- allow jumping to any ancestor
- collapse gracefully on mobile

### 14.2 LearningNodeChildGrid

Responsibilities:

- show direct children
- group children by kind
- support compact cards
- show progress/status

### 14.3 LearningNodeJumpMenu

Responsibilities:

- jump to parent
- jump to theme
- jump to strand
- jump to learning area
- search nodes within current grade/learning area

### 14.4 LearningNodeSiblingNav

Responsibilities:

- previous sibling
- next sibling
- sibling dropdown where useful

### 14.5 LearningNodePageShell

Responsibilities:

- shared layout
- header
- breadcrumbs
- child navigation
- content outlet
- footer navigation

### 14.6 LearningNodeContentRenderer

Responsibilities:

- render notes
- render practice
- render revision
- render assessment
- render exam
- support legacy content references during migration

---

## 15. Route Model

Every node should have a route.

Preferred route pattern:

```text
/academy/:academyId
/academy/:academyId/:gradeId
/academy/:academyId/:gradeId/:learningAreaId
/academy/:academyId/:gradeId/:learningAreaId/:themeId
/academy/:academyId/:gradeId/:learningAreaId/:themeId/:strandId
/academy/:academyId/:gradeId/:learningAreaId/:themeId/:strandId/:subStrandId
/academy/:academyId/:gradeId/:learningAreaId/:themeId/:strandId/:subStrandId/:contentId
```

A simpler route can also be used if the router resolves by node ID:

```text
/learn/:nodeId
```

Recommended approach:

Use both.

Canonical node route:

```text
/learn/:nodeId
```

Readable curriculum route:

```text
/academy/cbc-academy/grade-1/english-activities/greetings/listening-speaking/pronunciation-vocabulary
```

The readable route improves usability. The node route simplifies implementation and linking.

---

## 16. Backward Compatibility

Existing legacy paths must remain working until migration is complete.

For example, current routes/content may still use:

```text
src/academies/cbc/grade-1/english/
```

Do not delete or break these until the new LearningNode navigation fully replaces them.

Use compatibility fields:

```ts
attributes: {
  legacySubjectId: 'english',
  legacyTopicId: 'english',
  legacyPath: 'src/academies/cbc/grade-1/english',
  legacyManifestId: 'writing-missing-letters-exam-001',
  legacyFile: 'assessments/writing-readiness/writing-missing-letters-exam-001.js'
}
```

---

## 17. Migration Strategy

### Phase 1: Build the LearningNode graph

Create the canonical graph for Grade 1:

```text
CBC Academy
  → Grade 1
    → English Activities
      → Themes
        → Strands
          → Sub-strands
            → Content
```

No deletion in this phase.

---

### Phase 2: Add LearningNode UI shell

Create generic UI components:

- LearningNodePageShell
- LearningNodeBreadcrumbs
- LearningNodeChildGrid
- LearningNodeJumpMenu
- LearningNodeSiblingNav
- LearningNodeContentRenderer

No deletion in this phase.

---

### Phase 3: Integrate Grade 1 pages

Point Grade 1 navigation to LearningNode pages.

Keep old pages accessible as fallback.

---

### Phase 4: Wrap existing content

Wrap current exams, notes, practice, and revision content as LearningNodes.

Do not rename IDs unless approved.

---

### Phase 5: Validate navigation

Confirm:

- Academy page works
- Grade page works
- Learning Area page works
- Theme page works
- Strand page works
- Sub-strand page works
- Content page works
- direct jumps work
- breadcrumbs work
- previous/next works
- legacy content still works

---

### Phase 6: Cleanup

Only after validation, delete unused old UI/navigation files.

Deletion must be a separate cleanup issue or PR.

---

## 18. Extension Rules

A new grade should be added by creating nodes, not by creating new custom UI.

To add Grade 2:

```text
Add Grade 2 node
Add Learning Area nodes
Add Theme nodes
Add Strand nodes
Add Sub-strand nodes
Add Content nodes
```

The same UI should render them.

To add Grade 7:

```text
Add Grade 7 node
Add Learning Area nodes
Add Strand/topic structure based on KICD
Add Content nodes
```

If a grade has a different curriculum structure, the graph should still support it through node kinds and parent/child relationships.

Do not hardcode one Grade 1-specific navigation model into the UI.

---

## 19. Issue Breakdown

### Issue 1: Define LearningNode UI presentation contract

Create the data contract that every node must satisfy for UI rendering.

Acceptance criteria:

- node kind list defined
- required fields defined
- optional UI fields defined
- content references defined
- compatibility metadata defined

---

### Issue 2: Add Grade 1 LearningNode graph

Create Grade 1 graph using KICD hierarchy.

Acceptance criteria:

- CBC Academy node exists
- Grade 1 node exists
- English Activities learning-area node exists
- Theme nodes exist
- Strand nodes exist where known
- Sub-strand nodes exist where known
- parent/child links are valid

---

### Issue 3: Build generic LearningNode page shell

Create shared page components.

Acceptance criteria:

- every node kind can render a page
- breadcrumbs work
- child grid works
- parent navigation works
- mobile layout is clean

---

### Issue 4: Add direct jump navigation

Add jump menu/search for moving from content to theme, learning area, grade, etc.

Acceptance criteria:

- content page can jump to theme
- content page can jump to learning area
- learner can search/select a node
- mobile UX is usable

---

### Issue 5: Add LearningNode content renderer

Render notes, practice, revision, assessment, and exam content from node references.

Acceptance criteria:

- notes render
- practice renders
- revision renders
- exam links render
- legacy assessment references work

---

### Issue 6: Migrate Grade 1 UI to LearningNode navigation

Use LearningNode pages for Grade 1.

Acceptance criteria:

- Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content works
- backward navigation works
- jump navigation works
- existing content remains accessible

---

### Issue 7: Cleanup legacy Grade 1 navigation

Remove unused files only after validation.

Acceptance criteria:

- confirmed unused files listed
- old broken/duplicate navigation removed
- production content still works
- no stable content IDs renamed

---

## 20. Acceptance Criteria for the Full Migration

The migration is complete when:

- every Grade 1 curriculum level is represented as a LearningNode
- every LearningNode has its own page
- learner can move from Academy to Content
- learner can move from Content back to any ancestor
- learner can jump from Content to Theme, Learning Area, or Grade
- child nodes are grouped clearly
- exams can live under Learning Area, Theme, Strand, or Sub-strand
- content pages render actual learning content
- UI is simple and non-cluttered
- routes and breadcrumbs work
- existing stable IDs are preserved
- obsolete files are deleted only after validation
- adding another grade does not require custom navigation code

---

## 21. Cline Prompt Template

```md
No terminal commands.

Use workspace file reading/search only.

Apply always-on rules first.

Task:
Implement the LearningNode UI navigation model for CBC Grade 1 migration.

Core hierarchy:
Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content

Important:
Every LearningNode must have its own page.
The UI must allow moving down, moving up, moving sideways, and jumping to a specific ancestor or related node.

Before editing, inspect:
- current LearningNode files
- current CBC academy registry
- current Grade 1 registry
- current Grade 1 English/English Activities content
- current routing
- current page components
- current assessment rendering
- current breadcrumbs/navigation components
- existing tests

Requirements:
- Use KICD naming: Learning Area, not Subject.
- Preserve existing stable IDs unless explicitly approved.
- Keep legacy Grade 1 content accessible during migration.
- Build reusable LearningNode UI components.
- Do not hardcode Grade 1-only navigation.
- Every node kind should have a page.
- Child nodes should be grouped by kind.
- Breadcrumbs must allow jumping to ancestors.
- Content pages must allow jumping back to Theme, Learning Area, Grade, and Academy.
- Exams may be attached under Learning Area, Theme, Strand, or Sub-strand.
- Keep UI simple, mobile-friendly, and non-cluttered.

Before editing, report:
- Files/areas inspected
- Current state
- Proposed changes
- Files to change
- Risks / assumptions

Wait for approval before writing files.
```

---

## 22. Final Recommendation

Proceed with this direction.

It is strong because it makes LearningNode the single source of truth for:

- curriculum hierarchy
- navigation
- page rendering
- breadcrumbs
- content discovery
- assessment placement
- future grade extension

The main risk is trying to migrate everything and delete legacy code in one PR.

Recommended sequence:

```text
1. Document the contract
2. Add graph
3. Add UI shell
4. Wrap current Grade 1 content
5. Switch Grade 1 navigation
6. Validate
7. Cleanup
```

Do not delete until the new LearningNode path has proven that Grade 1 works end-to-end.
