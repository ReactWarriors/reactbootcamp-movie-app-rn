import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { inject, observer } from "mobx-react";

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

  handleChangeSortBy = value => {
    this.props.moviesPageStore.onChangeFilters({
      target: {
        name: "sort_by",
        value
      }
    });
  };

  render() {
    const {
      moviesPageStore: { filters },
      optionsSortBy
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.selectContainer}>
          <Text>Сортировка по:</Text>
          <RNPickerSelect
            placeholder={{
              label: "Выберите сортировку",
              value: null,
              color: "black"
            }}
            onValueChange={this.handleChangeSortBy}
            value={filters.sort_by}
            items={optionsSortBy}
            style={{ ...pickerSelectStyles }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  }
});

export default MoviesScreen;
