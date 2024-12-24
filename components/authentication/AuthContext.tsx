import { useLog } from '@/hooks/useLog';
import { useStorageState } from '@/hooks/useStorageState';
import * as DeviceInfo from 'expo-device';
import { createContext, PropsWithChildren, useContext } from 'react';

const AuthContext = createContext<{
	signIn: () => void;
	signOut: () => void;
	session?: string | null;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
});

// This hook can be used to access the user info.
export function useSession() {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			const msgError = 'useSession não pode ser utilizado sem a <SessionProvider />';
			useLog.error(msgError);
			throw new Error(msgError);
		}
	}

	return value;
}

export function SessionProvider(props: PropsWithChildren) {
	const [[session], setSession] = useStorageState('session');
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
					//TODO: Get device IMEI
					//useLog.info('Device id: ' + DeviceInfo.getDeviceId() + ' ...');
					useLog.info('Device manufacturer: ' + DeviceInfo.manufacturer + ' ...');
					useLog.info('Device model: ' + DeviceInfo.modelName + ' ...');
					useLog.info('Device type: ' + DeviceInfo.deviceType + ' ...');
					useLog.info('Device operating system: ' + DeviceInfo.osName + ' ...');
					useLog.info('Device operating system version: ' + DeviceInfo.osVersion + ' ...');
				},
				signOut: () => {
					setSession(null);
					useLog.info('Signed out...');
				},
				session,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}
