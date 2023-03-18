import { useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { FaCopy } from 'react-icons/fa';
import aiImg from "./img/AI logo.png"
import animateImg from "./img/animationPic.png"

const YOU = "you";
const AI = "ai";
function App() {
  const textareaRef = useRef();
  const [qna, setQna] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateQNA = (from, value) => {
    setQna((qna) => [...qna, { from, value }]);
  };


  
  const handleToCopy=(v)=>{
    let copyValue=v.split("：")[1]
navigator.clipboard.writeText(copyValue)
  }


  
  const handleSend = () => {
    const question = textareaRef.current.value;
    textareaRef.current.value="";
    updateQNA(YOU, question);
// http://localhost:5000/  https://zuss-detect.vercel.app
    setLoading(true);
    axios
      .post("https://zuss-detect.vercel.app/detect", {
        question,
      })
      .then((response) => {
        updateQNA(AI, response.data.answer);
      })
      .finally(() => {
        setLoading(false);
      });
  };




  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">
        {v} <FaCopy className="text-red-400 ml-2 inline-block hover:cursor-pointer" onClick={()=>handleToCopy(v)} 
        
        /></p>);
    }

    return <p className="message-text">{value}</p>;
  };


  return (
    <main className="mx-0  relative">
    <div className="text-center sticky top-0 w-full text-2xl py-3 font-bold text-sky-500 bg-gradient-to-t from-indigo-900 via-neutral-900 to-blue-900">
      ZUSS Detect
      <p className="text-lg text-yellow-500">
        {/* Please ask me any question I will try to answer like ChatGPT: */}
        Please give me the information text to get proper address
      </p>
    </div>
      <div class="chats ml-5 mx-0 md:mx-10 mb-10">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div class="send chat">
                <img
                  src={animateImg}
                  alt=""
                  class="avtar"
                />
                <p>{renderContent(qna)}</p>
              </div>
            );
          }
          return (
            <div class="recieve chat">
              <img
                src={aiImg}
                alt=""
                class="avtar"
              />
              <p>{renderContent(qna)}</p>
            </div>
          );
        })}

        {loading && (
          <div class="recieve chat">
            <img
              src={aiImg}
              alt=""
              class="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
      </div>

      <div className="flex mx-1 md:mx-10 mt-10 border-2">
        <textarea
        // type="text"
        ref={textareaRef}
        className="form-control pl-3 w-full"
        placeholder="Type Something"
        ></textarea>

        <button disabled={loading} className="border-2 px-5 py-1 bg-lime-200 " onClick={handleSend}>
          Send
        </button>
      </div>
    </main>
  );
}

export default App;

