import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  LayoutAnimation,
  Modal,
  Image,
} from 'react-native';
import { ToDo } from '../types';
import { Card, Text } from 'react-native-paper';
import { useAppContext } from '../App.provider';
import { Swipeable } from 'react-native-gesture-handler';
import { theme } from '../theme';
import { FlashList } from '@shopify/flash-list';

type TodoListItemRowProps = {
  item: ToDo;
  handleModalVisible: (visible: boolean) => void;
};
const springAnimation = {
  duration: 1400,
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.4,
  },
};
const imgSrc = require('../assets/bin.png');

export const TodoListItemRow: React.FC<TodoListItemRowProps> = ({
  item,
  handleModalVisible,
}) => {
  const appContext = useAppContext();
  const handlePress = React.useCallback(() => {
    list.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(springAnimation);
    appContext.handleDeleteTodo(item.timestamp);
  }, [appContext, item]);
  const swipeableRef = useRef<Swipeable | null>(null);
  const handleSwipeableRightOpen = React.useCallback(() => {
    swipeableRef?.current?.close();
    handlePress();
  }, [handlePress]);
  const [modalVisible, setModalVisible] = useState(false);
  const list = useRef<FlashList<number> | null>(null);

  const updateModalVisibility = useCallback(
    (value: boolean) => {
      setModalVisible(value);
      handleModalVisible(value);
    },
    [handleModalVisible],
  );
  return (
    <Swipeable
      ref={swipeable => (swipeableRef.current = swipeable)}
      friction={2}
      rightThreshold={80}
      renderRightActions={() => (
        <View style={styles.deleteBackground}>
          <Image source={imgSrc} style={styles.deleteIcon} />
        </View>
      )}
      onSwipeableWillOpen={handleSwipeableRightOpen}>
      <Card
        style={styles.container}
        onPress={useCallback(
          () => updateModalVisibility(true),
          [updateModalVisibility],
        )}>
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>{item.header}</Text>
          <Text style={styles.timestampText}>
            {new Date(item.timestamp).toDateString()}
          </Text>
          <Pressable hitSlop={16} onPress={handlePress}>
            <Text style={styles.headerText}>Delete</Text>
          </Pressable>
        </View>
      </Card>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.heading}>
            <Text style={styles.modalHeader}>{item.header}</Text>
            <Pressable
              onPress={() => updateModalVisibility(false)}
              style={styles.closeModalBtn}>
              <Text style={styles.closeModalBtnText}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.todoDetailsRow}>
            <Text style={[styles.todoDetailsItem, styles.todoDetailsLabel]}>
              Complete on:
            </Text>
            <Text style={styles.todoDetailsItem}>
              {new Date(item.timestamp).toDateString()}
            </Text>
          </View>
          <View style={styles.todoDetailsRow}>
            <Text style={[styles.todoDetailsItem, styles.todoDetailsLabel]}>
              Additional details:
            </Text>
            <Text style={styles.todoDetailsItem}>{item.text}</Text>
          </View>
        </View>
      </Modal>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#222e40',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#ebedf0',
  },
  timestampText: {
    color: '#ebedf0',
    fontWeight: 'bold',
  },
  deleteBackground: {
    backgroundColor: '#e40c0c',
    width: 200,
    height: 57,
    alignSelf: 'center',
    marginRight: 20,
    borderRadius: 12,
    justifyContent: 'center',
  },
  deleteIcon: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    position: 'absolute',
    right: 12,
    tintColor: 'white',
  },
  modal: {
    margin: 0,
    marginTop: 350,
    marginBottom: 0,
    borderColor: theme.colorDarkGrey,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    padding: 12,
    flexDirection: 'row',
    borderBottomColor: theme.colorDarkGrey,
    borderBottomWidth: 1,
  },
  modalHeader: {
    flex: 5,
    color: theme.colorDarkGrey,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  closeModalBtn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  closeModalBtnText: {
    color: theme.colorDarkGrey,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  todoDetailsRow: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
  },
  todoDetailsItem: {
    flex: 1,
    color: theme.colorDarkGrey,
  },
  todoDetailsLabel: {
    fontWeight: 'bold',
  },
});
