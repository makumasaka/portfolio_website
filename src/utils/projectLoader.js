import rawProjects from 'virtual:projects'

const TAG_LABELS = {
  '3d': '3D',
};

export function formatTag(tag) {
  if (TAG_LABELS[tag]) return TAG_LABELS[tag];
  return tag.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export function isVideo(filename) {
  return /\.(mp4|mov|webm)$/i.test(filename);
}

function mediaUrl(folderId, filename) {
  return `/projects/${folderId}/${encodeURIComponent(filename)}`;
}

export function loadProjects() {
  return rawProjects.map(config => {
    const thumbnailUrl = config.thumbnail
      ? mediaUrl(config.id, config.thumbnail)
      : null;

    let resolvedMedia;
    if (config.media) {
      resolvedMedia = config.media.map(name => ({
        name,
        url: mediaUrl(config.id, name),
      }));
    } else if (config.thumbnail) {
      resolvedMedia = [{ name: config.thumbnail, url: thumbnailUrl }];
    } else {
      resolvedMedia = [];
    }

    const allMedia = {};
    if (config.sections) {
      config.sections.forEach(s => {
        if (s.src) allMedia[s.src] = mediaUrl(config.id, s.src);
      });
    }
    if (config.media) {
      config.media.forEach(name => {
        allMedia[name] = mediaUrl(config.id, name);
      });
    }
    if (config.thumbnail) {
      allMedia[config.thumbnail] = thumbnailUrl;
    }

    return { ...config, thumbnailUrl, thumbnailPosition: config.thumbnailPosition || 'center', thumbnailScale: config.thumbnailScale ?? 1, resolvedMedia, allMedia };
  }).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getAllTags(projects) {
  const tagSet = new Set();
  projects.forEach(p => p.tags?.forEach(t => tagSet.add(t)));
  return [...tagSet].sort();
}
