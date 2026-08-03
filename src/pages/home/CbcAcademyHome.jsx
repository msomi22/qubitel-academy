import { Link } from 'react-router-dom';
import { getCbcLastActivityContinueState } from '../../services/cbcLastActivityService.js';
import { categoryPath } from '../../services/categoryNavigationService.js';
import {
  buildCbcLearningAreaPath,
  buildCbcSubjectGradeSelectionPath
} from '../../utils/cbcGradeSelectionRouting.js';
import owlWithBackpackTransparent from '../../assets/academies/cbc/grade-1/home/owl-with-backpack-transparent.webp';
import actionContinueBook from '../../assets/academies/cbc/grade-1/home/action-continue-book.webp';
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
    visualClass: 'cbc-home-abc-book',
    backgroundSrc: subjectEnglishAbcBook
  },
  {
    subject: 'math',
    match: ['math', 'mathematics', 'number', 'addition', 'subtraction', 'count'],
    friendlyName: 'Math',
    copy: 'Count, add and solve!',
    cardClass: 'cbc-home-subject-card--math',
    visualClass: 'cbc-home-math-board',
    backgroundSrc: subjectMathCardScene
  },
  {
    subject: 'kiswahili',
    match: ['kiswahili', 'swahili', 'salamu'],
    friendlyName: 'Kiswahili',
    copy: 'Soma, andika na uelewe!',
    cardClass: 'cbc-home-subject-card--kiswahili',
    visualClass: 'cbc-home-kiswahili-bubbles'
  },
  {
    subject: 'environmental-activities',
    match: ['cre', 'christian religious', 'environmental', 'environment', 'activities', 'weather', 'plants', 'animals', 'home science'],
    friendlyName: 'Environmental Activities',
    copy: 'Discover our world and take care!',
    cardClass: 'cbc-home-subject-card--environment',
    visualClass: 'cbc-home-world-art'
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
    ? buildCbcSubjectGradeSelectionPath({ subject })
    : section?.href || '/categories';
}

function getTopicLearningHref(topic) {
  if (!topic?.category || !topic?.id) return '/categories';

  const subject = getSubjectFromText(topic.id);

  return subject
    ? buildCbcLearningAreaPath({ gradeId: topic.category, subject })
    : categoryPath(topic.category);
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

function getStarCount(progress) {
  const done = Number(progress?.done || 0);
  const percent = clampPercent(progress?.percent);

  if (done > 0) return done;
  if (percent > 0) return Math.round(percent);

  return 0;
}

function getContinueHref(lastActivityState) {
  return lastActivityState?.href || '/categories';
}

function getContinueCardTitle(lastActivityState) {
  if (lastActivityState?.title) return lastActivityState.title;
  return 'Continue';
}

function getContinueCardDescription(lastActivityState) {
  if (lastActivityState?.description) return lastActivityState.description;
  return 'Pick up where you left off';
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

function CbcEmptyHome({ homeModel }) {
  const lastActivityState = getCbcLastActivityContinueState();
  const continueHref = getContinueHref(lastActivityState);

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
              title={lastActivityState?.title || 'Continue'}
              description={lastActivityState?.description || 'Pick up where you left off'}
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
  const learningPathsSection = getSectionByKind(homeModel, 'learningPaths');
  const lastActivityState = getCbcLastActivityContinueState();

  const rawLearningAreas = getSectionChildren(learningPathsSection);
  const learningAreas = getDisplayLearningAreas(homeModel, rawLearningAreas);
  const continueHref = getContinueHref(lastActivityState);

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
              title={getContinueCardTitle(lastActivityState)}
              description={getContinueCardDescription(lastActivityState)}
              imageSrc={actionContinueBook}
              variant="cbc-home-action-card--continue"
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
      </section>
    </main>
  );
}
