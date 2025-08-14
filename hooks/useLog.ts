import * as EXPOFS from 'expo-file-system';
import { InteractionManager } from 'react-native';
import { consoleTransport, fileAsyncTransport, logger } from 'react-native-logs';

let today = new Date();
let formattedDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + ('0' + today.getDate()).slice(-2);

const interactionManager = InteractionManager;
const log = logger.createLogger({
	//transport: __DEV__ ? consoleTransport : fileAsyncTransport,
	//severity: __DEV__ ? 'debug' : 'error',
	async: true,
	asyncFunc: interactionManager.runAfterInteractions,
	transport: [fileAsyncTransport, consoleTransport],
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3,
	},
	transportOptions: {
		FS: EXPOFS,
		fileName: `log_${formattedDate}.txt`,
		colors: {
			debug: 'white',
			info: 'blueBright',
			warn: 'yellowBright',
			error: 'redBright',
		},
	},
});

export const useLog = {
	debug: (text: string) => log.debug(text),
	info: (text: string) => log.info(text),
	warn: (text: string) => log.warn(text),
	error: (text: string) => log.error(text),
};
