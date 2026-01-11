// Shifo AI Chat Widget - Floating Button + Popup Window

(function() {
  'use strict';

  // State management
  let isOpen = false;
  let messages = [];
  let language = 'UZ';
  let isTyping = false;
  let sessionId = localStorage.getItem('shifo_chat_sessionId') || 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  if (!localStorage.getItem('shifo_chat_sessionId')) {
    localStorage.setItem('shifo_chat_sessionId', sessionId);
  }

  // User data storage
  let userData = {
    name: '',
    phone: '',
    complaint: '',
    duration: ''
  };

  // Create widget HTML
  function createWidget() {
    const widgetHTML = `
      <!-- Floating Chat Button -->
      <div id="shifo-chat-button" class="shifo-chat-btn" onclick="toggleChat()">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span id="shifo-chat-badge" class="shifo-chat-badge" style="display: none;">0</span>
      </div>

      <!-- Chat Popup Window -->
      <div id="shifo-chat-window" class="shifo-chat-window" style="display: none;">
        <!-- Header -->
        <div class="shifo-chat-header">
          <div class="shifo-chat-header-left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span class="shifo-chat-title">Shifo AI Chat</span>
          </div>
          <svg id="shifo-chat-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" onclick="toggleChat()">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        <!-- Language Selector -->
        <div class="shifo-chat-lang">
          <button class="shifo-lang-btn ${language === 'UZ' ? 'active' : ''}" onclick="setLanguage('UZ')">UZ</button>
          <button class="shifo-lang-btn ${language === 'RU' ? 'active' : ''}" onclick="setLanguage('RU')">RU</button>
          <button class="shifo-lang-btn ${language === 'EN' ? 'active' : ''}" onclick="setLanguage('EN')">EN</button>
        </div>

        <!-- Messages Area -->
        <div id="shifo-chat-messages" class="shifo-chat-messages">
          <div class="shifo-msg shifo-msg-bot">
            <div class="shifo-msg-content">
              Assalomu alaykum! Sizning salomatligingiz biz uchun muhim. Ayting-chi, sizni aynan nima bezovta qilyapti?
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div id="shifo-typing-indicator" class="shifo-typing" style="display: none;">
          <div class="shifo-typing-dot"></div>
          <div class="shifo-typing-dot"></div>
          <div class="shifo-typing-dot"></div>
        </div>

        <!-- Input Area -->
        <div class="shifo-chat-input-area">
          <input 
            type="text" 
            id="shifo-chat-input" 
            class="shifo-chat-input" 
            placeholder="Savol yozing..."
            onkeypress="handleKeyPress(event)"
          />
          <button id="shifo-chat-send" class="shifo-chat-send-btn" onclick="sendMessage()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Create container and inject styles
    const container = document.createElement('div');
    container.id = 'shifo-chat-widget';
    container.innerHTML = widgetHTML;
    document.body.appendChild(container);
    injectStyles();
  }

  // Inject CSS styles
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #shifo-chat-widget {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      }

      /* Floating Button */
      .shifo-chat-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #2563eb;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        transition: all 0.3s ease;
        z-index: 10001;
      }

      .shifo-chat-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.5);
      }

      .shifo-chat-btn:active {
        transform: scale(0.95);
      }

      .shifo-chat-badge {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: #ef4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
        border: 2px solid white;
      }

      /* Chat Window */
      .shifo-chat-window {
        position: fixed;
        bottom: 96px;
        right: 20px;
        width: 384px;
        max-width: calc(96vw - 40px);
        height: 600px;
        max-height: calc(100vh - 120px);
        background: white;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Header */
      .shifo-chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #e5e7eb;
      }

      .shifo-chat-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .shifo-chat-title {
        font-weight: bold;
        font-size: 16px;
        color: #111827;
      }

      #shifo-chat-close {
        cursor: pointer;
        color: #6b7280;
      }

      #shifo-chat-close:hover {
        color: #111827;
      }

      /* Language Selector */
      .shifo-chat-lang {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 8px;
        border-bottom: 1px solid #e5e7eb;
        background: #f9fafb;
      }

      .shifo-lang-btn {
        padding: 4px 12px;
        border-radius: 6px;
        border: none;
        background: #e5e7eb;
        color: #6b7280;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
      }

      .shifo-lang-btn:hover {
        background: #d1d5db;
      }

      .shifo-lang-btn.active {
        background: #2563eb;
        color: white;
      }

      /* Messages Area */
      .shifo-chat-messages {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #f9fafb;
      }

      .shifo-msg {
        max-width: 80%;
        padding: 12px 16px;
        border-radius: 12px;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateX(10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .shifo-msg-bot {
        background: #f3f4f6;
        color: #111827;
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }

      .shifo-msg-user {
        background: #2563eb;
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
      }

      .shifo-msg-content {
        word-wrap: break-word;
        line-height: 1.5;
      }

      /* Typing Indicator */
      .shifo-typing {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        align-self: flex-start;
      }

      .shifo-typing-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #9ca3af;
        animation: typing 1.4s infinite;
      }

      .shifo-typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .shifo-typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.7;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }

      /* Input Area */
      .shifo-chat-input-area {
        display: flex;
        padding: 12px;
        border-top: 1px solid #e5e7eb;
        background: white;
      }

      .shifo-chat-input {
        flex: 1;
        border: 1px solid #d1d5db;
        border-radius: 8px 0 0 8px;
        padding: 10px 12px;
        font-size: 14px;
        outline: none;
      }

      .shifo-chat-input:focus {
        border-color: #2563eb;
      }

      .shifo-chat-send-btn {
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 0 8px 8px 0;
        padding: 10px 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }

      .shifo-chat-send-btn:hover {
        background: #1d4ed8;
      }

      .shifo-chat-send-btn:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }

      /* Responsive */
      @media (max-width: 640px) {
        .shifo-chat-window {
          right: 10px;
          bottom: 80px;
          width: calc(100vw - 20px);
          height: calc(100vh - 100px);
        }

        .shifo-chat-btn {
          bottom: 15px;
          right: 15px;
          width: 56px;
          height: 56px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Toggle chat window
  window.toggleChat = function() {
    isOpen = !isOpen;
    const chatWindow = document.getElementById('shifo-chat-window');
    const button = document.getElementById('shifo-chat-button');
    
    if (isOpen) {
      chatWindow.style.display = 'flex';
      button.style.display = 'none';
      document.getElementById('shifo-chat-input').focus();
      scrollToBottom();
      // Mark messages as read
      messages.forEach(m => m.read = true);
      updateBadge();
    } else {
      chatWindow.style.display = 'none';
      button.style.display = 'flex';
    }
  };

  // Set language
  window.setLanguage = function(lang) {
    language = lang;
    document.querySelectorAll('.shifo-lang-btn').forEach((btn, index) => {
      const langs = ['UZ', 'RU', 'EN'];
      if (langs[index] === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  // Handle key press
  window.handleKeyPress = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Send message
  window.sendMessage = async function() {
    const input = document.getElementById('shifo-chat-input');
    const message = input.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addMessage(message, false);
    input.value = '';

    // Update user data
    updateUserData(message);

    // Show typing indicator
    showTyping();

    try {
      // Real-time typing delay - 1 soniya kutish (tabiiy suhbat uchun)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const res = await fetch('http://localhost:3000/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sessionId: sessionId,
          userInfo: {
            name: userData.name || undefined,
            phone: userData.phone || undefined,
            problem: userData.complaint || message,
            complaint: userData.complaint || message,
            duration: userData.duration || undefined
          }
        })
      });

      const data = await res.json();
      hideTyping();
      addMessage(data.reply, true);
      updateBadge();
    } catch (error) {
      hideTyping();
      addMessage('Uzr, server bilan bog\'lanishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.', true);
      console.error('Chat error:', error);
    }
  };

  // Add message to chat
  function addMessage(text, isBot) {
    const messagesDiv = document.getElementById('shifo-chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `shifo-msg ${isBot ? 'shifo-msg-bot' : 'shifo-msg-user'}`;
    msgDiv.innerHTML = `<div class="shifo-msg-content">${escapeHtml(text)}</div>`;
    messagesDiv.appendChild(msgDiv);
    
    messages.push({ text, isBot, id: Date.now(), read: isBot ? !isOpen : true });
    scrollToBottom();
    
    // Update badge if message is from bot and chat is closed
    if (isBot && !isOpen) {
      updateBadge();
    }
  }

  // Show typing indicator
  function showTyping() {
    isTyping = true;
    document.getElementById('shifo-typing-indicator').style.display = 'flex';
    scrollToBottom();
  }

  // Hide typing indicator
  function hideTyping() {
    isTyping = false;
    document.getElementById('shifo-typing-indicator').style.display = 'none';
  }

  // Scroll to bottom
  function scrollToBottom() {
    const messagesDiv = document.getElementById('shifo-chat-messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Update badge
  function updateBadge() {
    const badge = document.getElementById('shifo-chat-badge');
    const unreadCount = messages.filter(m => m.isBot && !m.read).length;
    if (unreadCount > 0 && !isOpen) {
      badge.style.display = 'flex';
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
    } else {
      badge.style.display = 'none';
    }
  }

  // Update user data from message
  function updateUserData(message) {
    // Extract phone
    const phoneMatch = message.match(/(\+?998\d{9}|90\d{9})/);
    if (phoneMatch) {
      let phone = phoneMatch[0];
      if (!phone.startsWith('+')) {
        phone = phone.startsWith('998') ? '+' + phone : '+998' + phone;
      }
      userData.phone = phone;
    }

    // Extract name (short text, only letters)
    if (message.length < 30 && /^[А-Яа-яА-ӯа-ӯA-Za-z\s]+$/i.test(message) && !message.match(/\d/)) {
      const nameMatch = message.match(/(?:ismim|menim ismim|men|mening ismim)\s+(.+)/i);
      if (nameMatch) {
        userData.name = nameMatch[1].trim();
      } else if (!phoneMatch) {
        userData.name = message.trim();
      }
    }

    // Extract complaint
    const diseaseKeywords = ['og\'riq', 'ogriq', 'kasal', 'shikoyat', 'dardi', 'simptom', 'alamat', 'bemor', 'bezovta', 'muammo'];
    if (diseaseKeywords.some(kw => message.toLowerCase().includes(kw))) {
      userData.complaint = message;
    }

    // Extract duration
    const durationMatch = message.match(/(\d+\s*(?:kundan|kun|haftadan|hafta|oydan|oy)\s*beri|\d+\s*(?:kun|hafta|oy)\s*davom)/i);
    if (durationMatch) {
      userData.duration = durationMatch[0];
    }
  }

  // Escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
