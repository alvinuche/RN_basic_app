/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Modal,
  Image,
} from 'react-native';

import {
  Colors,
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<{
//   title: string;
// }> = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

interface GoalType {
  text: string;
  key: string;
}

const App = () => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const showModal = () => setIsVisible(!isVisible);

  const goalInputHandler = (text: string) => {
    setEnteredGoal(text);
  };
  const addGoaltHandler = () => {
    setGoals(prevGoals => [
      ...prevGoals,
      {text: enteredGoal, key: Math.random().toString()},
    ]);
    setEnteredGoal('');
  };

  const deleteGoalHandler = (id: string) => {
    const newGoals = goals.filter(goal => goal.key !== id);
    setGoals(newGoals);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sectionContainer}>
        {/* <Button title="Add New Goal" color="#125f80" onPress={showModal} /> */}

        <Modal
          transparent
          visible={isVisible}
          animationType="slide"
          onRequestClose={showModal}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.image}
              source={require('./assets/images/goal.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Your daily goal"
              placeholderTextColor="#fff"
              onChangeText={goalInputHandler}
              value={enteredGoal}
            />
            <View style={styles.modalBtn}>
              <View style={styles.button}>
                <Button title="Cancel" onPress={showModal} color="#f00" />
              </View>
              <View style={styles.button}>
                <Button
                  title="Add Goal"
                  onPress={() => {
                    addGoaltHandler();
                    showModal();
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.goalsContainer}>
          {goals.length > 0 ? (
            <>
              <Text style={styles.title}>Daily Goals</Text>
              <FlatList
                data={goals}
                // keyExtractor={item => item.key}
                renderItem={itemData => (
                  <View style={styles.goalItemBox}>
                    <ScrollView>
                      <Pressable
                        style={({pressed}) => pressed && styles.pressedItem}
                        android_ripple={{color: '#ccc'}}
                        onPress={() => deleteGoalHandler(itemData.item.key)}>
                        <Text style={styles.goalItem}>
                          {itemData.item.text.toUpperCase()}
                        </Text>
                      </Pressable>
                    </ScrollView>
                  </View>
                )}
              />
            </>
          ) : (
            <View style={styles.msgBox}>
              <Text style={styles.msg}>No data yet</Text>
            </View>
          )}
        </View>
        <View style={styles.addBtn}>
          <Button title="Add New Goal" color="#125f80" onPress={showModal} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
    // padding: 30,
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    position: 'relative',
    // flexDirection: 'column-reverse',
  },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  addBtn: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#125f80',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: '60%',
    marginHorizontal: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  image: {
    height: 100,
    width: 100,
    margin: 20,
  },
  modalBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '40%',
    marginHorizontal: 8,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 24,
    padding: 8,
    color: '#fff',
  },
  goalsContainer: {
    flex: 3,
    marginTop: 14,
  },
  goalItemBox: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#eee',
    borderLeftWidth: 5,
    borderLeftColor: '#00b3ff',
  },
  goalItem: {
    color: '#00b3ff',
    fontSize: 20,
    padding: 10,
    paddingLeft: 16,
  },
  msgBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    fontSize: 20,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default App;
