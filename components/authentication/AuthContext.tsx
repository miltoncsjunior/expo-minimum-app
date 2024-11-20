import { useLog } from '@/hooks/useLog';
import { useStorageState } from '@/hooks/useStorageState';
import { createContext, PropsWithChildren, useContext } from 'react';
import DeviceInfo from 'react-native-device-info';

const AuthContext = createContext<{
	signIn: () => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			const msgError = 'useSession must be used within a <SessionProvider />';
			useLog.error(msgError);
			throw new Error(msgError);
		}
	}

	return value;
}

export function SessionProvider(props: PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');
	return (
		<AuthContext.Provider
			value={{
				signIn: () => {
					// Add your login logic here
					// For example purposes, we'll just set a fake session in storage
					//This likely would be a JWT token or other session data
					useLog.info('Sign in...');
					setSession('John Doe');
					useLog.info('Signed in as John Doe...');
					useLog.info('Device id: ' + DeviceInfo.getDeviceId() + ' ...');
					useLog.info('Device manufacturer: ' + DeviceInfo.getBrand() + ' ...');
					useLog.info('Device model: ' + DeviceInfo.getModel() + ' ...');
					useLog.info('Device type: ' + DeviceInfo.getDeviceType() + ' ...');
					useLog.info('Device operating system: ' + DeviceInfo.getSystemName() + ' ...');
					useLog.info('Device operating system version: ' + DeviceInfo.getSystemVersion() + ' ...');
				},
				signOut: () => {
					setSession(null);
					useLog.info('Signed out...');
				},
				session,
				isLoading,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}
