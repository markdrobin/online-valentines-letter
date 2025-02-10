import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEnvelopeHidden, setIsEnvelopeHidden] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * 200 - 100; // Random value between -100 and 100
      const randomY = Math.random() * 200 - 100; // Random value between -100 and 100
      setNoButtonStyle({
        transform: `translate(${randomX}px, ${randomY}px)`,
      });
    }, 500); // Update position every 500ms

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Caveat']
      }
    });
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      'No',
      'Are you sure?',
      'Pretty please',
      'With a red velvet cheesecake on top',
      'What about a cinnamon honey oat latte?',
      'PLEASE BEBIII',
      'But 🥲',
      'I\'m going to die',
      'Yes i\'m dead',
      'ok ur talking to mark\'s ghost',
      'please bebu',
      '🥹',
      'PRETTY PLEASE',
      'No 🥶',
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleEnvelopeClick = () => {
    setIsLetterOpen(true);

    setTimeout(() => {
      setIsEnvelopeHidden(true);
    }, 1500); // Duration of the fade-in animation
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4 overflow-hidden w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        {isLetterOpen && (
          <div
            id="letter"
            className="absolute left-1/2 top-1/2 w-[300px] md:w-[500px] aspect-[1/1.4] bg-[#FFB6C1] rounded-lg shadow-lg md:py-16 md:px-12 flex flex-col gap-6 fade-in"
            style={{opacity: 1, willChange: 'auto', transform: 'translateX(-50%) translateY(-50%)'}}>
            {yesPressed ? (
              <>
                <div className="space-y-4 p-4" style={{opacity: 1, willChange: 'auto', transform: 'none'}}>
                  <h1 className="text-[#E74C3C] text-4xl md:text-6xl font-extrabold" style={{lineHeight: 1.2}}>
                    YAAAAAY!!!<br/>Labyuuuu beb!!
                  </h1>
                </div>
                <img src="https://media.tenor.com/2x0LhnZBnGsAAAAj/capoo-cat.gif" className="h-auto w-10/12"/>
                {/*<div className="my-4 text-4xl font-bold">YAAAY!!! Labyuuuu beeeb!! </div>*/}
              </>
            ) : (
              <>
                <div className="space-y-4 p-4" style={{opacity: 1, willChange: 'auto', transform: 'none'}}>
                  <h1 className="text-[#E74C3C] text-4xl md:text-6xl font-extrabold" style={{lineHeight: 1.2}}>
                    Will you<br/>be my<br/>valentine?
                  </h1>
                </div>
                <div className="space-y-4 flex flex-col items-center relative flex-1"
                     style={{opacity: 1, willChange: 'auto', transform: 'none'}}>
                  <button
                    className="bg-[#E74C3C] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg md:text-xl font-bold hover:bg-[#D64434] transition-colors"
                    onClick={() => setYesPressed(true)}
                    style={{fontSize: yesButtonSize}}
                  >
                    YES!
                  </button>
                  <div style={{willChange: 'auto', opacity: 1}}>
                    <button
                      className="text-[#E74C3C] text-xs md:text-sm rounded-lg px-3 md:px-4 py-1.5 md:py-2 bg-white transition-transform duration-300"
                      onClick={handleNoClick}
                      style={noCount > 0 ? noButtonStyle : {}}
                    >
                      {noCount === 0 ? 'No' : getNoButtonText()}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {!isEnvelopeHidden && (
          <div
            id="envelope"
            className={`absolute left-1/2 top-1/2 w-full max-w-[700px] aspect-[1.4/1] bg-[#E74C3C] rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer transform -translate-x-1/2 transition-transform duration-3000 ${isLetterOpen ? 'slide-down' : '-translate-y-1/2'}`}
            style={{willChange: 'transform, opacity', opacity: 1}}
            onClick={handleEnvelopeClick}
          >
            <div
              className="absolute top-4 right-4 md:w-24 w-16 border-4 border-white p-1 rounded-lg shadow-lg border-dotted bg-white transform rotate-12">
              <img src="https://cdn-icons-png.flaticon.com/512/8208/8208768.png" alt="Curvy post card sticker"
                   className="w-full h-full object-contain rounded-lg border-2 border-dashed border-gray-300"/>
            </div>
            <span className="text-white text-3xl md:text-5xl"
                  style={{fontFamily: 'Caveat', fontWeight: 700}}>For Krisha</span>
          </div>
        )}
      </div>
    </div>
  );
}