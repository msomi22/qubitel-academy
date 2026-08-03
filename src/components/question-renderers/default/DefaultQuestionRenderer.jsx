import StandardPracticeWorkspace from '../../practice/StandardPracticeWorkspace.jsx';
import FocusedProblemWorkspace from '../../FocusedProblemWorkspace.jsx';
import QuestionNavigationControls from '../shared/QuestionNavigationControls.jsx';
import ProblemBlockRenderer from '../../rich-problem/ProblemBlockRenderer.jsx';

function hasAlphabetMasteryBlock(question) {
  return Array.isArray(question?.body) && question.body.some((block) => block?.type === 'alphabetMastery');
}

function extractObjective(question) {
  const section = Array.isArray(question?.body)
    ? question.body.find((block) => block?.type === 'section' && block?.content)
    : null;
  return section?.content || question?.question || question?.scenario || '';
}

function AlphabetMasteryBody({ question }) {
  const alphabetBlock = Array.isArray(question?.body)
    ? question.body.find((block) => block?.type === 'alphabetMastery')
    : null;

  if (!alphabetBlock) return null;

  return <ProblemBlockRenderer block={alphabetBlock} index={0} />;
}

export default function DefaultQuestionRenderer(props) {
  const { question, problemHeader, navigation } = props;
  const isAlphabetMastery = hasAlphabetMasteryBlock(question);

  if (isAlphabetMastery) {
    return (
      <StandardPracticeWorkspace
        backPath={problemHeader?.backControl?.props?.to}
        backLabel={problemHeader?.backControl?.props?.children || 'Back'}
        title={question.title}
        objective={extractObjective(question)}
        practiceGuide={question.explanation}
        tags={question.tags || question.concepts || question.metadata?.tags}
        navigationTop={<QuestionNavigationControls navigation={navigation} className="question-navigation-top" />}
        navigationBottom={<QuestionNavigationControls navigation={navigation} className="question-navigation-bottom" />}
        doneControl={problemHeader?.doneControl}
      >
        <AlphabetMasteryBody question={question} />
      </StandardPracticeWorkspace>
    );
  }

  return (
    <>
      <QuestionNavigationControls navigation={props.navigation} className="question-navigation-top" />
      <FocusedProblemWorkspace {...props} />
      <QuestionNavigationControls navigation={props.navigation} className="question-navigation-bottom" />
    </>
  );
}