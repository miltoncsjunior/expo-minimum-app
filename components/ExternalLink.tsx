import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href<string | object> };

export function ExternalLink({ href, ...rest }: Props) {
	return (
		<Link
			target="_blank"
			{...rest}
			href={href}
			onPress={async event => {
				// Prevent the default behavior of linking to the default browser on native.
				event.preventDefault();
				// Open the link in an in-app browser.
				await openBrowserAsync(href.toString());
			}}
		/>
	);
}
