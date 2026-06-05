import { NavLink } from 'react-router-dom';

function navStateFor(navigation = {}) {
  return {
    ...(navigation.returnToCategory ? { returnToCategory: navigation.returnToCategory } : {}),
    preserveProblemScroll: true
  };
}

function QuestionNavLink({ question, direction, navigation }) {
  if (!question) return <span className="question-nav-placeholder" aria-hidden="true" />;

  const label = direction === 'previous' ? 'Previous question' : 'Next question';
  const arrow = direction === 'previous' ? '←' : '→';
  const shortTitle = question.title || question.id;

  return (
    <NavLink
      className={`question-nav-button ${direction}`}
      to={`/problem/${encodeURIComponent(question.id)}`}
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
