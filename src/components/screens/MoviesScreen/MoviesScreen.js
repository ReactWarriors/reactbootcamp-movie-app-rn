import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";
import { inject, observer } from "mobx-react";
import MovieItem from "./MovieItem";
import { Filters } from "./Filters";

// const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();

    this.state = {
      currentIndex: 0
    };
  }

  componentDidMount() {
    this.props.moviesPageStore.getMovies();

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        console.log(gesture.dx);
        if (gesture.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        }
      }
    });
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies }
    } = this.props;
    console.log(this.state.currentIndex);
    return (
      <View style={styles.container}>
        {/* 
        <Filters />
        */}
        {isLoading ? (
          <Text>...loading</Text>
        ) : (
          movies
            .map((item, index) => {
              if (index < this.state.currentIndex) {
                return null;
              }
              if (index === this.state.currentIndex) {
                return (
                  <Animated.View
                    key={String(item.id)}
                    style={[
                      { transform: this.position.getTranslateTransform() },
                      {
                        flex: 1,
                        position: "absolute",
                        top: 60,
                        left: 20,
                        width: SCREEN_WIDTH - 40
                      }
                    ]}
                    {...this.PanResponder.panHandlers}
                  >
                    <MovieItem item={item} />
                  </Animated.View>
                );
              } else {
                return (
                  <Animated.View
                    key={String(item.id)}
                    style={{
                      flex: 1,
                      position: "absolute",
                      top: 60,
                      left: 20,
                      width: SCREEN_WIDTH - 40
                    }}
                  >
                    <MovieItem item={item} />
                  </Animated.View>
                );
              }
            })
            .reverse()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  }
});

export default MoviesScreen;
