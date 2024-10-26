import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { useApi } from '@/hooks/useApi';
import { PostType } from '@/models/post.interface';
import { Box, Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
	const api = useApi;
	const [posts, setPosts] = useState<PostType[]>([]);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		api.getPosts()
			.then(data => {
				setPosts(data);
			})
			.catch(err => {
				setIsError(true);
			});
		return () => {};
	}, []);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={<Image source={require('@/assets/images/partial-react-logo.png')} style={styles.reactLogo} />}>
			<Box style={styles.titleContainer}>
				<Text>Dados da API!</Text>
				<HelloWave />
			</Box>
			<Box style={styles.stepContainer}>
				<Text>Usando axios</Text>
				{/* {isError ? (
					<Text>Erro ao carregar os dados</Text>
				) : (
					<FlatList
						data={posts}
						keyExtractor={item => String(item.id)}
						renderItem={({ item }) => <Text>{item.title}</Text>}
					/>
				)} */}

				{isError ? (
					<Text>Oop!!! Error getting posts</Text>
				) : (
					posts.map(post => (
						<Card key={post.id}>
							<VStack>
								<Heading size="md">{post.title}</Heading>
								<Text size="sm">{post.body}</Text>
							</VStack>
						</Card>
					))
				)}
			</Box>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
