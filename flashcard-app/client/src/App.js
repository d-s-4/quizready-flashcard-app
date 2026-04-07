import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [setName, setSetName] = useState("");
  const [selectedSet, setSelectedSet] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/flashcards")
      .then((res) => res.json())
      .then((data) => {
        const cardsWithState = data.map((card) => ({
          ...card,
          showAnswer: false,
          used: false
        }));
        setCards(cardsWithState);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, []);

const addCard = () => {
  if (!question.trim() || !answer.trim()) {
    alert("Please enter both a question and an answer.");
    return;
  }

  fetch("http://localhost:5000/flashcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question, answer, setName })
  })
    .then((res) => res.json())
    .then((newCard) => {
      const formattedCard = {
        ...newCard,
        question: newCard.question || question,
        answer: newCard.answer || answer,
        setName: newCard.setName || setName,
        showAnswer: false,
        used: false
      };

      setCards((prevCards) => [...prevCards, formattedCard]);
      setQuestion("");
      setAnswer("");
      setSetName("");
    })
    .catch((error) => console.error("Error adding flashcard:", error));
};

  const deleteCard = (id) => {
    fetch(`http://localhost:5000/flashcards/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card._id !== id));
      })
      .catch((error) => console.error("Error deleting flashcard:", error));
  };

  const toggleAnswer = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === id
          ? { ...card, showAnswer: !card.showAnswer }
          : card
      )
    );
  };

  const markAsUsed = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === id ? { ...card, used: true } : card
      )
    );
  };

  const resetStudySession = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        used: false
      }))
    );
  };

  const updateCard = (id) => {
    fetch(`http://localhost:5000/flashcards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: editQuestion,
        answer: editAnswer
      })
    })
      .then((res) => res.json())
      .then((updatedCard) => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card._id === id
              ? { ...updatedCard, showAnswer: false, used: false }
              : card
          )
        );
        setEditingId(null);
        setEditQuestion("");
        setEditAnswer("");
      })
      .catch((error) => console.error("Error updating flashcard:", error));
  };

  const visibleCards = cards.filter(
  (card) =>
    !card.used && (selectedSet === "All" || card.setName === selectedSet)
  );
  const usedCards = cards.filter((card) => card.used);
  const allSets = ["All", ...new Set(cards.map((card) => card.setName).filter(Boolean))];

  return (
    <div className="app">
      <div className="brand-header">
        <div className="logo-mark">
          <div className="card-stack back-card"></div>
          <div className="card-stack middle-card"></div>
          <div className="card-stack front-card">
            <span className="tick">✓</span>
          </div>
        </div>
        
        <div>
          <h1>
            <span className="brand-quiz">Quiz</span>
            <span className="brand-ready">Ready</span>
          </h1>
          <p className="subtitle">
            Study smarter and stay prepared, one flashcard at a time.
          </p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter set name"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        />
        <button onClick={addCard}>Add Flashcard</button>
      </div>

      <div className="top-actions">
        <button onClick={resetStudySession}>Reset Study Session</button>

        <select value={selectedSet} onChange={(e) => setSelectedSet(e.target.value)}>
          {allSets.map((set) => (
            <option key={set} value={set}>
              {set}
            </option>
          ))}
        </select>
      </div>

      <div className="stats">
        <div className="stat-box">
          <h3>{cards.length}</h3>
          <p>Total Cards</p>
        </div>
        <div className="stat-box">
          <h3>{visibleCards.length}</h3>
          <p>Cards Left</p>
        </div>
        <div className="stat-box">
          <h3>{usedCards.length}</h3>
          <p>Used Cards</p>
        </div>
      </div>

      <div className="card-list">
        {visibleCards.map((card) => (
          <div key={card._id} className="card">
            {editingId === card._id ? (
              <>
                <input
                  type="text"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  placeholder="Edit question"
                />
                <input
                  type="text"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  placeholder="Edit answer"
                />
                <div className="card-actions">
                  <button
                    className="save-btn"
                    onClick={() => updateCard(card._id)}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => toggleAnswer(card._id)}
                  className="card-content"
                >
                  <span className="card-label">QUESTION</span>
                  <p className="set-tag">{card.setName || "Uncategorized"}</p>
                  <h3>{card.question}</h3>

                  {card.showAnswer && (
                    <div className="answer-box">
                      <p>{card.answer}</p>
                      <button
                        className="mark-used-btn"
                        onClick={() => markAsUsed(card._id)}
                      >
                        Mark as Used
                      </button>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(card._id);
                      setEditQuestion(card.question);
                      setEditAnswer(card.answer);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCard(card._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {visibleCards.length === 0 && (
        <div className="empty-state">
          <h2>No cards left in this session</h2>
          <p>Click “Reset Study Session” to bring your flashcards back.</p>
        </div>
      )}
    </div>
  );
}

export default App;