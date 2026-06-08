import'../styles/dashboard-hero.css';
import{getActiveAcademyCatalog as g}from'../academies/catalog.js';
import AcademyHero from'../components/AcademyHero.jsx';
import AcademyPaths from'../components/AcademyPaths.jsx';
export default function Home(){const c=g();return <div className="learning-dashboard-page dashboard-command-center"><AcademyHero academy={c.academy