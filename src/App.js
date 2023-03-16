import { useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { FaCopy } from 'react-icons/fa';

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

  // const renderContent = (qna) => {
  //   const value = qna.value;

  //   if (Array.isArray(value)) {
  //     return value.map((v) => <p className="message-text">{v}</p>);
  //   }

  //   return <p className="message-text">{value}</p>;
  // };



  const renderContent = (qna) => {
    const value = qna.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">
        {v} <FaCopy onClick={()=>handleToCopy(v)} 
        
        /></p>);
    }

    return <p className="message-text">{value}</p>;
  };


  return (
    <main class="container">
    <div className="text-center mt-12 text-2xl font-bold text-sky-500">
      ZUSS Detect
      <p className="text-lg text-yellow-500">
        {/* Please ask me any question I will try to answer like ChatGPT: */}
        Please give me the information text to get proper address:
      </p>
    </div>
      <div class="chats ml-5">
        {qna.map((qna) => {
          if (qna.from === YOU) {
            return (
              <div class="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
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
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
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
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              class="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
      </div>

      {/* <div className="chat-input ml-0 md:ml-20 border-2">
        <input
          type="text"
          ref={inputRef}
          class="form-control col pl-3"
          placeholder="Type Something"
        />
        <button disabled={loading} className="border-2 px-5 py-1 bg-lime-200 " onClick={handleSend}>
          Send
        </button>
      </div> */}
      <div className="chat-input ml-0 md:ml-20 mt-10 border-2">
        <textarea
        // type="text"
        ref={textareaRef}
        className="form-control pl-3 w-full"
        placeholder="Type Something"
        ></textarea>
        {/* <input
          type="text"
          ref={inputRef}
          class="form-control col pl-3"
          placeholder="Type Something"
        /> */}
        <button disabled={loading} className="border-2 px-5 py-1 bg-lime-200 " onClick={handleSend}>
          Send
        </button>
      </div>
    </main>
  );
}

export default App;

