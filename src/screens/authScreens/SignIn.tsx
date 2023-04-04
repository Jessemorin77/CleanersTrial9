import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  "Sign In": undefined;
  "Sign Up": undefined;
};

type Props = StackScreenProps<RootStackParamList, "Sign In">;

const auth = getAuth();

const SignIn: React.FunctionComponent<Props> = ({ navigation }) => {
  const [value, setValue] = useState<{
    email: string;
    password: string;
    error: string;
  }>({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: "Sign In Error Line 48",
      });
    }
  }

  function handleEmailChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setValue({
      ...value,
      email: event.nativeEvent.text,
    });
  }

  function handlePasswordChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) {
    setValue({
      ...value,
      password: event.nativeEvent.text,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={value.email}
        onChange={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value.password}
        onChange={handlePasswordChange}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Sign Up")}
        >
          Sign Up
        </Text>
      </Text>
      {value.error ? <Text style={styles.errorText}>{value.error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "80%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10
  },
  signupText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default SignIn;