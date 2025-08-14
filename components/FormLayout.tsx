import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<object>;

export default function ParallaxScrollView({ children }: Props) {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
});
