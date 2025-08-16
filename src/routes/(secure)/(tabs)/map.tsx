import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const markets = [
	{
		id: '1',
		name: 'Ponto 1',
		address: 'Av. Paulista, 1234',
		latitude: -23.561187293883442,
		longitude: -46.656451388116494,
	},
	{
		id: '2',
		name: 'Ponto 2',
		address: 'Av. Paulista, 1344',
		latitude: -23.561187293883442,
		longitude: -46.656451388116494,
	},
];

export default function MapScreen() {
	const [location, setLocation] = useState<Location.LocationObject | null>(null);

	async function getCurrentLocation() {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();

			if (granted) {
				const location = await Location.getCurrentPositionAsync();
				setLocation(location);
				console.log(JSON.stringify(location));
			} else {
				Alert.alert('Localização', 'Permissão de localização negada !');
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getCurrentLocation();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: '#ccc' }}>
			{location && (
				<MapView
					style={{ flex: 1 }}
					initialRegion={{
						latitude: -23.561187293883442, //location.coords.latitude,
						longitude: -46.656451388116494, //location.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}>
					<Marker
						identifier="current"
						image={require('@/assets/images/location.png')}
						coordinate={{
							latitude: -23.561187293883442, //location.coords.latitude,
							longitude: -46.656451388116494, //location.coords.longitude,
						}}
					/>

					{markets &&
						markets.map(market => (
							<Marker
								key={market.id}
								identifier={market.id}
								image={require('@/assets/images/pin.png')}
								coordinate={{
									latitude: market.latitude,
									longitude: market.longitude,
								}}>
								<Callout>
									<View>
										<Text
											style={{
												fontSize: 14,
											}}>
											{market.name}
										</Text>
										<Text
											style={{
												fontSize: 12,
											}}>
											{market.address}
										</Text>
									</View>
								</Callout>
							</Marker>
						))}
				</MapView>
			)}
		</View>
	);
}
