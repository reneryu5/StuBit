import { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Create script 1
    const script1 = document.createElement('script');
    script1.text = `
      window.embeddedChatbotConfig = {
        chatbotId: "2tDs9RxSJKoH7U1nfUi80",
        domain: "www.chatbase.co"
      };
    `;
    document.head.appendChild(script1);

    // Create script 2
    const script2 = document.createElement('script');
    script2.src = 'https://www.chatbase.co/embed.min.js';
    script2.setAttribute('chatbotId', '2tDs9RxSJKoH7U1nfUi80');
    script2.setAttribute('domain', 'www.chatbase.co');
    script2.defer = true;
    document.head.appendChild(script2);

    // Clean up
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <div>
      {/* Container for the chatbot */}
      <div id="chatbot-container"></div>
    </div>
  );
};

export default Chatbot;