function AparecerNoRanking(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.func1();
          props.func2();
          props.func3();
          props.func4();
          props.setTimer(!props.timer);
        }}
        className=" bottom-1 left-30 !bg-white mx-20 shadow-lg "
      >
        ◎ Aparecer no Ranking
      </button>
    </div>
  );
}

export default AparecerNoRanking;
