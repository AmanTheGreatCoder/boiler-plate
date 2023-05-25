import Routes from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';
import { PhoneNumberProvider } from 'contexts/PhoneNumberContext';
import { AzhaiAuthProvider } from 'contexts/AuthContext';
import Snackbar from 'components/Snackbar';
import './index.css';

const App = () => (
  <ThemeCustomization>
    <NavigationScroll>
      <AzhaiAuthProvider>
        <PhoneNumberProvider>
          <Routes />
          <Snackbar />
        </PhoneNumberProvider>
      </AzhaiAuthProvider>
    </NavigationScroll>
  </ThemeCustomization>
);

export default App;
