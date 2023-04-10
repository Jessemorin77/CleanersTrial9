import * as React from 'react';
import { Button } from 'react-native-paper';

const PaperButton = (props) => {
  const { title, onPress, size, position } = props;

  return (
    <Button  mode="contained" onPress={onPress} style={{width: size, position: position}}>
      {title}
    </Button>
  );
}

export default PaperButton;