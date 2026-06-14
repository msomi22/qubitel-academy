function show(title, details = '') {
    if (window.__TV_DEBUG_ENABLED__ && window.__showTvDebug) {
      window.__showTvDebug(title, details);
      return;
    }
  
    const root = document.getElementById('root');
    if (root) {
      root.textContent = `${title}\n\n${details}`;
    }
  }
  
  async function importStep(label, importer) {
    show('TV Import Step', `Starting: ${label}`);
  
    try {
      const module = await importer();
  
      show('TV Import Step OK', `Loaded: ${label}`);
  
      return module;
    } catch (error) {
      show(
        'TV Import Step FAILED',
        [
          `Failed: ${label}`,
          '',
          'Message:',
          error && error.message ? String(error.message) : String(error),
          '',
          'Stack:',
          error && error.stack ? String(error.stack) : ''
        ].join('\n')
      );
  
      throw error;
    }
  }
  
  async function start() {
    show('TV Import Debug Started', 'Dynamic import diagnostics are running.');
  
    await importStep('styles/global.css', () => import('./styles/global.css'));
  
    const reactDomClient = await importStep('react-dom/client', () => import('react-dom/client'));
    const router = await importStep('react-router-dom', () => import('react-router-dom'));
    const appModule = await importStep('App.jsx', () => import('./App.jsx'));
  
    show('TV Before React Render', 'All core imports loaded. About to render App.');
  
    const rootElement = document.getElementById('root');
  
    if (!rootElement) {
      show('TV Root Missing', 'Could not find #root element.');
      return;
    }
  
    const root = reactDomClient.createRoot(rootElement);
    const React = await importStep('react', () => import('react'));
  
    root.render(
      React.createElement(
        router.BrowserRouter,
        null,
        React.createElement(appModule.default)
      )
    );
  
    show('TV React Render Called', 'React render was called from dynamic import debug file.');
  
    window.setTimeout(() => {
      const overlay = document.getElementById('tv-debug-overlay');
  
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 1500);
  }
  
  start().catch(() => {
    // Error already shown by importStep.
  });