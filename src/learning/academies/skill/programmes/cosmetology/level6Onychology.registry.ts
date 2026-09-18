import type { LearningBookContent, LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

export const COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID =
  'cos-l6-m18-onychology';
export const COSMETOLOGY_ONYCHOLOGY_INTRO_TOPIC_NODE_ID =
  'cos-l6-m18-t01-intro';
export const COSMETOLOGY_ONYCHOLOGY_INTRO_MATERIAL_NODE_ID =
  'cos-l6-m18-lm01-overview';

const onychologyIntroductionBook: LearningBookContent = {
  type: 'book',
  title: 'Onychology Overview',
  description: 'A professional introduction to nail science, nail services, scope of practice, and client safety.',
  pages: [
    {
      id: 'what-is-onychology',
      title: 'What Is Onychology?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Onychology is the study of nails. In professional cosmetology it includes nail structure and growth, nail care, manicure and pedicure science, enhancement systems, product chemistry, infection prevention, visible abnormalities, contraindications, and safe referral.'
        },
        {
          type: 'list',
          title: 'Why nail science matters',
          items: [
            'It helps the cosmetologist distinguish normal nail features from visible changes that need caution.',
            'It supports safe manicure, pedicure, gel, acrylic, tip, wrap, and polish services.',
            'It explains how nail products adhere, harden, cure, and interact with the natural nail.',
            'It helps protect the client from avoidable trauma, contamination, irritation, and sensitisation.'
          ]
        }
      ]
    },
    {
      id: 'professional-scope',
      title: 'Professional Scope and Safety',
      blocks: [
        {
          type: 'paragraph',
          text: 'A cosmetologist observes the nail and surrounding skin, asks relevant consultation questions, identifies contraindications, and decides whether to proceed, modify, postpone, or refer. The cosmetologist does not medically diagnose nail disease unless separately qualified to do so.'
        },
        {
          type: 'list',
          title: 'Examples of findings that require caution',
          items: [
            'Open wounds, bleeding, or severe inflammation around the nail.',
            'Painful swelling or an unexplained change in the nail or surrounding tissue.',
            'Visible signs suggesting infection.',
            'Unexpected nail separation, severe discoloration, or a reaction to a previous product.'
          ]
        }
      ]
    },
    {
      id: 'module-roadmap',
      title: 'What You Will Learn',
      blocks: [
        {
          type: 'list',
          items: [
            'Nail-unit anatomy and nail growth.',
            'Normal nail characteristics and visible abnormalities.',
            'Manicure and pedicure science.',
            'Nail shapes, structure, stress areas, and mechanical balance.',
            'Acrylic, gel, tips, wraps, polish, and enhancement chemistry.',
            'Tools, equipment, e-file safety, hygiene, contraindications, aftercare, and referral.'
          ]
        },
        {
          type: 'paragraph',
          title: 'Visual-learning rule',
          text: 'Detailed nail anatomy is taught in the next learning material and must include a clearly labelled nail-unit illustration showing the structures being discussed.'
        }
      ]
    }
  ],
  metadata: {
    status: 'draft',
    module: 18,
    level: 6,
    source: 'original'
  }
};

export const cosmetologyOnychologyNodes: LearningNode[] = [
  createLearningNode({
    id: COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID,
    kind: LEARNING_NODE_KINDS.module,
    label: 'M18 · Onychology',
    summary: 'Nail science, nail care, enhancements, product chemistry, safety and professional nail services.',
    parentId: 'cos-l6',
    childIds: [COSMETOLOGY_ONYCHOLOGY_INTRO_TOPIC_NODE_ID],
    attributes: [
      { key: 'routeSegment', value: 'onychology' },
      { key: 'officialTitle', value: 'Onychology, Manicure, Pedicure and Nail Technology' },
      { key: 'moduleNumber', value: 18 }
    ],
    actions: [{ intent: 'openChildren' }],
    appearances: [
      { key: 'icon', value: '💅' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  }),
  createLearningNode({
    id: COSMETOLOGY_ONYCHOLOGY_INTRO_TOPIC_NODE_ID,
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Nail Science Basics',
    summary: 'Understand the scope of nail science, professional nail services, safety and the module learning journey.',
    parentId: COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID,
    childIds: [COSMETOLOGY_ONYCHOLOGY_INTRO_MATERIAL_NODE_ID],
    attributes: [
      { key: 'routeSegment', value: 'basics' },
      { key: 'officialTitle', value: 'Introduction to Onychology' }
    ],
    actions: [{ intent: 'openChildren' }],
    appearances: [
      { key: 'icon', value: '📚' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  }),
  createLearningNode({
    id: COSMETOLOGY_ONYCHOLOGY_INTRO_MATERIAL_NODE_ID,
    kind: LEARNING_NODE_KINDS.learningMaterial,
    label: 'Onychology Overview',
    summary: 'Begin the Level 6 nail science learning area.',
    parentId: COSMETOLOGY_ONYCHOLOGY_INTRO_TOPIC_NODE_ID,
    content: onychologyIntroductionBook,
    attributes: [
      { key: 'routeSegment', value: 'overview' },
      { key: 'officialTitle', value: 'Onychology Overview' },
      { key: 'contentType', value: 'notes' }
    ],
    actions: [{ intent: 'resume' }],
    appearances: [
      { key: 'icon', value: '📖' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  })
];
