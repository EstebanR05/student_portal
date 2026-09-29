function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer>
      <p>© {anio} Academiq Hub - Portal Académico Estudiantil</p>
    </footer>
  );
}

export default Footer;
