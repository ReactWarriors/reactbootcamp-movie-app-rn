import React from "react";
import { View, Text, Button } from "react-native";
import { inject, observer } from "mobx-react";

@observer
class LoginScreen extends React.Component {
  componentWillUnmount() {
    console.log("unmount LoginScreen");
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>input username</Text>
        <Text>input password</Text>
        <Text>input repeat-password</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.push("movies");
          }}
        />
      </View>
    );
  }
}

export default LoginScreen;
