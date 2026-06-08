import{Link}from'react-router-dom';
export default function AcademyPaths({categories=[]}){return <section className="dashboard-command-grid">{categories.map(c=><Link key={c.id} className="glass dashboard-command-card" to={'/category/'+c.id}><p className="eyebrow">Learning path</p><h2>{c.name}</h2><p>{c.description||'Continue learning'}</p></Link>)}</section>}
