import { deleteDoc, doc } from 'firebase/firestore'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { db } from '../firebase'
import { deleteBill } from '../firebase/deleteBill'
import { TBill } from '../types/Bill'

export const CustomPopup = (props: any) => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      `Deleting bill ${props.content.name}.`,
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteItem(props.content),
          style: 'destructive',
        },
      ]
    )

  const deleteItem = async (bill: TBill) => {
    hideModal()
    await deleteBill(bill)
  }

  const hideModal = () => {
    props.setPopup({ show: false, content: {} })
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={props.popup.show}
        transparent={true}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose action</Text>
            <TouchableOpacity style={[styles.button]}>
              <View style={{ flexBasis: '60%' }}>
                <Text style={styles.textStyle}>Edit</Text>
              </View>
              <View
                style={{
                  flexBasis: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Entypo
                  name="new-message"
                  size={20}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={createTwoButtonAlert}
            >
              <View style={{ flexBasis: '60%' }}>
                <Text style={styles.textStyle}>Delete</Text>
              </View>
              <View
                style={{
                  flexBasis: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5
                  name={'trash-alt'}
                  solid
                  size={20}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={{ flex: 1 }}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 20,
    zIndex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    width: 150,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
})
