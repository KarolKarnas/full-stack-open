import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.textSecondary,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
	const navigate = useNavigate();


	const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  )

	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={ItemSeparator}
		/>
	);
};

const RepositoryList = () => {
	const { repositories } = useRepositories();

	return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
