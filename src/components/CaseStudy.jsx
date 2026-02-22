import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadProjects, isVideo } from '../utils/projectLoader'

export default function CaseStudy() {
  const { id } = useParams();
  const projects = useMemo(() => loadProjects(), []);
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="case-study">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className="case-study">
      <Link to="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <header className="case-study-header">
        <h1>{project.title}</h1>
        {project.year && <span className="case-study-year">{project.year}</span>}
      </header>

      {project.description && (
        <p className="case-study-description">{project.description}</p>
      )}

      {project.tags && (
        <div className="case-study-tags">
          {project.tags.map(t => (
            <span key={t} className="card-tag">{t}</span>
          ))}
        </div>
      )}

      <div className="case-study-body">
        {project.sections?.map((section, i) => {
          switch (section.type) {
            case 'heading':
              return <h2 key={i}>{section.text}</h2>;
            case 'paragraph':
              return <p key={i}>{section.text}</p>;
            case 'image':
              return (
                <figure key={i}>
                  <img
                    src={project.allMedia[section.src]}
                    alt={section.caption || section.src}
                    loading="lazy"
                  />
                  {section.caption && <figcaption>{section.caption}</figcaption>}
                </figure>
              );
            case 'video':
              return (
                <video
                  key={i}
                  src={project.allMedia[section.src]}
                  controls
                  playsInline
                  preload="metadata"
                />
              );
            default:
              return null;
          }
        })}

        {!project.sections && project.resolvedMedia && (
          <div className="case-study-gallery">
            {project.resolvedMedia.map((item, i) => (
              isVideo(item.name) ? (
                <video key={i} src={item.url} controls playsInline preload="metadata" />
              ) : (
                <img key={i} src={item.url} alt={item.name} loading="lazy" />
              )
            ))}
          </div>
        )}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-link"
        >
          Visit Project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      )}
    </div>
  );
}
