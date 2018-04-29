import React from 'react'

const FeaturedProjects = ({ projects }) => (
  <section className="section section--black">
    <h3 className="section__header">Featured Projects</h3>
    <div className="section__feature section__projects">
      {projects
        ? projects.slice(0, 4).map(project => (
            <div key={project.id} id={project.id} className="section__project">
              <h5>
                {project.title} &middot; {project.description}
              </h5>
            </div>
          ))
        : 'Loading'}
    </div>
  </section>
)

export default FeaturedProjects
