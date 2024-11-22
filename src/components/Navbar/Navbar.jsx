import React, { useRef } from 'react';
import './navbar.css';
import sideopen from "../../assets/sideopen.svg";
import newchat from "../../assets/newchat.svg";
import darksideopen from "../../assets/darksideopen.svg";
import darknewchat from "../../assets/darknewchat.svg";
import darklogo from '../../assets/darklogo.png'
import lightlogo from '../../assets/lightlogo.png'
import bg from '../../assets/bg_enhanced.jpeg'

const Navbar = ({ toggleTheme, currentTheme, onNewChat }) => {
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.left = "0";
  };

  const closeMenu = () => {
    menuRef.current.style.left = "-300px";
  };

  const handleNewChat = () => {
    onNewChat();
    closeMenu();
  };

  const sidebarIcon = currentTheme === 'dark' ? darksideopen : sideopen;
  const newChatIcon = currentTheme === 'dark' ? darknewchat : newchat;
  const logoImage = currentTheme === 'dark' ? lightlogo : darklogo;

  return (
    <div className={`navbar ${currentTheme}`}>
      <div className="opensidebar">
        <img ref={menuRef} src={sidebarIcon} alt="sidebar" width={30} className='side' onClick={openMenu} />
      </div>
      <div ref={menuRef} className={`sidebar ${currentTheme}`}>
        <img src={sidebarIcon} alt="sidebar" width={30} className='side' onClick={closeMenu} />
        <div className="logoimg">
          <img src={logoImage} alt="logo" width={130}/>
        </div>
        <div className="newchat" onClick={handleNewChat} role="button" tabIndex={0}>
          <img src={newChatIcon} alt="new chat button" width={20}/>
          <p>New Chat</p>
        </div>
        <h3 className="faqs">Common Questions</h3>
        <div class="question-list">
          <p className='question'>How do I apply for campus admission?</p>
          <p className='question'>What documents are required for admission?</p>
          <p className='question'>How can I prepare for campus placement?</p>
          <p className='question'>Where can I find the campus map?</p>
        </div>
        <div className="theme-toggle">
          <p>Appearance</p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={currentTheme === 'dark'}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
