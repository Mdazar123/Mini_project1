import React from 'react';
import './home.css';
import darklogo from '../../assets/darklogo.png'
import lightlogo from '../../assets/lightlogo.png'
import { FaGraduationCap, FaAward, FaBuilding, FaCreditCard } from 'react-icons/fa';
import { FaArrowCircleUp } from "react-icons/fa";
import { MdKeyboardVoice } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiRobot3Fill } from "react-icons/ri";



const cardData = [
  {
    icon: <FaGraduationCap />,
    text: "Explore the Eligibility Criteria for B.Tech Programs",
  },
  {
    icon: <FaAward />,
    text: "Explore Scholarship Options and Financial Aid",
  },
  {
    icon: <FaBuilding />,
    text: "Explore Campus Recruitment Opportunities",
  },
  {
    icon: <FaCreditCard />,
    text: "Learn About Tuition Fees and Payment Methods",
  }
];

const Cards = ({ currentTheme }) => {
  return (
    <div className={`Home_page ${currentTheme}`}>
      <div className={`Home_page_container ${currentTheme}`}>
        <img src={currentTheme === 'dark' ? lightlogo : darklogo} alt="" />
        <div className={`cards_container ${currentTheme}`}>
          {cardData.map((card, index) => (
            <div 
              key={index} 
              className="question-card"
            >
              <div className="icon-wrapper">
                {card.icon}
              </div>
              <p className="card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`message_container ${currentTheme}`}>
        <div className="msg_box">
          <div className="user_msg_box">
            <div className="user_message">
              <p>Hello, I am a student of B.Tech in Computer Science and Engineering. I am looking for a scholarship for my higher studies. Can you help me?</p>
            </div>
            <div className="user_icon">
              <FaUser/>
            </div>
          </div>
          <div className="ai_msg_box">
            <div className="ai_icon">
              <RiRobot3Fill/>
            </div>
            <div className="Ai_message">
              <p>Yes, I can help you with that. I am a student of B.Tech in Computer Science and Engineering. I am looking for a scholarship for my higher studies. Can you help me?</p>
            </div>
          </div>
        </div>
        <div className="msg_box">
          <div className="user_msg_box">
            <div className="user_message">
              <p>What are the eligibility criteria and admission requirements for B.Tech programs at your institution?</p>
            </div>
            <div className="user_icon">
              <FaUser/>
            </div>
          </div>
          <div className="ai_msg_box">
            <div className="ai_icon">
              <RiRobot3Fill/>
            </div>
            <div className="Ai_message">
              <p>For B.Tech admission, you'll need: <br />
              
              1. Minimum 60% aggregate in 10+2 with Physics and Mathematics <br />as compulsory subjects
              2. Valid JEE Main/State-level entrance exam score
              <br />
              3. Completed application form with required documents
              <br />
              4. Proof of age and residence
              <br />
              5. Category certificates if applicable (SC/ST/OBC)
              <br />
              The selection is merit-based on entrance exam scores. We also offer lateral entry in 2nd year for Diploma holders. Would you like specific details about any of these requirements?</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`search_box ${currentTheme}`}>
        <input type='text' placeholder='Search for anything'/>
        <div className="search">
          <div className="voice_icon">
            <MdKeyboardVoice/>
          </div>
          <div className="search_icon">
            <FaArrowCircleUp/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
