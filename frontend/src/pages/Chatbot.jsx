import React from 'react';
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedField, setSelectedField] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const [chatInstance, setChatInstance] = useState(null);
  const history = [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI("AIzaSyDloIbXrKuJ70M5M3p4yF6r3IEx3EWipvw");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const chat = model.startChat({history});
        
        history.push(
          {
            role: "user",
            parts: [{ text: `${inputText}` }],
          }
        );
        setChatInstance(chat);
        setMessages([{
          role: `AI teaching assistant in the field ${selectedField}`,
          content: "What would you like to know?"
        }]);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || !chatInstance) return;
    
    const userMessage = {
      role: "user",
      content: inputText,
      field: selectedField
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    console.log(messages);
    
    try {
      const messageToSend = selectedField !== "general" 
        ? `[Context: This is a question about ${selectedField}]. ${inputText}`
        : `${inputText}. If there are multiple context of the answer then provide me options from which i can choose the option for next [in a JSON format, like: options: {}].`;
        
      const result = await chatInstance.sendMessage(messageToSend);
      const botResponse = result.response.text();
      
      setMessages(prev => [...prev, {
        role: "model",
        content: botResponse
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        role: "model",
        content: "Sorry, I encountered an error. Please try again."
      }]);
      console.log(messages);
      
    } finally {
      setIsLoading(false);
      setInputText("");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      minHeight: "100vh", 
      backgroundColor: "black",
      color: "white",
      paddingLeft: "2.5rem",
      paddingRight: "2.5rem",
      position: "relative"
    }}>
      <h1 style={{
        fontSize: "1.875rem",
        fontWeight: "bold",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        textAlign: "center"
      }}>
        AI Study Assistant
      </h1>

      <div style={{
        flex: 1,
        marginBottom: "6rem",
        overflowY: "auto"
      }}>
        <div style={{
          maxWidth: "48rem",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: msg.role === "user" ? "#1e3a8a" : "#1f2937",
                marginLeft: msg.role === "user" ? "auto" : "0",
                marginRight: msg.role === "user" ? "0" : "auto",
                maxWidth: "20rem"
              }}
            >
              {msg.role === "user" && msg.field !== "general" && (
                <div style={{
                  fontSize: "0.75rem",
                  color: "#93c5fd",
                  marginBottom: "0.25rem"
                }}>
                  Subject: {msg.field}
                </div>
              )}
              <div>{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div style={{
              backgroundColor: "#1f2937",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginRight: "auto",
              maxWidth: "20rem"
            }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#6b7280",
                  borderRadius: "9999px",
                  animation: "bounce 1s infinite"
                }}></div>
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#6b7280",
                  borderRadius: "9999px",
                  animation: "bounce 1s infinite",
                  animationDelay: "0.2s"
                }}></div>
                <div style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#6b7280",
                  borderRadius: "9999px",
                  animation: "bounce 1s infinite",
                  animationDelay: "0.4s"
                }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "black",
        padding: "1rem",
      }}>
        <form 
          onSubmit={handleSubmit} 
          style={{
            display: "flex", 
            gap: "0.5rem",
            maxWidth: "48rem",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about your studies..."
            style={{
              flex: 1,
              backgroundColor: "white",
              color: "black",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "none"
            }}
          />
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#e5e5e5",
              color: "black",
              border: "none"
            }}
          >
            <option value="general">Select subject</option>
            <option value="maths">Mathematics</option>
            <option value="science">Science</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="political-science">Political Science / Civics</option>
            <option value="economics">Economics</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="sanskrit">Sanskrit</option>
            <option value="computer">Computer Science / IT</option>
            <option value="gk">General Knowledge</option>
            <option value="environment">Environmental Studies (EVS)</option>
            <option value="business-studies">Business Studies</option>
            <option value="accountancy">Accountancy</option>
            <option value="psychology">Psychology</option>
            <option value="sociology">Sociology</option>
            <option value="art">Art / Drawing</option>
          </select>
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            style={{
              padding: "0.5rem 1.25rem",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "0.5rem",
              border: "none",
              opacity: isLoading || !inputText.trim() ? "0.5" : "1",
              cursor: isLoading || !inputText.trim() ? "not-allowed" : "pointer"
            }}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;