import {
  getVisibleTopicsForActiveProfile,
  getVisibleTopicsForCategory,
  loadTopicBank
} from './questionBankService.js';

async function loadInventoryForTopics(topics = []) {
  const inventory = [];
  const seenIds = new Set();

  for (const topic of topics) {
    const bank = await loadTopicBank(topic.id, { categoryId: topic.category });

    for (const question of bank.questions || []) {
      if (!question?.id || seenIds.has(question.id)) continue;

      seenIds.add(question.id);
      inventory.push({
        ...question,
        topicId: question.topicId || topic.id,
        category: question.category || topic.category,
        parentTopic: question.parentTopic || topic.name
      });
    }
  }

  return inventory;
}

export async function getVisibleQuestionInventory(categoryId = null) {
  const topics = categoryId
    ? await getVisibleTopicsForCategory(categoryId)
    : await getVisibleTopicsForActiveProfile();

  return loadInventoryForTopics(topics);
}

export async function getDashboardQuestionSummary(completed = {}) {
  const inventory = await getVisibleQuestionInventory();
  const visibleIds = new Set(inventory.map((question) => question.id));
  const done = Object.keys(completed).filter((id) => completed[id] && visibleIds.has(id)).length;

  return {
    total: inventory.length,
    done,
    percent: inventory.length ? Math.round((done / inventory.length) * 100) : 0
  };
}

export async function getTopicQuestionIdsById() {
  const topics = await getVisibleTopicsForActiveProfile();
  const entries = await Promise.all(topics.map(async (topic) => {
    const bank = await loadTopicBank(topic.id, { categoryId: topic.category });
    return [`${topic.category}/${topic.id}`, (bank.questions || []).map((question) => question.id).filter(Boolean)];
  }));

  return Object.fromEntries(entries);
}
