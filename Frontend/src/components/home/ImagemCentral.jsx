function ImagemCentral(props){
    return(
        <div>
            <img className={props.class} src={props.link} alt={props.nome} />
        </div>
    );
}

export default ImagemCentral;