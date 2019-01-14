import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { inject, observer } from "mobx-react";
import MovieItem from "./MovieItem";
import Filters from "./Filters";

@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies }
    } = this.props;
    return (
      <View style={styles.container}>
        <Filters />
        {isLoading ? (
          <Text>...loading</Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieItem item={item} />}
            keyExtractor={item => String(item.id)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  }
});

export default MoviesScreen;
