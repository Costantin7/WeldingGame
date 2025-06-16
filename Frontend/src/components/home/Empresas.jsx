function Empresas(props){
    return(
        <a target="_blank" rel="noopener noreferrer" href={props.site} > 
            <img className="h-[50px] grayscale object-contain" alt={props.nome} src={props.imagem} /> 
        </a>
    )
}

export default Empresas;