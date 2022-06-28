import React, { useEffect, useState } from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Proposals from './Proposals';
import html2canvas from 'html2canvas';

const client = new GraphQLClient({
  url: 'https://hub.snapshot.org/graphql',
});

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const screenshot = () => {
    const screenshotTarget = document.body;
    html2canvas(screenshotTarget, { scale: 2 }).then((canvas) => {
      const date = new Date().toLocaleDateString();
      const base64image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.setAttribute('href', base64image);
      a.download = `jbx-snapshot-${date}.png`;
      a.click();
      a.remove();
    });
  };

  useEffect(() => {
    if (loaded) {
      screenshot();
    }
  }, [loaded]);

  return (
    <ClientContext.Provider value={client}>
      <main>
        <header>
          <div>
            <img src="assets/qr.png" alt="qr code" style={{ width: '10em' }} />
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
        <Proposals setLoaded={setLoaded} />
      </main>
      <div className="button-wrapper">
        <div className="view-more">Click Anywhere to View More</div>
      </div>
    </ClientContext.Provider>
  );
};

export default App;
