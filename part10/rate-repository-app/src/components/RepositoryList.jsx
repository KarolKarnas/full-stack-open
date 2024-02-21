import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { filters } from '../utils/constants';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.textSecondary,
	},
	filterPicker: {
		backgroundColor: theme.colors.transparent,
	},
	searchInput: {
		borderColor: theme.colors.primary,
		borderWidth: 1,
		padding: 10,
	},
	searchInputFocus: {
		borderWidth: 3,
	},
});

export const RepositoryListContainer = ({
	repositories,
	filter,
	setFilter,
	setSearchKeyword,
	onEndReach,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const navigate = useNavigate();

	const ItemSeparator = () => <View style={styles.separator} />;
	const renderItem = ({ item }) => (
		<Pressable onPress={() => navigate(`/repository/${item.id}`)}>
			<RepositoryItem item={item} />
		</Pressable>
	);

	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<>
			<Picker
				style={styles.filterPicker}
				selectedValue={filter}
				onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
			>
				<Picker.Item label='Latest repositories' value={filters.latest} />
				<Picker.Item
					label='Highest rated repositories'
					value={filters.highestRated}
				/>
				<Picker.Item
					label='Lowest rated repositories'
					value={filters.lowestRated}
				/>
			</Picker>
			<FlatList
				data={repositoryNodes}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={ItemSeparator}
				ListHeaderComponent={
					<TextInput
						style={[styles.searchInput, isFocused && styles.searchInputFocus]}
						onFocus={() => setIsFocused(true)}
						placeholder='search'
						onChangeText={(value) => setSearchKeyword(value)}
					/>
				}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
			/>
		</>
	);
};

const RepositoryList = () => {
	const [filter, setFilter] = useState(filters.lowestRated);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [value] = useDebounce(searchKeyword, 500);

	const { repositories, fetchMore } = useRepositories({
		...filter,
		searchKeyword: value,
		first: 1,
	});

	const onEndReach = () => {
		fetchMore();
	};

	return (
		<RepositoryListContainer
			repositories={repositories}
			filter={filter}
			setFilter={setFilter}
			searchKeyword={searchKeyword}
			setSearchKeyword={setSearchKeyword}
			onEndReach={onEndReach}
		/>
	);
};

export default RepositoryList;
