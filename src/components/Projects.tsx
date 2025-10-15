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
                VIEW PROJECT
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

      <style jsx>{`
        .projects-container {
          background: #121212;
          min-height: 100vh;
          padding: 4rem 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-title {
          color: #fff;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
          background: linear-gradient(135deg, #0ff, #00cccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Filter Section Styles */
        .filter-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: rgba(26, 26, 26, 0.9);
          border: 2px solid rgba(0, 255, 255, 0.2);
          border-radius: 25px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
        }

        .filter-toggle:hover,
        .filter-toggle.active {
          border-color: #0ff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        }

        .filter-count {
          background: linear-gradient(135deg, #0ff, #00cccc);
          color: #000;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
          min-width: 1.2rem;
          text-align: center;
        }

        .clear-all-btn {
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #ff4444, #cc3333);
          border: none;
          border-radius: 25px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);
        }

        /* Filter Options */
        .filter-options {
          background: rgba(26, 26, 26, 0.9);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(20px);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .filter-group {
          margin-bottom: 2rem;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-group-title {
          color: #0ff;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #0ff, #00cccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .filter-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter-item {
          padding: 0.5rem 1rem;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 20px;
          color: #0ff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-item:hover {
          background: rgba(0, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .filter-item.active {
          background: linear-gradient(135deg, #0ff, #00cccc);
          color: #000;
          font-weight: 700;
          border-color: transparent;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
        }

        .results-info {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin-bottom: 3rem;
          text-align: center;
          padding: 1rem;
          background: rgba(0, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(0, 255, 255, 0.1);
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(26, 26, 26, 0.6);
          border-radius: 20px;
          border: 1px solid rgba(0, 255, 255, 0.1);
        }

        .no-results h3 {
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .no-results p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .project-item {
          width: 100%;
          display: flex;
        }

        .project-left {
          justify-content: flex-start;
        }

        .project-right {
          justify-content: flex-end;
        }

        .gradient-container {
          position: relative;
          max-width: 800px;
          width: 90%;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.15) 0%,
            rgba(0, 255, 255, 0.05) 30%,
            rgba(0, 255, 255, 0.02) 60%,
            transparent 100%
          );
          border-radius: 24px;
          padding: 2px;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 8px 32px rgba(0, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .project-right .gradient-container {
          background: linear-gradient(
            -135deg,
            rgba(0, 255, 255, 0.15) 0%,
            rgba(0, 255, 255, 0.05) 30%,
            rgba(0, 255, 255, 0.02) 60%,
            transparent 100%
          );
        }

        .gradient-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.03) 0%,
            transparent 50%
          );
          border-radius: 24px;
          z-index: -1;
        }

        .gradient-container:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 40px rgba(0, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .gradient-container:hover::before {
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.08) 0%,
            transparent 50%
          );
        }

        .project-content {
          background: rgba(26, 26, 26, 0.9);
          border-radius: 22px;
          padding: 2rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          align-items: center;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 255, 255, 0.1);
        }

        .project-image-container {
          position: relative;
        }

        .project-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .gradient-container:hover .project-image {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(0, 255, 255, 0.2);
        }

        .project-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: linear-gradient(135deg, #0ff, #00cccc);
          color: #000;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech {
          background: rgba(0, 255, 255, 0.1);
          color: #0ff;
          border: 1px solid rgba(0, 255, 255, 0.3);
          padding: 0.3rem 0.6rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .project-title {
          color: #fff;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        .project-link {
          background: linear-gradient(135deg, #0ff, #00cccc);
          color: #000;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          align-self: flex-start;
          position: relative;
          overflow: hidden;
        }

        .project-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .project-link:hover::before {
          left: 100%;
        }

        .project-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 255, 255, 0.3);
          color: #000;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          
          .filter-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-options {
            padding: 1.5rem;
          }
          
          .projects-list {
            gap: 4rem;
          }
          
          .gradient-container {
            width: 100%;
          }
          
          .project-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }
          
          .project-image {
            height: 180px;
          }
          
          .project-title {
            font-size: 1.5rem;
          }
        }
      `}</style>    
    </div>
  );
};

export default Projects;
