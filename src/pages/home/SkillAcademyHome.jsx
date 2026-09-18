import { Link } from 'react-router-dom';
import '../../styles/dashboard-hero.css';

export default function SkillAcademyHome() {
  return (
    <div className="learning-dashboard-page dashboard-command-center">
      <section className="glass dashboard-command-hero" aria-labelledby="skill-dashboard-title">
        <div className="dashboard-command-hero__copy">
          <p className="eyebrow">Skill Academy</p>
          <h1 id="skill-dashboard-title">Learn practical skills.</h1>
          <p>Choose a programme and continue through its levels, modules and learning material.</p>

          <div className="dashboard-command-hero__actions">
            <Link className="btn dashboard-command-primary" to="/categories">
              Browse Programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
