import { useState } from "react";

export default function FAQ() {
  return (
    <div className="faq">
      {FAQS.map((item, key) => (
        <FAQItem key={key} question={item.question} answer={item.answer} />
      ))}
      <div className="faq-item"></div>
    </div>
  );
}

export const FAQItem = (props: { question: any; answer: any }) => {
  const { question, answer } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="qustion" onClick={() => setOpen(!open)}>
        <p className="qustion-p">
          <span>Q:</span>
          {question}
        </p>
        <span>
          {/* eslint-disable-next-line */}
          <img
            src="/img/dropdown-icon.png"
            alt=""
            style={{ transform: `rotate(${!open ? 0 : "180deg"})` }}
          />
        </span>
      </div>
      <div className="answer" style={{ maxHeight: open ? "300px" : "0" }}>
        <p className="answer-p">
          <span>A:</span>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQS = [
  {
    question: "What is Kitties Sweepers?",
    answer:
      "Kitties Sweepers is a special community sweep event for 3D Sol Kitties on Magic Eden.",
  },
  {
    question: "What is Kitties Sweepers?",
    answer:
      "Kitties Sweepers is a special community sweep event for 3D Sol Kitties on Magic Eden.",
  },
  {
    question: "What is Kitties Sweepers?",
    answer:
      "Kitties Sweepers is a special community sweep event for 3D Sol Kitties on Magic Eden.",
  },
];
