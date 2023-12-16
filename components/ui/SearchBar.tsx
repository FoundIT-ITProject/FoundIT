import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.ResearchBar}>
      <View style={styles.Main}>
        <TextInput
          placeholder="What did you lose?"
          style={styles.Input}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <AntDesign name="search1" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ResearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  Main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    width: 269,
    height: 54,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
  },
  Input: {
    margin: 10,
  },
  ButtonSearch: {
    width: 44,
    height: 44,
  },
});

export default SearchBar;
