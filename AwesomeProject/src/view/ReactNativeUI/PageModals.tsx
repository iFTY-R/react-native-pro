import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ToastAndroid,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PageItem, { basePageStyle } from './components/PageItem';
import RNModal from 'react-native-modal';

const ModalDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.btnOpacity}
        onPress={() => setModalVisible((prev) => !prev)}>
        <Text style={styles.btnText}>Open Modal(原生)</Text>
      </TouchableOpacity>
      {/*Modal*/}
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={[styles.centeredView, { marginTop: -200 }]}>
            <View style={styles.modalView}>
              {/*title and actions*/}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Modal Title
                </Text>
                <TouchableOpacity
                  style={{ paddingHorizontal: 4 }}
                  onPress={() => setModalVisible((prev) => !prev)}>
                  <Icon name="close" tvParallaxProperties={undefined} />
                </TouchableOpacity>
              </View>
              {/*content*/}
              <View>
                <Text style={{ marginTop: 10 }}>
                  习近平：我们沉痛悼念江泽民同志，将化悲痛为力量，按照中共二十大的部署，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴而团结奋斗。
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const ModalRN = () => {
  const [rnmodalVisible, setRNModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={[
          styles.btnOpacity,
          { backgroundColor: '#2d2d2d', marginTop: 10 },
        ]}
        onPress={() => setRNModalVisible((prev) => !prev)}>
        <Text style={styles.btnText}>Open Modal(RNModal)</Text>
      </TouchableOpacity>
      {/*Modal*/}
      <RNModal
        isVisible={rnmodalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.rnmodalView}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Modal Title</Text>
          <Text style={{ marginVertical: 10 }}>
            习近平：我们沉痛悼念江泽民同志，将化悲痛为力量，按照中共二十大的部署，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴而团结奋斗。
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setRNModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setRNModalVisible(false)}>
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </>
  );
};

const ToastDemo = () => {
  return (
    <TouchableOpacity
      style={styles.btnOpacity}
      onPress={() => {
        ToastAndroid.show('This is a toast', 2000);
      }}>
      <Text style={styles.btnText}>Show Toast</Text>
    </TouchableOpacity>
  );
};

export default function PageModals() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Modals & Toasts</Text>
      <PageItem
        header="Modals"
        content={
          <>
            <View>
              <ModalDemo />
              <ModalRN />
            </View>
          </>
        }
      />
      <PageItem
        header="Toasts"
        content={
          <>
            <View>
              <ToastDemo />
            </View>
          </>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnOpacity: {
    backgroundColor: '#222f3e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  //
  rnmodalView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.5,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#222f3e',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 2,
    shadowRadius: 3.5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
