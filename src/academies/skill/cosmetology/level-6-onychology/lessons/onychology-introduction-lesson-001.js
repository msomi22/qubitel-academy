import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const lesson = defineLearningProblem({
  id: 'cosmetology-onychology-introduction-lesson-001',
  category: 'cosmetology',
  topicId: 'level-6-onychology',
  title: 'Introduction to Onychology',
  difficulty: 'Foundation',
  estimatedTimeSeconds: 600,
  question: 'Understand the scope of onychology, professional nail services, client safety, and referral boundaries.',
  body: [
    {
      type: 'section',
      title: 'What is onychology?',
      content: 'Onychology is the study of nails. In professional cosmetology it includes nail structure and growth, manicure and pedicure science, enhancement systems, product chemistry, infection prevention, visible abnormalities, contraindications, and safe referral.'
    },
    {
      type: 'section',
      title: 'Why nail science matters',
      content: 'Understanding nail science helps a cosmetologist protect the natural nail, select appropriate services and products, recognise visible changes that need caution, and reduce avoidable trauma, contamination, irritation, and sensitisation.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Professional scope',
      content: 'A cosmetologist may observe and describe visible nail changes, identify contraindications, postpone or modify a service, and recommend referral. Medical diagnosis and treatment belong to appropriately qualified healthcare professionals.'
    },
    {
      type: 'section',
      title: 'What comes next',
      content: 'The next nail-science material will cover nail-unit anatomy and growth using a clearly labelled instructional illustration, followed by abnormalities, manicure, pedicure, enhancement chemistry, tools, hygiene, and safety.'
    }
  ],
  explanation: 'Safe nail practice depends on scientific understanding, careful observation, infection prevention, and working within professional scope.',
  finalTakeaway: 'Study the nail, assess the client, protect the natural structure, and never cover a concerning finding simply for cosmetic appearance.',
  tags: ['skill-academy', 'cosmetology', 'level-6', 'onychology', 'nails', 'lesson'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'cosmetology-level-6',
    sequence: 1
  }
});

export default lesson;
