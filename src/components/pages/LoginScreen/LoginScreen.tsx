import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormEvent, useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { RootState, AppDispatch } from '../../../store';
import { login } from '../../../store/action';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const authorizationStatus = useSelector((state: RootState) => state.data.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError(null);

    if (!password.trim()) {
      setError('Password cannot be empty or contain only spaces');
      return;
    }

    dispatch(login(email, password))
      .then(() => {
        navigate(AppRoute.Main);
      })
      .catch((err: unknown) => {
        if (err && typeof err === 'object' && 'response' in err) {
          const axiosError = err as AxiosError<{ message?: string }>;
          if (axiosError.response?.status === 400) {
            setError(axiosError.response?.data?.message || 'Invalid email or password');
          } else {
            setError('Failed to login. Please try again.');
          }
        } else {
          setError('Failed to login. Please try again.');
        }
      });
  };

  return (
    <div className="page page--gray page--login">
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

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              {error && (
                <div className="login__error" style={{ color: 'red', marginBottom: '10px' }}>
                  {error}
                </div>
              )}
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


