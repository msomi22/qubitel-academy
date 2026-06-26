import { NavLink, useLocation } from 'react-router-dom';

import { buildProblemPath } from '../../../services/questionNavigationService.js';

function navStateFor(navigation = {}) {
  return {
    ...(navigation.returnToCategory ? { returnToCategory: navigation.returnToCategory } : {}),
    preserveProblemScroll: true
  };
}

function QuestionNavLink({ question, direction, navigation }) {
  const location = useLocation();

  if (!question) return <span className="question-nav-placeholder" aria-hidden="true" />;

  const label = direction === 'previous' ? 'Previous question' : 'Next question';
  const arrow = direction === 'previous' ? '←' : '→';
  const shortTitle = question.title || question.id;

  const basePath = buildProblemPath(question.id, navigation?.scope);
  const currentParams = new URLSearchParams(location.search);
  const backPath = currentParams.get('backPath');
  const backLabel = currentParams.get('backLabel');

  const extraParams = new URLSearchParams();
  if (backPath) extraParams.set('backPath', backPath);
  if (backLabel) extraParams.set('backLabel', backLabel);
  const extraString = extraParams.toString();
  const to = extraString
    ? (basePath.includes('?') ? `${basePath}&${extraString}` : `${basePath}?${extraString}`)
    : basePath;

  return (
    <NavLink
      className={`question-nav-button ${direction}`}
      to={to}
      state={navStateFor(navigation)}
      preventScrollReset
      aria-label={`${label}: ${shortTitle}`}
    >
      {direction === 'previous' ? <span className="question-nav-arrow" aria-hidden="true">{arrow}</span> : null}
      <span className="question-nav-copy">
        <strong>{label}</strong>
        <small>{shortTitle}</small>
      </span>
      {direction === 'next' ? <span className="question-nav-arrow" aria-hidden="true">{arrow}</span> : null}
    </NavLink>
  );
}

export default function QuestionNavigationControls({ navigation, className = '' }) {
  if (!navigation?.previousQuestion && !navigation?.nextQuestion) return null;

  const currentNumber = Number.isInteger(navigation.currentIndex) && navigation.currentIndex >= 0
    ? navigation.currentIndex + 1
    : null;

  return (
    <nav className={`question-navigation-controls ${className}`.trim()} aria-label="Question navigation">
      <QuestionNavLink question={navigation.previousQuestion} direction="previous" navigation={navigation} />
      {currentNumber && navigation.total ? (
        <span className="question-nav-progress" aria-label={`Question ${currentNumber} of ${navigation.total}`}>
          {currentNumber} / {navigation.total}
        </span>
      ) : null}
      <QuestionNavLink question={navigation.nextQuestion} direction="next" navigation={navigation} />
    </nav>
  );
}
