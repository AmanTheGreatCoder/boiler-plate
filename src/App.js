import Routes from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';
import Snackbar from 'components/Snackbar';
import './index.css';

const App = () => (
  <ThemeCustomization>
    <NavigationScroll>
      <Routes />
      <Snackbar />
    </NavigationScroll>
  </ThemeCustomization>
);

export default App;
