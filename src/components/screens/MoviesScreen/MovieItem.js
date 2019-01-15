import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
              item.poster_path}`
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1
  },
  image: {
    width: 300,
    height: 400,
    alignSelf: "stretch"
  },
  title: {
    marginTop: 15
  }
});

export default MovieItem;
