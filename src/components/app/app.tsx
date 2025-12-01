import { MainPage } from '../../pages/main-page/main-page';
type AppProps = {
  placesCount: number;
};

export const App = ({placesCount}: AppProps) => <MainPage placesCount={placesCount}/>;
