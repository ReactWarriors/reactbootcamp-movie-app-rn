import React from "react";
import { StyleSheet, Text, View, Button, Picker } from "react-native";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

// @inject(({ moviesPageStore }) => ({
//   moviesPageStore
// }))

@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
  static defaultProps = {
    optionsSortBy: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };

  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies, filters, onChangeFilters },
      optionsSortBy
    } = this.props;
    // console.log("movies", toJS(movies));
    return (
      <View style={styles.container}>
        {/* 
        <Picker
          selectedValue={filters.sort_by}
          style={{ height: 10, width: 100 }}
          onValueChange={(itemValue, itemindex) => {
            onChangeFilters({
              target: {
                name: "sort_by",
                value: itemValue
              }
            });
          }}
          mode="dropdown"
        >
          {optionsSortBy.map(option => (
            <Picker.Item label={option.label} value={option.value} />
          ))}
        </Picker>
        */}
        {isLoading ? (
          <Text>...loading</Text>
        ) : (
          movies.map(movie => <Text key={movie.id}>{movie.title}</Text>)
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff"
  }
});

export default MoviesScreen;
