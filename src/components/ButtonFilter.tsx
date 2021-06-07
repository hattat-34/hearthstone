import * as React from 'react';
import { memo } from 'react';
import { ScrollView, View } from 'react-native';
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
      <ScrollView style={{ marginVertical: 10 }}showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: "wrap" }}>
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
        style={{ borderRadius: 15, borderWidth: 2, marginVertical: 5 }}
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


  //   <FlatList
  //     contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: "wrap" }}
  //     keyExtractor={(item, index) => item + index}
  //     data={keys}
  //     renderItem={renderButton}
  //   />
  // )

  // function renderButton({ item }: { item: string }) {
  //   return (
  //     <Button
  //       key={item}
  //       mode='contained'
  //       color={status === item ? 'blue' : 'white'}
  //       onPress={() => setStatus(item)}
  //     >
  //       {item}
  //     </Button>
  //   )
  // }
};

export default memo(ButtonFilter)