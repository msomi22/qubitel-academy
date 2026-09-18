import type { LearningBookContent, LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

export const COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID =
  'cos-l6-m18-onychology';
export const COSMETOLOGY_ONYCHOLOGY_OVERVIEW_TOPIC_NODE_ID =
  'cos-l6-m18-t01-overview';

const onychologyIntroductionBook: LearningBookContent = {
  type: 'book',
  title: 'Onychology Overview',
  description: 'Nail-unit anatomy, growth, function, professional relevance, safety, and the scientific foundation for nail services.',
  pages: [
    {
      id: 'onychology-foundation',
      title: 'Onychology',
      blocks: [
        {
          type: 'paragraph',
          title: 'What onychology means',
          text: 'Onychology is the study of nails and the nail unit. In professional cosmetology it includes nail anatomy, growth, function, nail care, manicure and pedicure science, enhancement systems, product chemistry, infection prevention, visible abnormalities, contraindications, and safe referral.'
        },
        {
          type: 'list',
          title: 'By the end of this overview, you should be able to',
          items: [
            'identify the main structures of the nail unit;',
            'explain the basic function of each structure;',
            'describe how the nail plate grows;',
            'relate nail anatomy to manicure, pedicure, and enhancement services;',
            'distinguish normal professional observation from medical diagnosis.'
          ]
        },
        {
          type: 'paragraph',
          title: 'Why this matters in the salon',
          text: 'A nail professional works on and around living tissue. Understanding the nail unit helps prevent avoidable trauma, supports correct product application, improves consultation, and helps the cosmetologist recognise when a service should be modified, postponed, or referred.'
        }
      ]
    },
    {
      id: 'nail-unit-top-view',
      title: 'Nail Unit: Top View',
      blocks: [
        {
          type: 'image',
          src: '/cosmetology/visuals/04-nails-body/18-01a-nail-unit-top-view.png',
          alt: 'Labelled top view of a human fingernail showing the proximal nail fold, cuticle, lunula, lateral nail folds, nail plate, and free edge.',
          caption: 'Figure 18.1A — Nail Unit Top View. Major visible structures used during consultation, shaping, and nail services.'
        },
        {
          type: 'paragraph',
          text: 'From the surface, the learner should be able to identify the nail plate, free edge, lunula, proximal nail fold, lateral nail folds, and cuticle area. These landmarks guide observation, shaping, product placement, and safe use of tools.'
        },
        {
          type: 'list',
          title: 'Identify these visible structures',
          items: [
            'proximal nail fold;',
            'cuticle;',
            'lunula;',
            'lateral nail folds;',
            'nail plate;',
            'free edge.'
          ]
        }
      ]
    },
    {
      id: 'nail-unit-cross-section',
      title: 'Nail Unit: Cross-Section',
      blocks: [
        {
          type: 'image',
          src: '/cosmetology/visuals/04-nails-body/18-01b-nail-unit-cross-section.png',
          alt: 'Labelled longitudinal cross-section of the human nail unit showing the proximal nail fold, eponychium, cuticle, nail matrix, lunula, nail plate, nail bed, hyponychium, and free edge.',
          caption: 'Figure 18.1B — Nail Unit Cross-Section. Hidden supporting structures of the nail unit, including the growth region and protective seals.'
        },
        {
          type: 'paragraph',
          text: 'The cross-section reveals structures that cannot be fully understood from the surface. The matrix produces most of the nail plate, the nail bed supports the plate, and the proximal and distal tissues help protect the nail unit from trauma and contamination.'
        },
        {
          type: 'list',
          title: 'Identify these internal and supporting structures',
          items: [
            'proximal nail fold;',
            'eponychium;',
            'cuticle;',
            'nail matrix;',
            'lunula;',
            'nail plate;',
            'nail bed;',
            'hyponychium;',
            'free edge.'
          ]
        }
      ]
    },
    {
      id: 'plate-bed-free-edge',
      title: 'Plate, Bed and Free Edge',
      blocks: [
        {
          type: 'paragraph',
          title: 'Nail plate',
          text: 'The nail plate is the hard, translucent structure commonly called the nail. It is formed from compact keratinised cells. It protects the distal finger or toe and provides the surface on which polish, gel, acrylic, tips, wraps, and other cosmetic systems are applied.'
        },
        {
          type: 'paragraph',
          title: 'Nail bed',
          text: 'The nail bed is the vascular tissue directly beneath most of the nail plate. It supports and anchors the plate as it grows forward. Its blood supply contributes to the pink appearance seen through a healthy translucent nail plate.'
        },
        {
          type: 'paragraph',
          title: 'Free edge',
          text: 'The free edge is the distal part of the nail plate that extends beyond the nail bed and fingertip. It is the portion most commonly shortened, filed, and shaped during manicure or pedicure services.'
        },
        {
          type: 'paragraph',
          title: 'Professional connection',
          text: 'Excessive filing, drilling, or pressure can thin the nail plate or traumatise the tissues beneath it. Length and shape also change mechanical leverage, so longer extensions place greater stress on the natural nail and surrounding structures.'
        }
      ]
    },
    {
      id: 'matrix-lunula-growth',
      title: 'Matrix, Lunula and Growth',
      blocks: [
        {
          type: 'paragraph',
          title: 'Nail matrix',
          text: 'The nail matrix is the principal growth region that produces the nail plate. It lies mainly beneath the proximal nail fold and extends distally toward the visible lunula. Matrix cells divide, keratinise, flatten, and become incorporated into the growing plate.'
        },
        {
          type: 'paragraph',
          title: 'Lunula',
          text: 'The lunula is the pale crescent sometimes visible at the proximal end of the nail. It represents the visible distal portion of the matrix in nails where it can be seen clearly. It may be prominent on some fingers and barely visible on others.'
        },
        {
          type: 'paragraph',
          title: 'How the nail grows',
          text: 'As new plate material is produced proximally, the existing nail plate moves forward over the nail bed. Fingernails generally grow faster than toenails, but growth rate varies with age, anatomical site, health, trauma, and other physiological factors.'
        },
        {
          type: 'paragraph',
          title: 'Why matrix protection matters',
          text: 'Because the matrix forms most of the nail plate, trauma in this area can alter nail thickness, surface, shape, or growth. Aggressive cutting, drilling, or pressure around the proximal nail area should therefore be avoided.'
        }
      ]
    },
    {
      id: 'folds-cuticle-hyponychium',
      title: 'Protective Folds and Seals',
      blocks: [
        {
          type: 'paragraph',
          title: 'Proximal and lateral nail folds',
          text: 'The proximal nail fold covers and protects the emerging nail plate and underlying matrix region. The lateral nail folds border the sides of the plate and help protect the nail unit from trauma and contamination.'
        },
        {
          type: 'paragraph',
          title: 'Eponychium and cuticle',
          text: 'Terminology varies between medical and salon literature. For cosmetology practice, it is useful to distinguish the living tissue at the proximal nail fold from the thin keratinised cuticle material that extends onto and adheres to the nail plate. Living tissue should not be aggressively cut. Any non-living cuticle removal must be gentle and limited to what can be removed safely.'
        },
        {
          type: 'paragraph',
          title: 'Hyponychium',
          text: 'The hyponychium is the tissue beneath the free edge where the nail bed transitions to the skin of the fingertip. It contributes to the protective barrier at the distal end of the nail unit.'
        },
        {
          type: 'paragraph',
          title: 'Salon application',
          text: 'Do not dig deeply under the free edge, aggressively cut living proximal tissue, or force instruments into the lateral folds. Damaging these protective barriers can cause pain, bleeding, and increase the risk of contamination or infection.'
        }
      ]
    },
    {
      id: 'functions-professional-relevance',
      title: 'Function and Professional Relevance',
      blocks: [
        {
          type: 'list',
          title: 'Functions of the nails',
          items: [
            'protect the tips of the fingers and toes;',
            'support fine manipulation and picking up small objects;',
            'provide counter-pressure that assists fingertip sensation and precision;',
            'contribute to scratching, grooming, and appearance.'
          ]
        },
        {
          type: 'list',
          title: 'Why nail anatomy matters to a cosmetologist',
          items: [
            'to avoid damaging living tissue during manicure and pedicure;',
            'to prepare the natural plate without unnecessary thinning;',
            'to place enhancements with correct balance and stress distribution;',
            'to recognise visible changes that require caution;',
            'to explain aftercare and protect the natural nail between services.'
          ]
        }
      ]
    },
    {
      id: 'safety-knowledge-check',
      title: 'Safety and Knowledge Check',
      blocks: [
        {
          type: 'paragraph',
          title: 'Professional scope',
          text: 'A cosmetologist may observe the nail and surrounding skin, describe visible findings, identify contraindications, and decide whether to proceed, modify, postpone, or refer. Medical diagnosis and treatment belong to appropriately qualified healthcare professionals.'
        },
        {
          type: 'list',
          title: 'Pause the service and assess carefully when you observe',
          items: [
            'open wounds, bleeding, or severe inflammation;',
            'painful swelling or marked tenderness;',
            'visible changes suggesting infection;',
            'unexpected nail separation or severe discolouration;',
            'an active reaction to a nail product or previous service.'
          ]
        },
        {
          type: 'list',
          title: 'Knowledge check',
          items: [
            'Which structure is the principal growth region of the nail plate?',
            'What is the difference between the nail plate and the nail bed?',
            'Why should living tissue around the proximal nail fold not be aggressively cut?',
            'What is the role of the hyponychium?',
            'Why is understanding nail anatomy important before applying enhancements?'
          ]
        }
      ]
    }
  ],
  metadata: {
    status: 'draft',
    module: 18,
    level: 6,
    source: 'original',
    figureIds: ['18.1A', '18.1B']
  }
};

export const cosmetologyOnychologyNodes: LearningNode[] = [
  createLearningNode({
    id: COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID,
    kind: LEARNING_NODE_KINDS.module,
    label: 'M18 · Onychology',
    summary: 'Nail science, nail care, enhancements, product chemistry, safety and professional nail services.',
    parentId: 'cos-l6',
    childIds: [COSMETOLOGY_ONYCHOLOGY_OVERVIEW_TOPIC_NODE_ID],
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
    id: COSMETOLOGY_ONYCHOLOGY_OVERVIEW_TOPIC_NODE_ID,
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Onychology Overview',
    summary: 'Understand the scope of nail science, professional nail services, safety and the module learning journey.',
    parentId: COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID,
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
  }),

];
