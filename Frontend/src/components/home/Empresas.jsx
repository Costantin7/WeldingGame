function Empresas(props) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={props.site}>
      <img
        className=" h-[25px] sm:h-[35px] md:h-[45px] lg:h-[65px] grayscale "
        alt={props.nome}
        src={props.imagem}
      />
    </a>
  );
}

export default Empresas;
