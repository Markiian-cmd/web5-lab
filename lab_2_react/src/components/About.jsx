function About({ profile }) {
  return (
    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title">Про мене</h2>
      <p>Я {profile.name}. Навчаюся в Національному університеті «Львівська політехніка» за спеціальністю {profile.specialty}, у групі {profile.group}.</p>
    </section>
  )
}

export default About
