// -----------------------------
// src/pages/MessagePage/MessagePage.jsx
// -----------------------------
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiPaperclip,
  FiSend,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Bot } from "lucide-react";
import { ImCross } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import markdownToTxt from "markdown-to-txt";
import axios from "axios";
import UploadFile from "../../Helper/UploadFile";

const MessagePage = () => {
  const params = useParams();
  const messagesEndRef = useRef(null);
 
                      
   
  const { SocketConnection,Theme, user_id } = useSelector((s) => s.user);
  const [allMessages, setAllMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [messages, setMessages] = useState({
    text: "",
    fileDetails: { Url: "", Format: "" },
  });

  const [openAI, setOpenAI] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  useEffect(() => {
    if (!SocketConnection) return;

    SocketConnection.emit("message_page", params.userId);

    SocketConnection.on("message_user", setUserDetails);
    SocketConnection.on("message", setAllMessages);
    SocketConnection.emit("seen", params.userId);

    return () => {
      SocketConnection.off("message_user");
      SocketConnection.off("message");
    };
  }, [SocketConnection, params.userId]);

  // -------------- Handlers --------------
  const handleThemeFileClear = () =>
    setMessages((p) => ({ ...p, fileDetails: { Url: "", Format: "" } }));

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await UploadFile(file);
    setMessages((p) => ({
      ...p,
      fileDetails: { Url: res.url, Format: res.format },
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const promptMode = messages.text.startsWith("@ai");

    if (promptMode) {
      setOpenAI(true);
      setIsLoadingAI(true);
      const prompt = messages.text.slice(3).trim();

      try {
        const { data } = await axios.get(
          "http://localhost:8000/ai/get_result",
          { params: { prompt } }
        );
        setAiResponse(data.result);
      } finally {
        setIsLoadingAI(false);
      }
      return;
    }

    if (!SocketConnection) return;

    SocketConnection.emit("new message", {
      sender: user_id,
      receiver: params.userId,
      text: messages.text,
      fileDetails: messages.fileDetails,
    });

    setMessages({ text: "", fileDetails: { Url: "", Format: "" } });
  };

  const forwardAIResponse = () => {
    const plain = markdownToTxt(aiResponse);
    SocketConnection.emit("new message", {
      sender: user_id,
      receiver: params.userId,
      text: plain,
    });
    setOpenAI(false);
    setAiResponse("");
  };

  // -------------- Render helpers --------------
  const MessageBubble = ({ m }) => {
    const mine = m.msgSendBy === user_id;
    return (
      <div className={`chat ${mine ? "chat-end" : "chat-start"}`}>
        {!mine && (
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              {userDetails.photo ? (
                <img src={userDetails.photo} />
              ) : (
                <FiUser className="h-4 w-4" />
              )}
            </div>
          </div>
        )}

        <div className="chat-header text-xs opacity-70">
          {mine ? "You" : userDetails.name || "User"}{" "}
          <time className="ml-1">
            {new Date(m.createdAt).toLocaleTimeString()}
          </time>
        </div>

        <div
          className={`chat-bubble ${mine
            ? "chat-bubble-primary"
            : "chat-bubble-secondary"
          }`}
        >
          {m.fileDetails?.Url && (
            <div className="mb-2">
              {m.fileDetails.Format === "mp4" ? (
                <video
                  src={m.fileDetails.Url}
                  controls
                  className="max-w-xs rounded-lg"
                />
              ) : (
                <img
                  src={m.fileDetails.Url}
                  className="max-w-xs rounded-lg"
                />
              )}
            </div>
          )}
          {m.text}
        </div>
      </div>
    );
  };

  // -------------- JSX --------------
  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Header */}
      <header className="bg-base-100 p-4 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={userDetails.photo || "/placeholder.svg"}
              alt=""
            />
            <div>
              <h1 className= {`${Theme === 'dark' ? 'text-white' : 'text-black'} font-semibold truncate`}>
                {userDetails.name || "Chat User"}
              </h1>
              <p className={`text-sm ${userDetails.online?'text-success':'text-red-500'}`}>
                {userDetails.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <button className="btn btn-sm btn-outline gap-2">
            <FiSettings className="w-4 h-4" />
            Files &amp; Settings
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
        {allMessages.map((m) => (
          <MessageBubble key={m._id} m={m} />
        ))}
        <div ref={messagesEndRef} />

        {/* AI modal */}
        {(openAI || isLoadingAI) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
            <div className="w-full max-w-2xl bg-base-100 rounded-lg overflow-hidden">
              <header className="flex items-center justify-between bg-primary p-4 text-primary-content">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Assistant</h3>
                    <p className="text-sm opacity-90">Powered by AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpenAI(false)}
                  className="btn btn-sm btn-ghost text-primary-content"
                >
                  <ImCross className="w-4 h-4" />
                </button>
              </header>

              <section className="p-6 max-h-[60vh] overflow-y-auto">
                {isLoadingAI ? (
                  <div className="flex items-center justify-center py-8">
                    <span className="loading loading-dots loading-lg" />
                    <span className="ml-3">AI is thinking…</span>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={forwardAIResponse}
                        className="btn btn-primary"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* File preview (sticky) */}
        {messages.fileDetails.Url && (
          <div className="fixed bottom-20 inset-x-0 flex justify-center">
            <div className="relative bg-base-200 p-3 rounded-lg">
              <button
                onClick={handleThemeFileClear}
                className="btn btn-xs btn-circle absolute -right-2 -top-2"
              >
                <IoClose size={14} />
              </button>
              {messages.fileDetails.Format === "mp4" ? (
                <video
                  src={messages.fileDetails.Url}
                  controls
                  className="max-h-40 rounded-md"
                />
              ) : (
                <img
                  src={messages.fileDetails.Url}
                  className="max-h-40 rounded-md"
                  alt="attachment"
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Composer */}
      <footer className="p-4 bg-base-100 border-t border-base-300">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2"
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <FiPaperclip className="w-6 h-6" />
          </label>

          <input
            type="text"
            value={messages.text}
            onChange={(e) =>
              setMessages((p) => ({ ...p, text: e.target.value }))
            }
            placeholder="Type a message… (@ai for AI help)"
            className="flex-1 input input-bordered bg-slate-50 text-black"
          />

          <button
            type="submit"
            disabled={
              !messages.text.trim() && !messages.fileDetails.Url
            }
            className="btn btn-circle hover:bg-slate-200 bg-slate-50 btn-primary"
          >
            <FiSend className="w-4 h-4 text-black" />
          </button>
        </form>

        <p className="mt-2 text-xs opacity-70">
          💡 Start your message with <code>@ai</code> for AI assistance
        </p>
      </footer>
    </div>
  );
};

export default MessagePage;
