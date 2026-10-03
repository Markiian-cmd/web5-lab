function Education({ profile }) {
  return (
    <section id="education" aria-labelledby="education-title">
      <h2 id="education-title">Освіта</h2>
      <h3>{profile.university}</h3>
      <ul>
        <li>Спеціальність: {profile.specialty}</li>
        <li>Кафедра: {profile.department}</li>
        <li>Група: {profile.group}</li>
        <li>Місто: {profile.city}</li>
      </ul>
    </section>
  )
}

export default Education
