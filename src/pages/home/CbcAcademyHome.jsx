import { Link } from 'react-router-dom';
import { categoryPath } from '../../services/categoryNavigationService.js';
import owlWithBackpackTransparent from '../../assets/academies/cbc/grade-1/home/owl-with-backpack-transparent.png';
import actionContinueBook from '../../assets/academies/cbc/grade-1/home/action-continue-book.png';
import actionReadOwlBook from '../../assets/academies/cbc/grade-1/home/action-read-owl-book.png';
import actionPracticeTarget from '../../assets/academies/cbc/grade-1/home/action-practice-target.png';
import subjectEnglishAbcBook from '../../assets/academies/cbc/grade-1/home/subject-english-abc-book.png';
import subjectMathCardScene from '../../assets/academies/cbc/grade-1/home/subject-math-board-blocks.png';
import '../../styles/cbc-academy-home.css';

const emptyProgress = {
  done: 0,
  total: 0,
  percent: 0
};

const SUBJECT_META = [
  {
    match: ['english', 'reading', 'comprehension', 'language', 'vowel', 'spelling'],
    friendlyName: 'English',
    copy: 'Read, write and have fun!',
    cardClass: 'cbc-home-subject-card--english',
    lessonClass: 'cbc-home-lesson-card--english',
    visualClass: 'cbc-home-abc-book',
    backgroundSrc: subjectEnglishAbcBook,
    lessonIcon: '📗',
    lessonMeta: 'English • 5 min'
  },
  {
    match: ['math', 'mathematics', 'number', 'addition', 'subtraction', 'count'],
    friendlyName: 'Math',
    copy: 'Count, add and solve!',
    cardClass: 'cbc-home-subject-card--math',
    lessonClass: 'cbc-home-lesson-card--math',
    visualClass: 'cbc-home-math-board',
    backgroundSrc: subjectMathCardScene,
    lessonIcon: '⭐',
    lessonMeta: 'Math • 5 min'
  },
  {
    match: ['kiswahili', 'swahili', 'salamu'],
    friendlyName: 'Kiswahili',
    copy: 'Soma, andika na uelewe!',
    cardClass: 'cbc-home-subject-card--kiswahili',
    lessonClass: 'cbc-home-lesson-card--kiswahili',
    visualClass: 'cbc-home-kiswahili-bubbles',
    lessonIcon: '💬',
    lessonMeta: 'Kiswahili • 5 min'
  },
  {
    match: ['environmental', 'environment', 'activities', 'weather', 'plants', 'animals', 'home science'],
    friendlyName: 'Environmental Activities',
    copy: 'Discover our world and take care!',
    cardClass: 'cbc-home-subject-card--environment',
    lessonClass: 'cbc-home-lesson-card--environment',
    visualClass: 'cbc-home-world-art',
    lessonIcon: '🌺',
    lessonMeta: 'Env. Activities • 5 min'
  }
];

function clampPercent(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function getSectionByKind(homeModel, kind) {
  return homeModel?.sections?.find((section) => section.kind === kind) || null;
}

function getSectionChildren(section) {
  if (Array.isArray(section?.children)) return section.children;
  if (Array.isArray(section?.nodes)) return section.nodes;
  return [];
}

function normaliseText(value) {
  return String(value || '').toLowerCase();
}

function getSectionText(section) {
  return normaliseText(`${section?.title || ''} ${section?.summary || ''} ${section?.id || ''}`);
}

function getSubjectMeta(section, index = 0) {
  const text = getSectionText(section);
  const matched = SUBJECT_META.find((meta) => meta.match.some((term) => text.includes(term)));

  if (matched) return matched;

  return SUBJECT_META[index % SUBJECT_META.length] || SUBJECT_META[0];
}


function getTopicText(topic) {
  return normaliseText(
    `${topic?.id || ''} ${topic?.name || ''} ${topic?.displayName || ''} ${topic?.description || ''} ${topic?.category || ''}`
  );
}

function topicMatchesMeta(topic, meta) {
  const text = getTopicText(topic);
  return meta.match.some((term) => text.includes(term));
}

function getTopicLearningHref(topic) {
  if (!topic?.category || !topic?.id) return '/categories';

  const params = new URLSearchParams();
  params.set('topic', String(topic.id));
  params.set('page', '1');

  return `${categoryPath(topic.category)}?${params.toString()}`;
}

function toSubjectTopicSection(topic, meta) {
  return {
    id: `subject:${topic.category}/${topic.id}`,
    title: meta.friendlyName,
    summary: meta.copy,
    href: getTopicLearningHref(topic),
    kind: 'subjectTopic',
    progress: topic.progress,
    source: 'compatibility'
  };
}

function getDisplayLearningAreas(homeModel, fallbackLearningAreas = []) {
  const topics = Array.isArray(homeModel?.homeContent?.topics)
    ? homeModel.homeContent.topics
    : [];

  const gradeOneTopics = topics.filter((topic) => (
    topic?.category === 'grade-1' && Number(topic?.count || 0) > 0
  ));

  const selected = SUBJECT_META
    .map((meta) => {
      const topic = gradeOneTopics.find((item) => topicMatchesMeta(item, meta));
      return topic ? toSubjectTopicSection(topic, meta) : null;
    })
    .filter(Boolean);

  return selected.length ? selected : fallbackLearningAreas;
}

function getFriendlySubjectTitle(section, index = 0) {
  const meta = getSubjectMeta(section, index);
  const rawTitle = String(section?.title || '').trim();

  if (!rawTitle) return meta.friendlyName;

  const rawTitleLower = rawTitle.toLowerCase();
  const shouldUseFriendlyTitle =
    rawTitleLower.includes('grade') ||
    rawTitleLower.includes('learning path') ||
    rawTitleLower.includes('category') ||
    rawTitle.length > 28;

  return shouldUseFriendlyTitle ? meta.friendlyName : rawTitle;
}

function getFriendlySubjectCopy(section, index = 0) {
  const meta = getSubjectMeta(section, index);
  const summary = String(section?.summary || '').trim();
  const summaryLower = summary.toLowerCase();

  const shouldUseFriendlyCopy =
    !summary ||
    summary.length > 52 ||
    summaryLower.includes('grade') ||
    summaryLower.includes('lessons') ||
    summaryLower.includes('practice') ||
    summaryLower.includes('exams');

  return shouldUseFriendlyCopy ? meta.copy : summary;
}

function CbcActionIllustration({ src }) {
  return (
    <span className="cbc-home-action-illustration" aria-hidden="true">
      <img src={src} alt="" draggable="false" loading="eager" />
    </span>
  );
}

function findFriendlyHref(sections, terms, fallback = '/categories') {
  const match = sections.find((section) => {
    const text = getSectionText(section);
    return terms.some((term) => text.includes(term));
  });

  return match?.href || fallback;
}

function getStarCount(progress) {
  const done = Number(progress?.done || 0);
  const percent = clampPercent(progress?.percent);

  if (done > 0) return done;
  if (percent > 0) return Math.round(percent);

  return 0;
}

function getTodayLessons({ continueSection, focusChildren, learningAreas }) {
  const seen = new Set();
  const candidates = [continueSection, ...focusChildren, ...learningAreas].filter(Boolean);

  return candidates
    .filter((section) => {
      const key = section.id || section.href || section.title;

      if (!key || seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .slice(0, 4);
}

function CbcOwlMascot() {
  return (
    <figure className="cbc-home-owl-mascot" aria-hidden="true">
      <img
        className="cbc-home-owl-mascot__image"
        src={owlWithBackpackTransparent}
        alt=""
        draggable="false"
        loading="eager"
      />
    </figure>
  );
}

function CbcActionCard({ to, title, description, imageSrc, variant }) {
  return (
    <Link to={to} className={`cbc-home-action-card ${variant}`.trim()}>
      <span className="cbc-home-action-card-shine" aria-hidden="true" />

      <CbcActionIllustration src={imageSrc} />

      <span className="cbc-home-action-card-copy-wrap">
        <span className="cbc-home-action-title">{title}</span>
        <span className="cbc-home-action-copy">{description}</span>
      </span>
    </Link>
  );
}

function CbcStarsCard({ progress }) {
  const safeProgress = progress || emptyProgress;
  const percent = clampPercent(safeProgress.percent);
  const stars = getStarCount(safeProgress);

  return (
    <aside className="cbc-home-stars-card" aria-label="My stars progress">
      <div className="cbc-home-stars-title">
        <span aria-hidden="true">⭐</span>
        My stars
      </div>

      <div className="cbc-home-stars-number">{stars}</div>
      <div className="cbc-home-stars-earned">stars earned!</div>

      <div className="cbc-home-stars-progress" aria-label={`${percent}% progress`}>
        <span style={{ width: `${percent}%` }} />
      </div>

      <div className="cbc-home-stars-message">You&apos;re doing great! Keep it up! 🌈</div>

      <Link className="cbc-home-progress-link" to="/progress">
        See my progress
      </Link>
    </aside>
  );
}

function CbcLearningAreaCard({ section, index }) {
  const meta = getSubjectMeta(section, index);
  const visualClassName = `cbc-home-subject-visual ${meta.visualClass}`;

  return (
    <Link
      to={section.href || '/categories'}
      className={`cbc-home-subject-card ${meta.cardClass}`.trim()}
    >
      {meta.backgroundSrc ? (
        <img
          className="cbc-home-subject-bg-image"
          src={meta.backgroundSrc}
          alt=""
          draggable="false"
          loading="eager"
        />
      ) : null}

      <div className="cbc-home-subject-card__copy-block">
        <div className="cbc-home-subject-card__title">
          {getFriendlySubjectTitle(section, index)}
        </div>

        <div className="cbc-home-subject-card__copy">
          {getFriendlySubjectCopy(section, index)}
        </div>
      </div>

      {!meta.backgroundSrc ? (
        <div className={visualClassName} aria-hidden="true">
          {meta.imageSrc ? (
            <img
              className="cbc-home-subject-image"
              src={meta.imageSrc}
              alt=""
              draggable="false"
              loading="eager"
            />
          ) : null}

          {!meta.imageSrc && meta.visualClass === 'cbc-home-kiswahili-bubbles' ? (
            <span className="cbc-home-kiswahili-bird">🐦</span>
          ) : null}
        </div>
      ) : null}

      <span className="cbc-home-start-learning">
        Start learning <span aria-hidden="true">›</span>
      </span>
    </Link>
  );
}

function CbcLessonCard({ section, index }) {
  const meta = getSubjectMeta(section, index);
  const title = section?.title || getFriendlySubjectTitle(section, index);

  return (
    <Link
      to={section?.href || '/categories'}
      className={`cbc-home-lesson-card ${meta.lessonClass}`.trim()}
    >
      <span className="cbc-home-lesson-icon" aria-hidden="true">
        {meta.lessonIcon}
      </span>

      <span>
        <span className="cbc-home-lesson-title">{title}</span>
        <span className="cbc-home-lesson-meta">{meta.lessonMeta}</span>
      </span>

      <span className="cbc-home-lesson-cta">
        Let&apos;s go! <span aria-hidden="true">▶</span>
      </span>
    </Link>
  );
}

function CbcEmptyHome({ homeModel }) {
  const primaryAction = homeModel.continueAction || {
    href: '/categories',
    label: 'Start learning'
  };

  return (
    <main className="cbc-home-page cbc-home-page--empty">
      <section className="cbc-home-stage" aria-labelledby="cbc-home-title">
        <span className="cbc-home-cloud cbc-home-cloud--one" aria-hidden="true" />
        <span className="cbc-home-cloud cbc-home-cloud--two" aria-hidden="true" />
        <span className="cbc-home-cloud cbc-home-cloud--three" aria-hidden="true" />

        <div className="cbc-home-hero-content">
          <p className="cbc-home-greeting">Hi there, young learner! 👋</p>

          <h1 className="cbc-home-hero-title" id="cbc-home-title">
            Ready to <span>learn</span> today?
          </h1>

          <p className="cbc-home-hero-subtitle">
            Let&apos;s have fun, learn new things, and shine bright! ✨
          </p>

          <div className="cbc-home-hero-actions" aria-label="Main learner actions">
            <CbcActionCard
              to={primaryAction.href}
              title="Continue"
              description="Start your first fun activity"
              imageSrc={actionContinueBook}
              variant="cbc-home-action-card--continue"
            />
          </div>
        </div>

        <CbcOwlMascot />

        <section className="cbc-home-learning-area-panel" aria-labelledby="cbc-home-empty-title">
          <h2 className="cbc-home-section-heading" id="cbc-home-empty-title">
            <span className="cbc-home-heading-icon" aria-hidden="true">⭐</span>
            <span>{homeModel.emptyState?.title || 'Lessons are coming soon'}</span>
          </h2>

          <p className="cbc-home-empty-note">
            {homeModel.emptyState?.description || 'Your learning areas will show here once they are ready.'}
          </p>
        </section>
      </section>
    </main>
  );
}

export default function CbcAcademyHome({ homeModel, randomCount = 0 }) {
  const progress = homeModel.progress || emptyProgress;
  const continueSection = getSectionByKind(homeModel, 'continue');
  const focusSection = getSectionByKind(homeModel, 'focus');
  const learningPathsSection = getSectionByKind(homeModel, 'learningPaths');

  const focusChildren = getSectionChildren(focusSection);
  const rawLearningAreas = getSectionChildren(learningPathsSection);
  const learningAreas = getDisplayLearningAreas(homeModel, rawLearningAreas);
  const todayLessons = getTodayLessons({
    continueSection,
    focusChildren,
    learningAreas: rawLearningAreas
  });

  const continueHref = continueSection?.href || homeModel.continueAction?.href || '/categories';

  const readWithMeHref = findFriendlyHref(
    [...learningAreas, ...rawLearningAreas, ...focusChildren],
    ['read', 'reading', 'english', 'comprehension'],
    '/categories'
  );

  if (!homeModel.hasContent) {
    return <CbcEmptyHome homeModel={homeModel} />;
  }

  return (
    <main className="cbc-home-page">
      <section className="cbc-home-stage" aria-labelledby="cbc-home-title">
        <span className="cbc-home-cloud cbc-home-cloud--one" aria-hidden="true" />
        <span className="cbc-home-cloud cbc-home-cloud--two" aria-hidden="true" />
        <span className="cbc-home-cloud cbc-home-cloud--three" aria-hidden="true" />

        <span className="cbc-home-decor-sparkle cbc-home-sparkle-a" aria-hidden="true">✦</span>
        <span className="cbc-home-decor-sparkle cbc-home-sparkle-b" aria-hidden="true">✦</span>
        <span className="cbc-home-decor-sparkle cbc-home-sparkle-c" aria-hidden="true">✦</span>

        <div className="cbc-home-hero-content">
          <p className="cbc-home-greeting">Hi there, young learner! 👋</p>

          <h1 className="cbc-home-hero-title" id="cbc-home-title">
            Ready to <span>learn</span> today?
          </h1>

          <p className="cbc-home-hero-subtitle">
            Let&apos;s have fun, learn new things, and shine bright! ✨
          </p>

          <div className="cbc-home-hero-actions" aria-label="Main learner actions">
            <CbcActionCard
              to={continueHref}
              title="Continue"
              description={continueSection?.summary || 'Pick up where you left off'}
              imageSrc={actionContinueBook}
              variant="cbc-home-action-card--continue"
            />

            <CbcActionCard
              to={readWithMeHref}
              title="Read with me"
              description="Listen and read fun stories"
              imageSrc={actionReadOwlBook}
              variant="cbc-home-action-card--read"
            />

            <CbcActionCard
              to="/random"
              title="Practice"
              description={randomCount > 0 ? `${randomCount} questions and activities` : 'Try questions and activities'}
              imageSrc={actionPracticeTarget}
              variant="cbc-home-action-card--practice"
            />
          </div>
        </div>

        <CbcOwlMascot />
        <CbcStarsCard progress={progress} />

        <section className="cbc-home-learning-area-panel" aria-labelledby="cbc-home-learning-areas-title">
          <div className="cbc-home-learning-heading-row">
            <h2 className="cbc-home-section-heading" id="cbc-home-learning-areas-title">
              <span className="cbc-home-heading-icon" aria-hidden="true">⭐</span>
              <span>Explore our learning areas</span>
            </h2>

            <Link className="cbc-home-view-all-link" to={learningPathsSection?.href || '/categories'}>
              View all
            </Link>
          </div>

          <div className="cbc-home-learning-grid">
            {learningAreas.length ? learningAreas.map((section, index) => (
              <CbcLearningAreaCard
                key={section.id || section.href || section.title}
                section={section}
                index={index}
              />
            )) : (
              <p className="cbc-home-empty-note">Learning areas will appear here soon.</p>
            )}
          </div>
        </section>

        <section className="cbc-home-lesson-panel" aria-labelledby="cbc-home-todays-learning-title">
          <div className="cbc-home-lesson-heading-row">
            <span className="cbc-home-lesson-heading-emoji" aria-hidden="true">😄</span>

            <div>
              <h2 className="cbc-home-lesson-heading-title" id="cbc-home-todays-learning-title">
                Today&apos;s learning
              </h2>

              <div className="cbc-home-lesson-heading-copy">
                Pick a fun lesson to get started!
              </div>
            </div>
          </div>

          <div className="cbc-home-lessons-wrap">
            <div className="cbc-home-lesson-grid">
              {todayLessons.length ? todayLessons.map((section, index) => (
                <CbcLessonCard
                  key={section.id || section.href || section.title}
                  section={section}
                  index={index}
                />
              )) : (
                <p className="cbc-home-empty-note">Start learning to see today&apos;s fun lessons.</p>
              )}
            </div>

            <Link className="cbc-home-next-button" to="/categories" aria-label="More lessons">
              ›
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}