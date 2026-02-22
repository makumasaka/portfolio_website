import { useRef } from 'react'
import { isVideo, formatTag } from '../utils/projectLoader'

export default function ProjectCard({ project, onClick }) {
  const videoRef = useRef(null);
  const isVideoThumb = isVideo(project.thumbnail || '');

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="project-card"
      style={{ '--thumb-scale': project.thumbnailScale }}
      onClick={() => onClick(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideoThumb ? (
        <video
          ref={videoRef}
          src={project.thumbnailUrl}
          muted
          loop
          playsInline
          preload="metadata"
          style={{ objectPosition: project.thumbnailPosition }}
        />
      ) : (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          loading="lazy"
          draggable={false}
          style={{ objectPosition: project.thumbnailPosition }}
        />
      )}
      <div className="card-overlay">
        <h3 className="card-title">{project.title}</h3>
        <div className="card-tags">
          {project.tags?.map(t => (
            <span key={t} className="card-tag">{formatTag(t)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
