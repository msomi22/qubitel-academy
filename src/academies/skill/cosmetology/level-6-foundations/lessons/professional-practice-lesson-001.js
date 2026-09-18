import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const lesson = defineLearningProblem({
  id: 'cosmetology-professional-practice-lesson-001',
  category: 'cosmetology',
  topicId: 'level-6-foundations',
  title: 'Professional Scope and Scientific Foundations',
  difficulty: 'Foundation',
  estimatedTimeSeconds: 600,
  question: 'Understand professional scope, scientific reasoning, client safety, and referral boundaries in cosmetology.',
  body: [
    {
      type: 'section',
      title: 'Professional cosmetology',
      content: 'Cosmetology is the professional study and practice of hair, scalp, skin, nail, beauty, grooming, and related salon services. Professional practice combines practical skill with scientific understanding, client consultation, safety, ethics, and sound judgement.'
    },
    {
      type: 'section',
      title: 'Science supports every service',
      content: 'Anatomy, physiology, microbiology, chemistry, trichology, cutaneous biology, onychology, colour science, and other applied sciences help a cosmetologist understand what is being treated, how products behave, and what risks must be controlled.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Scope boundary',
      content: 'A cosmetologist may observe visible changes, identify contraindications, and recommend referral. Medical diagnosis and treatment belong to appropriately qualified healthcare professionals.'
    },
    {
      type: 'section',
      title: 'Professional decision sequence',
      content: 'Consult the client, observe the treatment area, identify contraindications and sensitivities, choose an appropriate service and products, explain risks and aftercare, and proceed only when the service can be performed safely.'
    }
  ],
  explanation: 'Professional cosmetology is not only about performing a technique. It is about understanding the client, the science, the service, the product, and the risk before making a decision.',
  finalTakeaway: 'Think like a professional: assess first, understand the science, work within scope, and put client safety before the requested service.',
  tags: ['skill-academy', 'cosmetology', 'level-6', 'professional-practice', 'lesson'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'cosmetology-level-6',
    sequence: 1
  }
});

export default lesson;
