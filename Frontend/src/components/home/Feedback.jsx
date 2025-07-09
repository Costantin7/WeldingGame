import { useEffect, useState } from "react";

function Feedback(props) {
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div
        onClick={() => {
          if (close) {
            props.desativar(0);
          }
        }}
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40"
      ></div>

      <div className="fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-150 h-120 font-serif">
        <div
          className="place-self-end w-8 flex justify-center px-4 py-1 cursor-pointer center-items"
          onClick={() => {
            props.desativar(0);
          }}
        >
          <p>❌</p>
        </div>
        <p>Feedback</p>
      </div>
    </div>
  );
}

export default Feedback;
