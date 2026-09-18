import type { LearningNode, LearningBookContent } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

export const COSMETOLOGY_LEVEL_6_NODE_ID = 'cos-l6';
export const COSMETOLOGY_FOUNDATIONS_MODULE_NODE_ID = 'cos-l6-m01-foundations';
export const COSMETOLOGY_PROFESSIONAL_SCOPE_TOPIC_NODE_ID = 'cos-l6-m01-t01-scope';

const professionalScopeBook: LearningBookContent = {
  type: 'book',
  title: 'Getting Started with Professional Cosmetology',
  description: 'An introduction to professional scope, scientific thinking, client safety, and the Level 6 learning journey.',
  pages: [
    {
      id: 'professional-cosmetology',
      title: 'Professional Cosmetology',
      blocks: [
        {
          type: 'paragraph',
          title: 'What cosmetology means',
          text: 'Cosmetology is the professional study and practice of hair, scalp, skin, nail, beauty, grooming, and related salon services. A competent cosmetologist does more than perform procedures: they understand why a service is appropriate, how products and tools affect the client, and when a service should be modified, postponed, or refused.'
        },
        {
          type: 'list',
          title: 'Level 6 develops professional judgement',
          items: [
            'Connect scientific knowledge to practical service decisions.',
            'Analyse client needs before selecting products, tools, or procedures.',
            'Work safely within professional scope and recognise when referral is appropriate.',
            'Explain the reason behind a professional decision rather than relying on habit alone.'
          ]
        }
      ]
    },
    {
      id: 'science-behind-practice',
      title: 'Science Behind the Practice',
      blocks: [
        {
          type: 'paragraph',
          text: 'Professional cosmetology draws on anatomy, physiology, microbiology, chemistry, trichology, cutaneous biology, onychology, colour science, myology, and other applied sciences. These subjects help the learner understand the structures being treated, the products being applied, and the risks that must be controlled.'
        },
        {
          type: 'list',
          title: 'Examples',
          items: [
            'Trichology supports safe hair and scalp services.',
            'Cutaneous biology supports skin analysis and facial care.',
            'Onychology supports nail services and recognition of visible abnormalities.',
            'Cosmetic chemistry explains pH, ingredients, oxidation, polymerisation, and product behaviour.',
            'Microbiology explains contamination, infection prevention, cleaning, disinfection, and safe salon practice.'
          ]
        }
      ]
    },
    {
      id: 'professional-boundaries',
      title: 'Professional Boundaries and Client Safety',
      blocks: [
        {
          type: 'paragraph',
          text: 'A cosmetologist may observe and describe visible changes, ask relevant consultation questions, identify contraindications, and recommend referral. Medical diagnosis and treatment belong to appropriately qualified healthcare professionals.'
        },
        {
          type: 'list',
          title: 'Before beginning a service',
          ordered: true,
          items: [
            'Consult the client and clarify the requested outcome.',
            'Observe the relevant hair, scalp, skin, nails, or body area.',
            'Identify contraindications, sensitivities, previous reactions, and service history.',
            'Select a suitable service, product, tool, and technique.',
            'Explain important risks, expectations, and aftercare.',
            'Proceed only when the service can be performed safely.'
          ]
        }
      ]
    },
    {
      id: 'think-like-professional',
      title: 'Think Like a Professional',
      blocks: [
        {
          type: 'paragraph',
          title: 'Client scenario',
          text: 'A client asks for a service they have received many times before, but today you notice an unusual change in the treatment area. Professional practice means you do not automatically repeat the previous service. You reassess the client, determine whether the service is safe within your scope, and refer when the finding requires medical assessment.'
        },
        {
          type: 'list',
          title: 'Knowledge check',
          items: [
            'Why is consultation necessary even for a returning client?',
            'What is the difference between recognising an abnormality and diagnosing a condition?',
            'Name three sciences that support professional cosmetology and explain what each contributes.'
          ]
        }
      ]
    }
  ],
  metadata: {
    status: 'draft',
    module: 1,
    level: 6,
    source: 'original'
  }
};

export const cosmetologyLevel6ContentNodes: LearningNode[] = [
  createLearningNode({
    id: COSMETOLOGY_FOUNDATIONS_MODULE_NODE_ID,
    kind: LEARNING_NODE_KINDS.module,
    label: 'M1 · Foundations',
    summary: 'Professional scope, scientific foundations, ethics, safety, consultation and professional reasoning.',
    parentId: COSMETOLOGY_LEVEL_6_NODE_ID,
    childIds: [COSMETOLOGY_PROFESSIONAL_SCOPE_TOPIC_NODE_ID],
    attributes: [
      { key: 'routeSegment', value: 'foundations' },
      { key: 'officialTitle', value: 'Cosmetology Foundations and Professional Practice' },
      { key: 'moduleNumber', value: 1 }
    ],
    actions: [{ intent: 'resume' }],
    appearances: [
      { key: 'icon', value: '🎓' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  }),
  createLearningNode({
    id: COSMETOLOGY_PROFESSIONAL_SCOPE_TOPIC_NODE_ID,
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Professional Scope',
    summary: 'Understand what professional cosmetology covers, how science supports practice, and where professional boundaries apply.',
    parentId: COSMETOLOGY_FOUNDATIONS_MODULE_NODE_ID,
    content: professionalScopeBook,
    attributes: [
      { key: 'routeSegment', value: 'scope' },
      { key: 'officialTitle', value: 'Professional Scope & Scientific Foundations' },
      { key: 'contentType', value: 'notes' }
    ],
    actions: [{ intent: 'openChildren' }],
    appearances: [
      { key: 'icon', value: '📚' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  }),

];
