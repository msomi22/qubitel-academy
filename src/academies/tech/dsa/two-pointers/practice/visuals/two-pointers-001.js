const visualWalkthrough = {
  title: 'Container With Most Water — two pointer walkthrough',
  summary: 'Two pointers start at the widest container. Move the shorter wall inward because width always shrinks, so only a taller wall can improve the area.',
  diagram: {
    title: 'Two-pointer cinematic walkthrough for height = [1,8,6,2,5,4,8,3,7]',
    intervalMs: 2400,
    frames: [
      {
        frameType: 'two-pointer',
        label: '1. Start widest container',
        value: 'left = 0 (1)\nright = 8 (7)\nwidth = 8\narea = min(1, 7) × 8 = 8',
        note: 'Start with maximum width. The limiting factor is the shorter wall.',
        metrics: {
          leftPointer: 0,
          rightPointer: 8,
          leftHeight: 1,
          rightHeight: 7,
          width: 8,
          area: 8,
          maxArea: 8
        }
      },
      {
        frameType: 'two-pointer',
        label: '2. Move shorter wall inward',
        value: 'left = 1 (8)\nright = 8 (7)\nwidth = 7\narea = min(8, 7) × 7 = 49',
        note: 'Move the left pointer because height 1 was limiting the area.',
        metrics: {
          leftPointer: 1,
          rightPointer: 8,
          leftHeight: 8,
          rightHeight: 7,
          width: 7,
          area: 49,
          maxArea: 49
        }
      },
      {
        frameType: 'two-pointer',
        label: '3. Move right pointer',
        value: 'left = 1 (8)\nright = 7 (3)\nwidth = 6\narea = min(8, 3) × 6 = 18',
        note: 'Width decreased, and the shorter wall became even smaller, so area drops.',
        metrics: {
          leftPointer: 1,
          rightPointer: 7,
          leftHeight: 8,
          rightHeight: 3,
          width: 6,
          area: 18,
          maxArea: 49
        }
      },
      {
        frameType: 'two-pointer',
        label: '4. Continue converging',
        value: 'left = 1 (8)\nright = 6 (8)\nwidth = 5\narea = min(8, 8) × 5 = 40',
        note: 'Even though both walls are tall, the width is now smaller than the best configuration.',
        metrics: {
          leftPointer: 1,
          rightPointer: 6,
          leftHeight: 8,
          rightHeight: 8,
          width: 5,
          area: 40,
          maxArea: 49
        }
      }
    ]
  },
  steps: [
    {
      title: 'Start with maximum width',
      body: 'The first pair always gives the widest possible container.'
    },
    {
      title: 'Move only the limiting wall',
      body: 'Moving the taller wall cannot help because width decreases while the shorter wall still limits the area.'
    },
    {
      title: 'Converge toward the optimal pair',
      body: 'Pointers move inward until all useful combinations are explored.'
    }
  ],
  productionMapping: [
    'Bid/ask spread optimization',
    'Bandwidth utilization balancing',
    'Distributed capacity pairing',
    'Storage utilization heuristics'
  ]
};

export default visualWalkthrough;
