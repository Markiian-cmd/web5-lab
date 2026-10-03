function Header({ name, specialty, city }) {
  return (
    <header>
      <h1>{name}</h1>
      <p>Студент спеціальності {specialty}</p>
      <p>{city}, Україна</p>
      <nav aria-label="Розділи резюме">
        <ul>
          <li><a href="#about">Про мене</a></li>
          <li><a href="#education">Освіта</a></li>
          <li><a href="#experience">Навчальний досвід</a></li>
          <li><a href="#contacts">Контакти</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
