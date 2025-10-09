import MainScreen from '../pages/MainScreen/MainScreen';

type AppProps = {
  offersCount: number;
}

function App({ offersCount }: AppProps): JSX.Element {
  return <MainScreen offersCount={offersCount} />;
}

export default App;


