import { FlatList, View, Text, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.textSecondary,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, data } = useRepositories();

	// Get the nodes from the edges array

	if (loading) {
		return <Text>Loading..</Text>
	}
	// console.log(repositories)
	const repositoryNodes = data
		? data.repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			renderItem={({ item }) => <RepositoryItem item={item} />}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={ItemSeparator}
		/>
	);
};

export default RepositoryList;
