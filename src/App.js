// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';
import './index.css'

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import { PhoneNumberProvider } from 'contexts/PhoneNumberContext';
import { AzhaiAuthProvider } from 'contexts/AzhaiAuthContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => (
    <ThemeCustomization>
        {/* RTL layout */}
        <RTLLayout>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <AzhaiAuthProvider>
                            <PhoneNumberProvider>
                                <>
                                    <Routes />
                                    <Snackbar />
                                </>
                            </PhoneNumberProvider>
                        </AzhaiAuthProvider>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </RTLLayout>
    </ThemeCustomization>
);

export default App;
