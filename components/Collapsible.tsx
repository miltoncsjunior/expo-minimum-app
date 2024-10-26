import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Box, Text } from '@gluestack-ui/themed';
export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const theme = useColorScheme() ?? 'light';

	return (
		<Box>
			<TouchableOpacity style={styles.heading} onPress={() => setIsOpen(value => !value)} activeOpacity={0.8}>
				<Ionicons
					name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
					size={18}
					color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
				/>
				<Text>{title}</Text>
			</TouchableOpacity>
			{isOpen && <Box style={styles.content}>{children}</Box>}
		</Box>
	);
}

const styles = StyleSheet.create({
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: 24,
	},
});
