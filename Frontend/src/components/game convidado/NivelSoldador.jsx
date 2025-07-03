function NivelSoldador(props) {
  const cargos = [
    "Soldador de Final de Semana", //1
    "Vendedor em Soldagem", //2
    "Aluno de Graduação", //3
    "Aluno de IC em soldagem", //4
    "Soldador Profissional", //5
    "Soldador Senior", //6
    "Soldador Internacional", //7
    "Prático Internacional de Soldagem", //8
    "Inspetor IWI-B", //9
    "Técnico Internacional de Soldagem", //10
    "Mestrando em Soldagem", //11
    "Doutorando em Soldagem", //12
    "Inspetor IWI-S", //13
    "Mestre em Soldagem", //14
    "Inspetor IWI-C", //15
    "Doutor em Soldagem", //16
    "Técnpologo Internacional em Soldagem", //17
    "Engenheiro Internacional de Soldagem", //18
    "Engenheiro Sênior de Soldagem", //19
    "Professor Titular de Soldagem", //20
  ];
  return (
    <div>
      <div className="border w-25 bg-white rounded-xl">
        <p className="!bold text-xl underline">Nível {props.nivel}</p>
        <p> {cargos[props.nivel - 1]}</p>
      </div>
    </div>
  );
}

export default NivelSoldador;
