import { useState, useMemo, useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loadProjects, getAllTags } from '../utils/projectLoader'
import { trackEvent } from '../utils/googleAnalytics'
import Header from './Header'
import TagFilter from './TagFilter'
import ProjectCard from './ProjectCard'
import AboutCard from './AboutCard'
import Lightbox from './Lightbox'

function parseTagsParam(param, allTags) {
  if (!param) return null;
  const tags = param.split(',').filter(t => allTags.includes(t));
  if (tags.length === 0) return null;
  return new Set(tags);
}

function serializeTagsParam(activeTags) {
  if (activeTags === null || activeTags.size === 0) return undefined;
  return [...activeTags].sort().join(',');
}

export default function Landing() {
  const projects = useMemo(() => loadProjects(), []);
  const allTags = useMemo(() => getAllTags(projects), [projects]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTags, setActiveTags] = useState(() =>
    parseTagsParam(searchParams.get('tags'), allTags)
  );
  const [lightboxProject, setLightboxProject] = useState(null);

  useEffect(() => {
    const serialized = serializeTagsParam(activeTags);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (serialized) {
        next.set('tags', serialized);
      } else {
        next.delete('tags');
      }
      return next;
    }, { replace: true });
  }, [activeTags, setSearchParams]);

  const toggleTag = useCallback((tag) => {
    setActiveTags(prev => {
      let next;
      if (prev === null) {
        next = new Set([tag]);
      } else {
        next = new Set(prev);
        if (next.has(tag)) {
          next.delete(tag);
        } else {
          next.add(tag);
        }
        if (next.size === allTags.length) next = null;
      }

      const activeTags = next === null ? 'all' : [...next].sort().join(',');
      trackEvent('filter_click', { tag, active_tags: activeTags });

      return next;
    });
  }, [allTags.length]);

  const toggleAll = useCallback(() => {
    setActiveTags(prev => {
      const next = prev === null ? new Set() : null;
      const activeTags = next === null ? 'all' : '';
      trackEvent('filter_click', { tag: 'all', active_tags: activeTags });
      return next;
    });
  }, []);

  const isVisible = useCallback((project) => {
    if (activeTags === null) return true;
    return project.tags?.some(t => activeTags.has(t));
  }, [activeTags]);

  const handleCardClick = useCallback((project) => {
    trackEvent('project_click', {
      project_id: project.id,
      project_type: project.type,
    });

    if (project.type === 'casestudy') {
      navigate(`/project/${project.id}`);
    } else {
      setLightboxProject(project);
    }
  }, [navigate]);

  const closeLightbox = useCallback(() => {
    setLightboxProject(null);
  }, []);

  return (
    <div className="landing">
      <Header />
      <TagFilter
        tags={allTags}
        activeTags={activeTags}
        onToggleTag={toggleTag}
        onToggleAll={toggleAll}
      />
      <div className="project-grid">
        {projects.map(project => {
          const visible = isVisible(project);
          return (
            <div
              key={project.id}
              className={`card-wrapper ${visible ? 'visible' : 'hidden'}`}
            >
              <ProjectCard project={project} onClick={handleCardClick} />
            </div>
          );
        })}
        <AboutCard />
      </div>

      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
