import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'itil-5-foundation-certification-guide',
  category: 'it-service-management',
  topicId: 'itil-foundation',
  title: 'ITIL 5 Foundation: The Complete Certification Guide',
  difficulty: 'Easy',
  prompt: 'A comprehensive, all-in-one guide to passing the ITIL 5 Foundation certification exam. Covers the exam format, syllabus, key concepts (ITIL Value System, Guiding Principles, Four Dimensions, Product and Service Lifecycle), study resources, exam tips, and step-by-step instructions for purchasing the exam voucher and scheduling the test. Includes official links, recommended books, and practice test resources.',
  tags: ['itil', 'certification', 'service-management', 'itsm', 'foundation', 'peoplecert', 'exam-guide'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'indigo'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: What is ITIL 5 Foundation?',
      content: 'ITIL® Foundation (Version 5) is the entry-level certification in the ITIL framework. Launched in February 2026, it validates your understanding of fundamental concepts in digital product and service management[reference:6]. It serves as the universal prerequisite for all advanced ITIL certifications, establishing the shared language and core knowledge needed to work effectively in modern IT service management environments[reference:7][reference:8]. This guide contains everything you need to know to pass the exam—no other resource is required.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Who Is This Certification For?',
      content: 'Anyone who needs to understand the basics of IT service management and how modern digital products and services are managed. It\'s ideal for IT professionals, project managers, business analysts, and anyone working in or with IT teams. No formal prerequisites are required[reference:9][reference:10].'
    },

    // ============================================================
    // PART 1: EXAM OVERVIEW
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Exam Overview — Format, Cost, and Logistics',
      content: 'Understanding the exam format, cost, and logistics is the first step to passing. Here is everything you need to know about the ITIL 5 Foundation exam.'
    },

    // --- 1.1 Exam Format ---
    {
      type: 'section',
      title: '1.1 Exam Format and Requirements',
      content: 'The ITIL 5 Foundation exam is a standardized, closed-book, multiple-choice test administered by PeopleCert[reference:11].'
    },
    {
      type: 'table',
      columns: ['Feature', 'Details'],
      rows: [
        ['Number of Questions', '40 multiple-choice questions[reference:12][reference:13]'],
        ['Exam Duration', '60 minutes (standard)[reference:14][reference:15]'],
        ['Exam Type', 'Closed book (no reference materials allowed)[reference:16][reference:17]'],
        ['Passing Score', '26 out of 40 correct answers (65%)[reference:18][reference:19][reference:20]'],
        ['Extra Time', '25% extra time for candidates taking the exam in a language other than their native language[reference:21]'],
        ['Prerequisites', 'No formal prerequisites[reference:22]']
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Key Exam Insight',
      content: 'Approximately 70% of the questions are scenario-based, testing your ability to apply concepts to real-world situations[reference:23]. Only about 30% are pure knowledge recall questions[reference:24]. This means you need to understand the concepts, not just memorize definitions[reference:25].'
    },

    // --- 1.2 How to Purchase and Take the Exam ---
    {
      type: 'section',
      title: '1.2 How to Purchase and Take the Exam',
      content: 'You can purchase the exam voucher directly from PeopleCert or through accredited training providers.'
    },
    {
      type: 'checklist',
      title: 'Step-by-Step Exam Purchase and Scheduling',
      items: [
        '**1. Purchase an Exam Voucher:** You can buy a voucher directly from PeopleCert or through an accredited training partner[reference:26].',
        '**2. Receive Your Voucher:** The voucher is typically valid for 12 months from the date of purchase[reference:27][reference:28].',
        '**3. Schedule Your Exam:** Use the voucher to schedule your exam through the PeopleCert portal. You can take the exam online from anywhere[reference:29].',
        '**4. Take the Exam:** The exam is 60 minutes long, closed-book, and consists of 40 multiple-choice questions[reference:30].',
        '**5. Get Your Results:** You\'ll receive your results immediately after completing the exam. A score of 26/40 (65%) is required to pass[reference:31][reference:32].'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Where to Buy the Exam Voucher',
      content: '✅ **Official PeopleCert Website:** [PeopleCert ITIL 5 Foundation](https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154)\n\n✅ **Accredited Training Providers:** Many providers offer courses that include the exam voucher[reference:33][reference:34]. Examples include QA[reference:35], Global Knowledge[reference:36], and Invensis Learning[reference:37].'
    },

    // --- 1.3 Cost ---
    {
      type: 'section',
      title: '1.3 Estimated Cost',
      content: 'The cost of the ITIL 5 Foundation exam varies depending on where you purchase it and whether you bundle it with training.'
    },
    {
      type: 'table',
      columns: ['Option', 'Estimated Cost (USD)'],
      rows: [
        ['Exam Voucher Only', 'Approximately $400–$500 (varies by region and provider)'],
        ['Exam Voucher + Self-Study Materials', '$500–$700'],
        ['Exam Voucher + Instructor-Led Training', '$1,000–$2,500+'],
        ['Exam Voucher + E-Learning (Guided Self-Study)', '~$1,089 (e.g., Vijfhart)[reference:38]']
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Voucher Validity',
      content: 'Exam vouchers are typically valid for **12 months** from the date of purchase[reference:39]. Make sure to schedule and complete your exam before the expiration date, as voucher validity cannot be extended[reference:40].'
    },

    // ============================================================
    // PART 2: SYLLABUS
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Syllabus — What You Need to Know',
      content: 'The ITIL 5 Foundation exam covers a broad range of topics related to digital product and service management. Here is the complete syllabus, broken down by domain, with the estimated percentage of questions for each area.'
    },

    // --- 2.1 Syllabus Overview ---
    {
      type: 'section',
      title: '2.1 Syllabus Overview and Question Distribution',
      content: 'While PeopleCert doesn\'t publish exact question distribution, the exam covers all major syllabus topics proportionally[reference:41].'
    },
    {
      type: 'table',
      columns: ['Domain', 'Estimated Weight', 'Key Topics'],
      rows: [
        ['Digital Product and Service Management Concepts', '20–25%[reference:42]', 'Value co-creation, service relationships, stakeholders, products vs. services, continual improvement fundamentals[reference:43]'],
        ['The ITIL Value System (ITIL VS)', '15–20%[reference:44]', '7 Guiding Principles, governance, value chain activities, continual improvement model[reference:45]'],
        ['Four Dimensions of Service Management', '10–15%[reference:46]', 'Organizations and People, Information and Technology, Partners and Suppliers, Value Streams and Processes[reference:47]'],
        ['Product and Service Lifecycle', '~15%', 'Discover, Design, Deliver, Support, Optimize, etc.'],
        ['ITIL Management Practices', '~15%', 'All 34 practices from ITIL 4 (with terminology updates)[reference:48]'],
        ['Governance, AI, and Modern Ways of Working', '~10%', 'AI Governance, the 6C Model, digital transformation, modern ways of working[reference:49]']
      ]
    },

    // --- 2.2 Key Concepts Deep Dive ---
    {
      type: 'section',
      title: '2.2 Key Concepts Deep Dive',
      content: 'Here are the most important concepts you need to master for the exam.'
    },

    // --- 2.2.1 The ITIL Value System (ITIL VS) ---
    {
      type: 'section',
      title: '2.2.1 The ITIL Value System (ITIL VS)',
      content: 'The ITIL Value System is the core model of ITIL 5. It brings together essential components like guiding principles, governance, value chain activities, and management practices to help organizations create, deliver, and improve services[reference:50].'
    },
    {
      type: 'checklist',
      title: 'Components of the ITIL Value System',
      items: [
        '**Guiding Principles (7):** The timeless recommendations that guide decision-making[reference:51].',
        '**Governance:** How organizations direct and control service management activities.',
        '**Value Chain Activities (8):** The core activities that create value (e.g., Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support).',
        '**Management Practices (34):** The specific practices used to manage services (e.g., Incident Management, Change Enablement).',
        '**Continual Improvement:** The ongoing effort to improve services and processes.'
      ]
    },

    // --- 2.2.2 The 7 Guiding Principles ---
    {
      type: 'section',
      title: '2.2.2 The 7 ITIL Guiding Principles',
      content: 'These principles are the philosophical foundation of ITIL and remain unchanged from ITIL 4[reference:52].'
    },
    {
      type: 'checklist',
      title: 'The 7 Guiding Principles',
      items: [
        '**1. Focus on value:** Everything you do should deliver value to the customer.',
        '**2. Start where you are:** Don\'t start from scratch; build on what you already have.',
        '**3. Progress iteratively with feedback:** Use feedback to improve continuously.',
        '**4. Collaborate and promote visibility:** Work together and make work visible.',
        '**5. Think and work holistically:** Consider the whole system, not just individual parts.',
        '**6. Keep it simple and practical:** Avoid unnecessary complexity.',
        '**7. Optimize and automate:** Use automation to improve efficiency.'
      ]
    },

    // --- 2.2.3 The 4 Dimensions ---
    {
      type: 'section',
      title: '2.2.3 The Four Dimensions of Service Management',
      content: 'These dimensions provide a holistic perspective on service management, ensuring balanced consideration of all aspects[reference:53].'
    },
    {
      type: 'checklist',
      title: 'The Four Dimensions',
      items: [
        '**1. Organizations and People:** Culture, roles, and capabilities.',
        '**2. Information and Technology:** Data, knowledge, and emerging technologies.',
        '**3. Partners and Suppliers:** Relationships, contracts, and the ecosystem.',
        '**4. Value Streams and Processes:** How work flows and how activities connect.'
      ]
    },

    // --- 2.2.4 Product and Service Lifecycle ---
    {
      type: 'section',
      title: '2.2.4 The Product and Service Lifecycle',
      content: 'ITIL 5 introduces a new Product and Service Lifecycle that unifies digital product management and service management in a single model[reference:54]. This is a major shift from ITIL 4, which leaned heavily toward services.'
    },
    {
      type: 'checklist',
      title: 'Lifecycle Activities (Examples)',
      items: [
        '**Discover:** Identify needs and opportunities.',
        '**Design:** Plan and design the product or service.',
        '**Deliver:** Build, test, and deploy the product or service.',
        '**Support:** Provide ongoing support and maintenance.',
        '**Optimize:** Continuously improve the product or service.'
      ]
    },

    // --- 2.2.5 AI Governance and the 6C Model ---
    {
      type: 'section',
      title: '2.2.5 AI Governance and the 6C Model',
      content: 'ITIL 5 is "AI native by design" and includes a formal AI Governance framework built on the 6C Model[reference:55][reference:56].'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'What is the 6C Model?',
      content: 'The 6C Model is the framework for AI Governance in ITIL 5. The specific "6 C\'s" are detailed in the official study materials. Make sure you understand this new concept, as it\'s a key differentiator between ITIL 4 and ITIL 5.'
    },

    // --- 2.2.6 The 34 Management Practices ---
    {
      type: 'section',
      title: '2.2.6 The 34 ITIL Management Practices',
      content: 'All 34 practices from ITIL 4 remain in ITIL 5, with only minor terminology updates[reference:57].'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Key Practices to Know',
      content: 'While you don\'t need to memorize all 34 practices in detail, you should understand the purpose of the most common ones, including: **Incident Management, Problem Management, Change Enablement, Service Level Management, Continual Improvement, and Service Request Management**.'
    },

    // ============================================================
    // PART 3: STUDY RESOURCES
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Study Resources — What to Read and Where to Find It',
      content: 'Here are the best resources to help you prepare for the ITIL 5 Foundation exam, including official materials, recommended books, and practice tests.'
    },

    // --- 3.1 Official Resources ---
    {
      type: 'section',
      title: '3.1 Official Resources from PeopleCert',
      content: 'The most authoritative source of information is PeopleCert itself.'
    },
    {
      type: 'checklist',
      title: 'Official Resources',
      items: [
        '**PeopleCert Website:** [ITIL 5 Foundation Certification Page](https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-5-foundation-version-50-4154) — Official information, exam details, and voucher purchase.',
        '**ITIL Foundation (Version 5) Digital Badge:** [Badge Information](https://badges.peoplecert.org/Badge/en/67AF26F6-72B5-4BBB-A4C8-5FF1BBDEC1F5) — See the skills and knowledge validated by the certification[reference:58].',
        '**Official Core Guidance eBook:** Included with many training courses, providing the definitive reference material[reference:59][reference:60].'
      ]
    },

    // --- 3.2 Recommended Books ---
    {
      type: 'section',
      title: '3.2 Recommended Study Guides and Books',
      content: 'Several comprehensive study guides have been published specifically for the ITIL 5 Foundation exam.'
    },
    {
      type: 'table',
      columns: ['Book Title', 'Key Features', 'Where to Buy'],
      rows: [
        ['ITIL 5 Foundation Study Guide 2026 by Anthony Biggs[reference:61]', '165 practice questions, AI Governance & 6C Model, all 34 practices, includes access to online exam portal (5 practice exams, 200 digital flashcards)[reference:62]', 'Amazon (US, UK, EU, etc.)[reference:63][reference:64]'],
        ['ITIL 5 Foundation Study Guide by M.A. Ivins[reference:65]', 'Complete guide for the new exam, covers the 8-activity Value Chain, AI Governance, and the shift to digital product and service management[reference:66]', 'Amazon[reference:67]'],
        ['ITIL 5 Foundation Exam Prep 2026–2027 by Clarence B. Barrios[reference:68]', '500+ questions, 13 practice tests, full content review[reference:69]', 'Amazon (Kindle)[reference:70]'],
        ['ITIL 5 Foundation Study Guide 2026 by Dominic Eleven[reference:71]', '1,500 practice questions across all four question formats, with full rationales[reference:72]', 'Amazon (Kindle)[reference:73]']
      ]
    },

    // --- 3.3 Practice Tests ---
    {
      type: 'section',
      title: '3.3 Practice Tests and Online Resources',
      content: 'Taking practice tests is one of the most effective ways to prepare for the exam.'
    },
    {
      type: 'checklist',
      title: 'Practice Test Resources',
      items: [
        '**Udemy:** [ITIL Foundation (ITILFND-V5) Practice Exams — 1,500 Questions](https://www.udemy.com) — Realistic, exam-style questions aligned with the current syllabus[reference:74].',
        '**Udemy:** [Practice Tests for ITIL Foundation Version 5 — 2026](https://www.udemy.com) — 6 complete practice exams (240 unique questions) covering all official syllabus categories[reference:75].',
        '**CertShero:** [PeopleCert ITIL Foundation (Version 5) ITIL-5-Foundation Exam Questions](https://www.certshero.com) — Sample questions and exam preparation materials[reference:76].',
        '**Invensis Learning:** [ITIL v5 Foundation Exam Details](https://www.invensislearning.com/info/itil-v5-foundation-exam-details) — Comprehensive guide with exam tips and syllabus breakdown[reference:77].'
      ]
    },

    // --- 3.4 Training Providers ---
    {
      type: 'section',
      title: '3.4 Accredited Training Providers',
      content: 'Taking an accredited course is the most structured way to prepare for the exam. Many providers include the exam voucher in the course price.'
    },
    {
      type: 'table',
      columns: ['Provider', 'Offerings', 'Cost (Approx.)'],
      rows: [
        ['**QA** (qa.com)[reference:78]', 'Online learning, blended learning, instructor-led, includes exam voucher[reference:79]', 'Varies — check website'],
        ['**Global Knowledge** (globalknowledge.com)[reference:80]', 'Training + exam voucher included[reference:81]', 'Varies — check website'],
        ['**Invensis Learning** (invensislearning.com)[reference:82]', 'Training + exam voucher included', 'Varies — check website'],
        ['**Vijfhart** (vijfhart.nl)[reference:83]', 'E-learning with exam voucher (self-study)[reference:84]', '~$1,089 USD[reference:85]'],
        ['**PMG Academy** (pmgacademy.com)[reference:86]', '16 hours of content + exam voucher[reference:87]', '$697 USD[reference:88]']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Always Choose Accredited Training',
      content: 'Ensure your training provider is an **Accredited Training Partner of PeopleCert**[reference:89]. This guarantees the quality of the training and that the exam voucher is valid.'
    },

    // ============================================================
    // PART 4: EXAM TIPS AND STRATEGIES
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Exam Tips and Strategies — How to Pass on Your First Attempt',
      content: 'Here are proven strategies to maximize your chances of passing the ITIL 5 Foundation exam on your first attempt.'
    },

    // --- 4.1 Study Strategies ---
    {
      type: 'section',
      title: '4.1 Study Strategies',
      content: 'Effective preparation is key to passing the exam.'
    },
    {
      type: 'checklist',
      title: 'Study Tips',
      items: [
        '**Understand, Don\'t Memorize:** 70% of the questions are scenario-based[reference:90]. Focus on understanding how to apply concepts in real-world situations, not just memorizing definitions[reference:91].',
        '**Use Multiple Resources:** Combine the official eBook, a study guide, and practice tests for comprehensive preparation[reference:92].',
        '**Take Practice Exams:** Simulate the real exam environment with timed practice tests. Aim for a score of 80% or higher on practice exams before attempting the real one.',
        '**Focus on Weak Areas:** Use practice test results to identify your weak areas and focus your study efforts there.',
        '**Study the Syllabus:** Make sure you cover all topics in the syllabus, including the new material on AI Governance and the Product and Service Lifecycle.'
      ]
    },

    // --- 4.2 Exam Day Tips ---
    {
      type: 'section',
      title: '4.2 Exam Day Tips',
      content: 'What to do on the day of the exam to ensure success.'
    },
    {
      type: 'checklist',
      title: 'Exam Day Checklist',
      items: [
        '**Arrive Early:** If taking the exam at a test center, arrive at least 15 minutes early. For online exams, ensure your internet connection and webcam are working.',
        '**Read Questions Carefully:** Pay attention to keywords like "BEST," "FIRST," "MOST," and "EXCEPT."',
        '**Eliminate Wrong Answers:** Use the process of elimination to narrow down your choices.',
        '**Manage Your Time:** You have 60 minutes for 40 questions, which is 1.5 minutes per question. Don\'t spend too long on any single question.',
        '**Flag and Review:** Flag questions you\'re unsure about and review them at the end if time permits.',
        '**Stay Calm:** Take deep breaths and stay focused. You\'ve prepared for this!'
      ]
    },

    // --- 4.3 What to Expect ---
    {
      type: 'section',
      title: '4.3 What to Expect After the Exam',
      content: 'You\'ll receive your results immediately after completing the exam.'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Passing the Exam',
      content: 'If you pass (score 26/40 or higher), you\'ll receive a digital badge from PeopleCert that validates your knowledge of key ITIL concepts[reference:93]. The certification is valid for three years[reference:94] and serves as the prerequisite for all advanced ITIL certifications[reference:95].'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'If You Don\'t Pass',
      content: 'Don\'t worry! You can retake the exam. Many training providers offer a free retake option[reference:96]. You can also purchase the "Take2" option for an additional fee, which allows a second exam attempt[reference:97]. Review your weak areas, study more, and try again.'
    },

    // ============================================================
    // PART 5: ITIL 4 vs ITIL 5 — WHAT CHANGED
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: ITIL 4 vs ITIL 5 — What Changed and Why It Matters',
      content: 'If you already hold ITIL 4 Foundation, you don\'t need to start from scratch. ITIL 5 is an evolution, not a revolution[reference:98]. PeopleCert describes ITIL 5 as containing 40% retained content from ITIL 4, 36% completely new material, and 24% changed or enhanced content[reference:99].'
    },
    {
      type: 'table',
      columns: ['ITIL 4', 'ITIL 5 (Version 5)'],
      rows: [
        ['Focused on Service Management', 'Focused on Digital Product and Service Management[reference:100]'],
        ['Service Value System (SVS)', 'ITIL Value System (ITIL VS) — renamed to be more inclusive of products[reference:101]'],
        ['Leaned heavily toward services', 'Treats products and services as two sides of one solution[reference:102]'],
        ['AI as an emerging topic', '"AI native by design" — built to work naturally with AI, DevOps, and Agile[reference:103]'],
        ['No dedicated AI Governance publication', 'Dedicated AI Governance publication with the 6C Model[reference:104]']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'ITIL 4 vs ITIL 5 Bridge Exam',
      content: 'If you already hold ITIL 4 Foundation, you can take a condensed **ITIL 5 Foundation Bridge** exam. This exam is 30 minutes long with 20 multiple-choice questions, and a passing score of 65% (13/20)[reference:105]. This is a faster pathway to upgrade your certification.'
    },

    // ============================================================
    // PART 6: CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Your Path to Certification',
      content: 'You now have everything you need to pass the ITIL 5 Foundation exam:\n\n✅ **Exam Format:** 40 questions, 60 minutes, 65% passing score[reference:106]\n\n✅ **Syllabus:** ITIL Value System, 7 Guiding Principles, 4 Dimensions, Product and Service Lifecycle, 34 Practices, AI Governance[reference:107][reference:108]\n\n✅ **Resources:** Official PeopleCert materials[reference:109], recommended study guides[reference:110], practice tests[reference:111], and accredited training providers[reference:112]\n\n✅ **Next Steps:** Purchase your exam voucher from PeopleCert, study using the resources above, take practice tests, and schedule your exam when you\'re ready[reference:113]\n\n**You\'ve got this! Good luck on your certification journey.** 🚀'
    }
  ],
  explanation: 'A comprehensive, all-in-one guide to passing the ITIL 5 Foundation certification exam. Covers the exam format (40 questions, 60 minutes, 65% passing score), the full syllabus (ITIL Value System, 7 Guiding Principles, 4 Dimensions, Product and Service Lifecycle, 34 Practices, AI Governance), study resources (official materials, books, practice tests), accredited training providers, exam tips, and step-by-step instructions for purchasing the exam voucher and scheduling the test. Includes links to official PeopleCert resources and recommended study guides.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;