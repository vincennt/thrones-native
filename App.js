import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
  Image,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { Portal } from "react-native-paper";
import { useState, useEffect } from "react";

export default function App() {
  const [characters, setCharacter] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    fetch("https://thronesapi.com/api/v2/Characters")
      .then((response) => response.json())
      .then((data) => setCharacter(data));
  }, []);
  if (characters === null) {
    return <Text>loading...</Text>;
  }
  return (
    <ScrollView
      horizontal
      disableIntervalMomentum={true}
      style={styles.container}
    >
      <FlatList
        style={styles.pad}
        horizontal
        data={characters}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={showModal}>
              <Modal visible={visible}>
                <Text>First name :{item.firstName}</Text>
                <Text>Title :{item.title}</Text>
                <Text>From : {item.family}</Text>
                <Pressable onPress={hideModal}>
                  <Text style={styles.para}>
                    Revenir a la liste des personnages
                  </Text>
                </Pressable>
              </Modal>
              <Text>{item.fullName}</Text>
              <Image
                style={styles.image}
                source={{ uri: item.imageUrl }}
              ></Image>
            </Pressable>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    padding: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  para: {
    textDecorationLine: "underline",
    fontSize: 40,
  },
  pad: {
    padding: 20,
  },
});
