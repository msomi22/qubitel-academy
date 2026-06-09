import { getActiveAcademyCatalog } from '../../academies/catalog.js';
import { categoryPath } from '../../services/categoryNavigationService.js';
import {
  getAllTopicsWithCounts,
  getCategoriesWithCounts,
  getCategorySummaries,
  topicProgress
} from '../../services/questionBankService.js';
import { getDashboardQuestionSummary } from '../../services/visibleQuestionInventoryService.js';
import {
  getRecommendedStartTopics,
  getTopicDisplayName,
  getTopicLearningTitle
} from '../../services/dashboardLearningPathService.js';
import type { LearningNode } from '../core/index.ts';
import { getActiveAcademyLearningNode } from './activeAcademyNode.ts';

export type AcademyHomeProgress = {
  done: number;
  total: number;
  percent: number;
};

export type AcademyHomeAction = {
  id: string;
  label: string;
  href: string;
  kind: string;
  description?: string;
  icon?: string;
};

export type AcademyHomeSection = {
  id: string;
  title: string;
  summary?: string;
  href?: string;
  kind: string;
  progress?: AcademyHomeProgress;
  children?: AcademyHomeSection[];
  source?: 'learningNode' | 'compatibility';
};

export type AcademyHomeContent = {
  summary: AcademyHomeProgress;
  categories: any[];
  countedCategories: any[];
  topics: any[];
};

export type AcademyHomeViewModel = {
  academyNode: LearningNode;
  title: string;
  summary: string;
  hasContent: boolean;
  progress: AcademyHomeProgress;
  continueAction: AcademyHomeAction;
  secondaryActions: AcademyHomeAction[];
  sections: AcademyHomeSection[];
  emptyState?: {
    title: string;
    description: string;
    note: string;
  };
  homeContent: AcademyHomeContent;
};

export const emptyAcademyHomeProgress: AcademyHomeProgress = {
  total: 0,
  done: 0,
  percent: 0
};

function clampPercent(value: unknown): number {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function getTopicLearningPath(topic: any): string {
  if (!topic?.category || !topic?.id) return '/random';

  const params = new URLSearchParams();
  params.set('topic', String(topic.id));
  params.set('page', '1');

  const query = params.toString();
  const basePath = categoryPath(topic.category);

  return query ? `${basePath}?${query}` : basePath;
}

function getCategorySubtitle(category: any): string {
  if (category?.description) return category.description;

  const topicCount = Number(category?.topicCount || 0);
  const quizCount = Number(category?.quizCount || 0);

  if (quizCount > 0) return `${quizCount} practice questions`;
  return `${topicCount} ${topicCount === 1 ? 'topic bank' : 'topic banks'}`;
}

function buildLearningStage(percent: number) {
  if (percent >= 80) {
    return {
      label: 'Advanced practice',
      description: 'Keep strengthening your best areas and review anything that still feels difficult.'
    };
  }

  if (percent >= 50) {
    return {
      label: 'Steady progress',
      description: 'You are building good momentum. Continue practicing and reviewing your learning areas.'
    };
  }

  if (percent >= 20) {
    return {
      label: 'Building confidence',
      description: 'Keep going step by step. Focus on the learning areas that need more practice.'
    };
  }

  return {
    label: 'Getting started',
    description: 'Start with the available learning areas and build a steady learning habit.'
  };
}

function toProgress(progress: any): AcademyHomeProgress {
  return {
    done: Number(progress?.done || 0),
    total: Number(progress?.total || 0),
    percent: clampPercent(progress?.percent)
  };
}

function getSectionId(academyNode: LearningNode, sourceId: string): string {
  return `${academyNode.id}:${sourceId}`;
}

async function getHomeContent(completed: any[]): Promise<AcademyHomeContent> {
  const [
    summary,
    countedCategories,
    topics,
    categories
  ] = await Promise.all([
    getDashboardQuestionSummary(completed),
    getCategoriesWithCounts(completed),
    getAllTopicsWithCounts(),
    getCategorySummaries()
  ]);

  return {
    summary: toProgress(summary),
    countedCategories: Array.isArray(countedCategories) ? countedCategories : [],
    topics: Array.isArray(topics) ? topics : [],
    categories: Array.isArray(categories) ? categories : []
  };
}

function buildTopicSections(
  academyNode: LearningNode,
  topics: any[],
  completed: any[]
): AcademyHomeSection[] {
  return topics
    .map((topic) => ({
      ...topic,
      progress: topicProgress(topic, completed)
    }))
    .filter((topic) => topic.progress.total > 0)
    .map((topic) => ({
      id: getSectionId(academyNode, `topic:${topic.category}/${topic.id}`),
      title: getTopicDisplayName(topic),
      summary: `${topic.progress.done}/${topic.progress.total} complete`,
      href: getTopicLearningPath(topic),
      kind: 'topic',
      progress: toProgress(topic.progress),
      source: 'compatibility' as const
    }));
}

function buildCategorySections(
  academyNode: LearningNode,
  categories: any[]
): AcademyHomeSection[] {
  return [...categories]
    .sort((a, b) => {
      const progressDelta = Number(b.progressPercent > 0) - Number(a.progressPercent > 0);
      if (progressDelta !== 0) return progressDelta;

      return (b.quizCount || 0) - (a.quizCount || 0) || a.name.localeCompare(b.name);
    })
    .slice(0, 4)
    .map((category) => ({
      id: getSectionId(academyNode, `category:${category.id}`),
      title: category.name,
      summary: getCategorySubtitle(category),
      href: categoryPath(category.id),
      kind: 'category',
      progress: {
        done: Number(category.done || 0),
        total: Number(category.quizCount || category.total || 0),
        percent: clampPercent(category.progressPercent)
      },
      source: 'compatibility' as const
    }));
}

export async function getAcademyHomeViewModel(input: {
  completed?: any[];
  hostname?: string;
} = {}): Promise<AcademyHomeViewModel> {
  const completed = input.completed || [];
  const academyNode = getActiveAcademyLearningNode(input.hostname);
  const activeAcademyCatalog = getActiveAcademyCatalog(input.hostname);

  const hasContent =
    Array.isArray(activeAcademyCatalog?.categories)
    && activeAcademyCatalog.categories.length > 0;

  if (!hasContent) {
    return {
      academyNode,
      title: academyNode.label,
      summary: `${academyNode.label} is being prepared. ${
        academyNode.summary || 'Published learning content will appear here automatically.'
      }`,
      hasContent: false,
      progress: emptyAcademyHomeProgress,
      continueAction: {
        id: `${academyNode.id}:check-content`,
        label: 'Check available content',
        href: '/categories',
        kind: 'primary'
      },
      secondaryActions: [],
      sections: [],
      emptyState: {
        title: `${academyNode.label} is getting ready`,
        description: 'Learning content will appear here once it is published for this academy.',
        note: 'Published categories, topics, lessons, and assessments will show here when they are connected beneath this academy node.'
      },
      homeContent: {
        summary: emptyAcademyHomeProgress,
        categories: [],
        countedCategories: [],
        topics: []
      }
    };
  }

  const homeContent = await getHomeContent(completed);
  const topicSections = buildTopicSections(academyNode, homeContent.topics, completed);
  const categorySections = buildCategorySections(academyNode, homeContent.countedCategories);

  const unfinishedTopics = topicSections.filter(
    (section) => (section.progress?.percent || 0) < 100
  );

  const weakTopicSections = [...unfinishedTopics]
  .sort((a, b) => (
    (a.progress?.percent || 0) - (b.progress?.percent || 0)
    || a.title.localeCompare(b.title)
  ))
  .slice(0, 3);

  const activeTopic = [...unfinishedTopics]
    .filter((section) => (section.progress?.done || 0) > 0)
    .sort((a, b) => (
      (b.progress?.percent || 0) - (a.progress?.percent || 0)
      || a.title.localeCompare(b.title)
    ))[0];

  const recommendedTopics = getRecommendedStartTopics(
    homeContent.topics
      .map((topic: any) => ({
        ...topic,
        progress: topicProgress(topic, completed)
      }))
      .filter((topic: any) => topic.progress.total > 0),
    { limit: 3 }
  );

  const recommendedSections = recommendedTopics.map((topic: any) => ({
    id: getSectionId(academyNode, `recommended:${topic.category}/${topic.id}`),
    title: getTopicDisplayName(topic),
    summary: getTopicLearningTitle(topic),
    href: getTopicLearningPath(topic),
    kind: 'recommendedTopic',
    progress: toProgress(topic.progress),
    source: 'compatibility' as const
  }));

  const nextSection = activeTopic || recommendedSections[0] || unfinishedTopics[0] || null;
  const learningStage = buildLearningStage(homeContent.summary.percent);

  return {
    academyNode,
    title: academyNode.label,
    summary: academyNode.summary
      ? `${academyNode.summary} Your next useful action is always one tap away.`
      : 'Your next useful action is always one tap away.',
    hasContent: true,
    progress: homeContent.summary,
    continueAction: {
      id: `${academyNode.id}:continue`,
      label: nextSection ? 'Continue Learning' : 'Review progress',
      href: nextSection?.href || '/progress',
      kind: 'primary'
    },
    secondaryActions: [
      {
        id: `${academyNode.id}:random-practice`,
        label: 'Random Practice',
        href: '/random',
        kind: 'secondary'
      },
      {
        id: `${academyNode.id}:mixed-quiz`,
        label: 'Mixed Quiz',
        href: '/random',
        kind: 'quickStart',
        icon: '⚡',
        description: 'Use random mode for mixed practice'
      },
      {
        id: `${academyNode.id}:progress-review`,
        label: 'Progress Review',
        href: '/progress',
        kind: 'quickStart',
        icon: '📈',
        description: 'Check completed and remaining work'
      }
    ],
    sections: [
      {
        id: `${academyNode.id}:continue-section`,
        title: nextSection?.title || 'Review progress',
        summary: nextSection?.summary || 'All visible topics are complete.',
        href: nextSection?.href || '/progress',
        kind: 'continue',
        progress: nextSection?.progress,
        children: nextSection ? [nextSection] : [],
        source: 'learningNode'
      },
      {
        id: `${academyNode.id}:focus-section`,
        title: 'Weak topics',
        summary: 'Topics that need more practice.',
        href: '/categories',
        kind: 'focus',
        children: weakTopicSections.length ? weakTopicSections : recommendedSections,
        source: 'learningNode'
      },
      {
        id: `${academyNode.id}:learning-paths`,
        title: 'Learning paths',
        summary: 'Visible academy learning paths.',
        href: '/categories',
        kind: 'learningPaths',
        children: categorySections,
        source: 'learningNode'
      },
      {
        id: `${academyNode.id}:stage`,
        title: learningStage.label,
        summary: learningStage.description,
        kind: 'stage',
        source: 'learningNode'
      }
    ],
    homeContent
  };
}