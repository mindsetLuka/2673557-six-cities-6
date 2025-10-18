import { Link } from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--not-found" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main" style={{ flex: 1 }}>
        <section className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center', padding: '48px 16px' }}>
            <h1 style={{ fontSize: 96, lineHeight: 1, margin: 0 }}>404</h1>
            <p style={{ fontSize: 20, marginTop: 8 }}>Not Found</p>
            <p style={{ marginTop: 24 }}>
              <Link to="/" className="button" style={{ textDecoration: 'underline' }}>Go to the main page</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFoundScreen;


