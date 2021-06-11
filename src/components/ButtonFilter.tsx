import * as React from 'react';
import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface ButtonFilterProps {
  keys: string[]
  onPick: (result: string) => void;
}

const ButtonFilter = ({ keys, onPick }: ButtonFilterProps) => {
  const [status, setStatus] = React.useState("");

  return (
    <>
      {
        renderButton("All")
      }
      <ScrollView style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.buttonContainer}>
          {
            keys.map((title) => renderButton(title))
          }
        </View>
      </ScrollView>
    </>
  )

  function renderButton(title: string) {
    return (
      <Button
        style={styles.button}
        key={title}
        mode='contained'
        color={status === title ? 'black' : 'white'}
        onPress={() => {
          setStatus(title)
          onPick(title)
        }}
      >
        {title}
      </Button>
    )
  }
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: "wrap"
  },
  button: {
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 5
  },
})

export default memo(ButtonFilter)