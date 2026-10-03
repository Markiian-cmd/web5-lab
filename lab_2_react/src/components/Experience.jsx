function Experience({ projects }) {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Навчальний досвід</h2>
      {projects.map((project) => (
        <article key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.experience && <p>{project.experience}</p>}
          {project.topics && (
            <ul>
              {project.topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
          )}
          {project.url && <p><a href={project.url}>Код навчального проєкту на GitHub</a></p>}
        </article>
      ))}
    </section>
  )
}

export default Experience
