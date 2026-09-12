import React, { useState, useMemo } from 'react';
import { X, Filter } from 'lucide-react';
import { ProjectTags, Technologies, type Project } from '../types';

const Projects = ({ projects = [] }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all available tags and technologies from enums
  const allFilterOptions = useMemo(() => {
    return {
      tags: Object.values(ProjectTags).sort(),
      technologies: Object.values(Technologies).sort()
    };
  }, []);

  // Filter projects based on selected filters only
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }
    
    return projects.filter(project => {
      if (!project) return false;
      
      // Selected filters (tags and technologies) - show all if no filters selected
      if (selectedFilters.length === 0) {
        return true;
      }

      // Check if project has any of the selected filters
      const matchesFilters = selectedFilters.some(filter => 
        (Array.isArray(project.tags) && project.tags.includes(filter)) || 
        (Array.isArray(project.technologies) && project.technologies.includes(filter))
      );

      return matchesFilters;
    });
  }, [projects, selectedFilters]);

  const handleFilterToggle = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const renderSingleProject = (project: Project, index: number) => {
    const isLeft = index % 2 === 0;
    
    return (
      <div
        id="projects"
        key={project.slug} 
        className={`project-item ${isLeft ? 'project-left' : 'project-right'}`}
      >
        <div className="gradient-container">
          <div className="project-content">
            <div className="project-image-container">
              <img
                src={project.thumbnail}
                className="project-image"
                alt={project.title}
              />
            </div>
            <div className="project-info">
              <div className="project-tags">
                {(project.tags || []).map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-technologies">
                {(project.technologies || []).map((tech, techIndex) => (
                  <span key={techIndex} className="tech">
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.slug}
                target="_blank"
                className="project-link"
              >
                → View project
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projects-container">
      <div className="container">
        <h2 className="section-title">
          Projects (some free, some not, all of them fun to look at tho!)
        </h2>
        
        {/* Filter Section */}
        <div className="filter-section">
          {/* Filter Toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
          >
            <Filter size={18} />
            Filters
            {selectedFilters.length > 0 && (
              <span className="filter-count">{selectedFilters.length}</span>
            )}
          </button>

          {/* Clear All Button */}
          {selectedFilters.length > 0 && (
            <button onClick={clearAllFilters} className="clear-all-btn">
              Clear Filters
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="filter-options">
            <div className="filter-group">
              <h4 className="filter-group-title">Tags</h4>
              <div className="filter-items">
                {allFilterOptions.tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleFilterToggle(tag)}
                    className={`filter-item ${selectedFilters.includes(tag) ? 'active' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h4 className="filter-group-title">Technologies</h4>
              <div className="filter-items">
                {allFilterOptions.technologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => handleFilterToggle(tech)}
                    className={`filter-item ${selectedFilters.includes(tech) ? 'active' : ''}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="results-info">
          Showing {filteredProjects.length} of {projects?.length || 0} projects
        </div>

        {/* Projects List */}
        <div className="projects-list">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => renderSingleProject(project, index))
          ) : (
            <div className="no-results">
              <h3>No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .projects-container {
          background: #08101a;
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          font-family: 'IBM Plex Mono', monospace;
          color: #cce0f0;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 2.5rem;
          text-align: left;
        }

        .filter-section {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          background: #0d1a28;
          border: 1px solid #182a3e;
          border-radius: 4px;
          color: #7a9ab5;
          font-size: 0.85rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .filter-toggle:hover,
        .filter-toggle.active {
          border-color: #3d7fc1;
          color: #cce0f0;
        }

        .filter-count {
          background: #3d7fc1;
          color: #08101a;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 2px;
          min-width: 1.1rem;
          text-align: center;
        }

        .clear-all-btn {
          padding: 0.45rem 0.9rem;
          background: transparent;
          border: 1px solid #182a3e;
          border-radius: 4px;
          color: #7a9ab5;
          font-size: 0.85rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }

        .clear-all-btn:hover {
          border-color: #a03030;
          color: #c04040;
        }

        .filter-options {
          background: #0d1a28;
          border: 1px solid #182a3e;
          border-radius: 5px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .filter-group {
          margin-bottom: 1.25rem;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-group-title {
          font-family: 'IBM Plex Mono', monospace;
          color: #7a9ab5;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.6rem;
        }

        .filter-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .filter-item {
          padding: 0.25rem 0.65rem;
          background: transparent;
          border: 1px solid #182a3e;
          border-radius: 3px;
          color: #7a9ab5;
          font-size: 0.78rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }

        .filter-item:hover {
          border-color: #3d7fc1;
          color: #cce0f0;
        }

        .filter-item.active {
          background: #122035;
          border-color: #3d7fc1;
          color: #3d7fc1;
          font-weight: 600;
        }

        .results-info {
          font-family: 'IBM Plex Mono', monospace;
          color: #3a5878;
          font-size: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          border: 1px solid #182a3e;
          border-radius: 5px;
        }

        .no-results h3 {
          font-family: 'IBM Plex Mono', monospace;
          color: #cce0f0;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .no-results p {
          color: #7a9ab5;
          font-size: 0.9rem;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .project-item {
          width: 100%;
          display: flex;
        }

        .project-left { justify-content: flex-start; }
        .project-right { justify-content: flex-end; }

        .gradient-container {
          max-width: 820px;
          width: 90%;
          border: 1px solid #182a3e;
          border-radius: 6px;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }

        .gradient-container:hover {
          border-color: #1e3d60;
          transform: translateY(-2px);
        }

        .project-content {
          background: #0d1a28;
          padding: 1.75rem;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 1.75rem;
          align-items: start;
        }

        .project-image-container {
          position: relative;
        }

        .project-image {
          width: 100%;
          height: 170px;
          object-fit: cover;
          border-radius: 3px;
          transition: opacity 0.2s;
        }

        .gradient-container:hover .project-image {
          opacity: 0.88;
        }

        .project-info {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .tag {
          background: #122035;
          color: #3d7fc1;
          border: 1px solid rgba(61, 127, 193, 0.28);
          padding: 0.18rem 0.55rem;
          border-radius: 2px;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'IBM Plex Mono', monospace;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .tech {
          background: transparent;
          color: #7a9ab5;
          border: 1px solid #182a3e;
          padding: 0.15rem 0.45rem;
          border-radius: 2px;
          font-size: 0.72rem;
          font-family: 'IBM Plex Mono', monospace;
        }

        .project-title {
          font-family: 'IBM Plex Mono', monospace;
          color: #cce0f0;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0.15rem 0;
          line-height: 1.25;
        }

        .project-description {
          color: #7a9ab5;
          font-size: 0.9rem;
          line-height: 1.7;
          margin: 0;
        }

        .project-link {
          font-family: 'IBM Plex Mono', monospace;
          color: #3d7fc1;
          font-size: 0.82rem;
          align-self: flex-start;
          padding-bottom: 1px;
          border-bottom: 1px solid #3d7fc1;
          transition: color 0.2s, border-color 0.2s;
          text-decoration: none;
        }

        .project-link:hover {
          color: #5a9ad8;
          border-bottom-color: #5a9ad8;
        }

        @media (max-width: 768px) {
          .container { padding: 0 1rem; }
          .section-title { font-size: 1.2rem; margin-bottom: 2rem; }
          .filter-section { flex-direction: column; align-items: stretch; }
          .filter-options { padding: 1rem; }
          .projects-list { gap: 3rem; }
          .gradient-container { width: 100%; }
          .project-content {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding: 1.25rem;
          }
          .project-image { height: 150px; }
          .project-title { font-size: 1.1rem; }
        }
      `}</style>    
    </div>
  );
};

export default Projects;
