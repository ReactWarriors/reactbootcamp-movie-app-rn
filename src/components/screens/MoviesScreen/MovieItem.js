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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  image: {
    borderRadius: 20,
    width: "100%",
    height: 400,
    resizeMode: "cover"
  },
  title: {
    marginTop: 15
  }
});

export default MovieItem;
