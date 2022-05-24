import React, { useEffect, useState } from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Proposals from './Proposals';
import html2canvas from 'html2canvas';

const client = new GraphQLClient({
  url: 'https://hub.snapshot.org/graphql',
});

const App = () => {
  const [skip, setSkip] = useState(0);

  const screenshot = () => {
    const screenshotTarget = document.body;
    html2canvas(screenshotTarget).then((canvas) => {
      const date = new Date().toLocaleDateString();
      const base64image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.setAttribute('href', base64image);
      a.download = `jbx-snapshot-${date}.png`;
      setTimeout(() => {
        a.click();
        a.remove();
      }, 1000);
    });
  };

  const handleClick = () => {
    setSkip(skip + 10);
    screenshot();
  };

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    screenshot();
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <ClientContext.Provider value={client}>
      <main>
        <header>
          <div>
            <img
              src="assets/fake_qr.png"
              alt="qr code"
              style={{ width: '10em' }}
            />
            <a href="https://snapshot.org/#/jbdao.eth" target={'_blank'}>
              <img
                src="assets/jbx_logo_screenshot.png"
                alt="juicebox logo"
                style={{ width: '8em' }}
              />
            </a>
          </div>
          <h1>JuiceboxDAO Open Proposals</h1>
        </header>
        <Proposals skip={skip} />
      </main>
      <div className="button-wrapper">
        <div className="view-more" onClick={handleClick}>
          Click Anywhere to View More
        </div>
      </div>
    </ClientContext.Provider>
  );
};

export default App;
