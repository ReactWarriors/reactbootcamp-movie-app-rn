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
    console.log("this.position", this.position);
    this.state = {
      currentIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-4deg", "0deg", "4deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: "clamp"
    });

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          this.position.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        console.log(gestureState.dx);
        if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: {
              x: 0,
              y: 0
            }
          }).start();
        }
      }
    });
  }

  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies }
    } = this.props;
    console.log("render", this.state.currentIndex);
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
                      // {
                      //   transform: [
                      //     // {
                      //     //   rotate: this.rotate
                      //     // },
                      //     ...this.position.getTranslateTransform()
                      //   ]
                      // },
                      this.rotateAndTranslate,
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
                    style={[
                      { opacity: this.nextCardOpacity },
                      { transform: [{ scale: this.nextCardScale }] },
                      {
                        flex: 1,
                        position: "absolute",
                        top: 60,
                        left: 20,
                        width: SCREEN_WIDTH - 40
                      }
                    ]}
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
