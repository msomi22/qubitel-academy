import { Link } from 'react-router-dom';
import { categoryPath } from '../../services/categoryNavigationService.js';
import { buildCbcGradeSelectionPath } from '../../utils/cbcGradeSelectionRouting.js';
import owlWithBackpackTransparent from '../../assets/academies/cbc/grade-1/home/owl-with-backpack-transparent.webp';
import actionContinueBook from '../../assets/academies/cbc/grade-1/home/action-continue-book.webp';
import actionReadOwlBook from '../../assets/academies/cbc/grade-1/home/action-read-owl-book.webp';
import actionPracticeTarget from '../../assets/academies/cbc/grade-1/home/action-practice-target.webp';
import subjectEnglishAbcBook from '../../assets/academies/cbc/grade-1/home/subject-english-hero.webp';
import subjectMathCardScene from '../../assets/academies/cbc/grade-1/home/subject-math-board-blocks.webp';
import '../../styles/cbc-academy-home.css';

const emptyProgress = {
  done: 0,
  total: 0,
  percent: 0
};

const SUBJECT_META = [
  {
    subject: 'english',
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
    subject: 'math',
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
    subject: 'kiswahili',
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
    subject: 'environmental-activities',
    match: ['cre', 'christian religious', 'environmental', 'environment', 'activities', 'weather', 'plants', 'animals', 'home science'],
    friendlyName: 'Environmental Activities',
    copy: 'Discover our world and take care!',
    cardClass: 'cbc-home-subject-card--environment',
    lessonClass: 'cbc-home-lesson-card--environment',
    visualClass: 'cbc-home-world-art',
    lessonIcon: '🌺',
    lessonMeta: 'Env. Activities • 5 min'
  }
];

const TODAY_LESSON_META = [
  {
    subject: 'math',
    match: ['math', 'mathematics', 'number', 'addition', 'subtraction', 'count'],
    friendlyName: 'Mathematics'
  },
  {
    subject: 'kiswahili',
    match: ['kiswahili', 'swahili', 'salamu'],
    friendlyName: 'Kiswahili'
  },
  {
    subject: 'cre',
    match: ['cre', 'christian religious', 'environmental', 'environment', 'activities'],
    friendlyName: 'CRE'
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

function getSubjectFromText(value) {
  const text = normaliseText(value);

  if (/\bcre\b/.test(text) || text.includes('christian religious')) return 'cre';
  if (text.includes('kiswahili') || text.includes('swahili')) return 'kiswahili';
  if (text.includes('english') || text.includes('reading') || text.includes('comprehension')) return 'english';
  if (text.includes('math') || text.includes('mathematics') || text.includes('number')) return 'math';
  if (text.includes('environmental') || text.includes('environment')) return 'environmental-activities';

  return '';
}

function getSubjectFromHref(href = '') {
  if (!href) return '';

  try {
    const url = new URL(href, 'https://cbc.academy.qubitel.net');
    return getSubjectFromText(url.searchParams.get('topic') || '');
  } catch {
    return '';
  }
}

function getSectionSubject(section) {
  if (section?.subject) return section.subject;

  return getSubjectFromHref(section?.href) || getSubjectFromText(getSectionText(section));
}

function getLearningAreaHref(section, meta) {
  const subject = section?.kind === 'subjectTopic'
    ? meta.subject
    : getSectionSubject(section);

  return subject
    ? buildCbcGradeSelectionPath({ subject })
    : section?.href || '/categories';
}

function getTodayLessonHref(section) {
  const subject = getSectionSubject(section);

  return subject
    ? buildCbcGradeSelectionPath({ subject })
    : section?.href || '/categories';
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

function getTopicCount(topic) {
  return Number(topic?.count || topic?.progress?.total || 0);
}

function getBestTopicForMeta(topics, meta) {
  const candidates = topics.filter((topic) => topicMatchesMeta(topic, meta));

  return candidates.sort((a, b) => (
    Number(getTopicCount(b) > 0) - Number(getTopicCount(a) > 0)
    || getTopicCount(b) - getTopicCount(a)
    || String(a.category || '').localeCompare(String(b.category || ''))
    || String(a.id || '').localeCompare(String(b.id || ''))
  ))[0] || null;
}

function toTodayLessonSection(topic, meta) {
  return {
    id: `today:${meta.subject}:${topic?.category || 'grade-selection'}/${topic?.id || meta.subject}`,
    title: meta.friendlyName,
    summary: meta.friendlyName,
    href: topic ? getTopicLearningHref(topic) : buildCbcGradeSelectionPath({ subject: meta.subject }),
    kind: 'todayLesson',
    subject: meta.subject,
    progress: topic?.progress,
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

function getStarCount(progress) {
  const done = Number(progress?.done || 0);
  const percent = clampPercent(progress?.percent);

  if (done > 0) return done;
  if (percent > 0) return Math.round(percent);

  return 0;
}

function getTodayLessons({ learningAreas }) {
  const topics = Array.isArray(learningAreas) ? learningAreas : [];
  return TODAY_LESSON_META.map((meta) => (
    toTodayLessonSection(getBestTopicForMeta(topics, meta), meta)
  ));
}

function getContinueHref(homeModel, continueSection) {
  return continueSection?.href
    || homeModel?.continueAction?.href
    || buildCbcGradeSelectionPath({ action: 'continue' });
}

function getContinueCardTitle(continueSection) {
  const title = String(continueSection?.title || '').trim();

  if (!title || title.toLowerCase() === 'review progress') return 'Continue';
  if (title.toLowerCase().startsWith('continue')) return title;

  return `Continue ${title}`;
}

function getContinueCardDescription(continueSection) {
  const summary = String(continueSection?.summary || '').trim();

  return summary && summary !== 'All visible topics are complete.'
    ? summary
    : 'Pick up where you left off';
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
  const href = getLearningAreaHref(section, meta);

  return (
    <Link
      to={href}
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
  const href = getTodayLessonHref(section);

  return (
    <Link
      to={href}
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
  const continueHref = getContinueHref(homeModel, null);

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
              to={continueHref}
              title="Continue"
              description="Pick up where you left off"
              imageSrc={actionContinueBook}
              variant="cbc-home-action-card--continue"
            />

            <CbcActionCard
              to={buildCbcGradeSelectionPath({ action: 'read-with-me' })}
              title="Read with me"
              description="Listen and read fun stories"
              imageSrc={actionReadOwlBook}
              variant="cbc-home-action-card--read"
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
  const learningPathsSection = getSectionByKind(homeModel, 'learningPaths');

  const rawLearningAreas = getSectionChildren(learningPathsSection);
  const learningAreas = getDisplayLearningAreas(homeModel, rawLearningAreas);
  const todayLessons = getTodayLessons({
    learningAreas: homeModel.homeContent?.topics
  });
  const continueHref = getContinueHref(homeModel, continueSection);

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
              title={getContinueCardTitle(continueSection)}
              description={getContinueCardDescription(continueSection)}
              imageSrc={actionContinueBook}
              variant="cbc-home-action-card--continue"
            />

            <CbcActionCard
              to={buildCbcGradeSelectionPath({ action: 'read-with-me' })}
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
