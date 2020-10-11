import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;


const Dropdown = ({ changeOrdering }) => {
  const [ queryValue, setQueryValue ] = useState('latest');
  const handleChangeOrdering = (value) => {
    setQueryValue(value);
    changeOrdering(value);
  };
  return (
      <RNPickerSelect
          value={queryValue}
          onValueChange={(value) => handleChangeOrdering(value)}
          items={[
              { label: 'Latest repositories', value: 'latest' },
              { label: 'Highest rated repositories', value: 'highest' },
              { label: 'Lowest rated repositorues', value: 'lowest' },
          ]}
      />
  );
};
 

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <>
        <Dropdown changeOrdering={props.changeOrdering}/>
        <Searchbar
          placeholder="Search"
          onChangeText={props.onChangeSearch}
          value={props.searchQuery}
        />
      </>
    );
  }
  render = () => {
    const props = this.props;
    const repositoryNodes = props.repositories
    ? props.repositories.edges.map(edge => edge.node)
    : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.history.push(`/${item.id}`)}>
            <RepositoryItem item={item}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.9}
      />
    );
  };
}

const RepositoryList = () => {
  const [ ordering, setOrdering ] = useState({orderBy: 'CREATED_AT', orderDirection: 'DESC'});
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ debounceSearchQuery ] = useDebounce(searchQuery, 500);
  const { repositories, fetchMore } = useRepositories({
    ...ordering,
    searchKeyword: debounceSearchQuery,
    first: 6,
  });
  //console.log('sq:', searchQuery);
  //console.log('db:', debounceSearchQuery);
  const history = useHistory();

  const handleOrdering = (value) => {
    if (value == 'latest')
      setOrdering( {orderBy: 'CREATED_AT', orderDirection: 'DESC'});
    if (value == 'highest')
      setOrdering( {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
    if (value == 'lowest')
      setOrdering( {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
  };

  const onEndReach = () => {
    //console.log('End of the list reached');
    fetchMore();
  };

  return (
    <>
    <RepositoryListContainer 
          repositories={repositories} 
          history={history} 
          changeOrdering={handleOrdering}
          onChangeSearch={(query) => setSearchQuery(query)}
          onEndReach={onEndReach}
        />
    </>
        );
   
};

export default RepositoryList;