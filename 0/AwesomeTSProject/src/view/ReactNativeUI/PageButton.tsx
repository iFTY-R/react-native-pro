import React, { useRef, useState } from 'react';
import {
  Text,
  ScrollView,
  Button,
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const ButtonAnimations = () => {
  const bounceAnimRef = useRef<Animatable.View | null>(null);
  const flashAnimRef = useRef<Animatable.View | null>(null);
  const jelloAnimRef = useRef<Animatable.View | null>(null);
  const pulseAnimRef = useRef<Animatable.View | null>(null);
  const rubberBandAnimRef = useRef<Animatable.View | null>(null);
  const shakeAnimRef = useRef<Animatable.View | null>(null);
  const swingAnimRef = useRef<Animatable.View | null>(null);
  const tadaAnimRef = useRef<Animatable.View | null>(null);
  const wobbleAnimRef = useRef<Animatable.View | null>(null);
  return (
    <PageItem
      header="Button Animations"
      content={
        <>
          <View>
            <Animatable.View
              // @ts-ignore
              ref={bounceAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#1289a7' }]}
                onPress={() => {
                  bounceAnimRef.current?.bounce!(800);
                }}>
                <Text style={styles.animButtonText}>Bounce</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={flashAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#eb4d4d' }]}
                onPress={() => {
                  flashAnimRef.current?.flash!(800);
                }}>
                <Text style={styles.animButtonText}>Flash</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={jelloAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#30336b' }]}
                onPress={() => {
                  jelloAnimRef.current?.jello!(800);
                }}>
                <Text style={styles.animButtonText}>Jello</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={pulseAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#f0832b' }]}
                onPress={() => {
                  pulseAnimRef.current?.pulse!(800);
                }}>
                <Text style={styles.animButtonText}>Pulse</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={rubberBandAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton]}
                onPress={() => {
                  rubberBandAnimRef.current?.rubberBand!(800);
                }}>
                <Text style={styles.animButtonText}>rubberBand</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={shakeAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#be2edd' }]}
                onPress={() => {
                  shakeAnimRef.current?.shake!(800);
                }}>
                <Text style={styles.animButtonText}>Shake</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={swingAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#b33771' }]}
                onPress={() => {
                  swingAnimRef.current?.swing!(800);
                }}>
                <Text style={styles.animButtonText}>Swing</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={tadaAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#bdc581' }]}
                onPress={() => {
                  tadaAnimRef.current?.tada!(800);
                }}>
                <Text style={styles.animButtonText}>Tada</Text>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              // @ts-ignore
              ref={wobbleAnimRef}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={[styles.animButton, { backgroundColor: '#4b4b4b' }]}
                onPress={() => {
                  wobbleAnimRef.current?.wobble!(800);
                }}>
                <Text style={styles.animButtonText}>Wobble</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </>
      }
    />
  );
};

export default function PageInput() {
  const btnPress = (val: string = ''): void => {
    Alert.alert('Submit Button Pressed', `${val}`);
  };
  const [submitSpinner, setSubmitSpinner] = useState(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={basePageStyle.page}>
      <Text style={basePageStyle.pageTitle}>Button</Text>
      <PageItem
        header="Simple Button"
        content={
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button title="Submit" onPress={() => btnPress('')} />
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={styles.blockButton}
                onPress={() => btnPress('Block Button -> Checkout Button')}>
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
                  Block Button
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.roundedButton}
                onPress={() => btnPress('Rounded Button -> Checkout Button')}>
                <Text
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                  Rounded Button
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <PageItem
        header="Colored Button"
        content={
          <>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.btnLabel}>Small Button:</Text>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => btnPress('Colored Button -> Small Button')}>
                <Text style={styles.smallButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.btnLabel}>Medium Button:</Text>
              <TouchableOpacity
                style={styles.mediumButton}
                onPress={() => btnPress('Colored Button -> Medium Button')}>
                <Text style={styles.mediumButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={styles.btnLabel}>Large Button:</Text>
              <TouchableOpacity
                style={styles.largeButton}
                onPress={() => btnPress('Colored Button -> Large Button')}>
                <Text style={styles.largeButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <PageItem
        header="Gradient Button"
        content={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.btnLabel}>Button with Opacity</Text>
              <TouchableOpacity
                onPress={() => btnPress('Button width Opacity')}>
                <LinearGradient
                  colors={['#24c6dc', '#514a9d']}
                  style={styles.gradientButton}>
                  <Text style={styles.gradientButtonText}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.btnLabel}>Button without Opacity</Text>
              <TouchableOpacity
                onPress={() => btnPress('Button without Opacity')}>
                <LinearGradient
                  colors={['#4776e6', '#8e54e9']}
                  style={styles.gradientButton}>
                  <Text style={styles.gradientButtonText}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <PageItem
        header="Bordered Button"
        content={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={styles.logoutBorderedButton}
                onPress={() => btnPress('Bordered Button -> Logout Button')}>
                <Text
                  style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signInBorderedButton}
                onPress={() => btnPress('Bordered Button -> Sign In Button')}>
                <Text
                  style={{ fontSize: 20, fontWeight: '500', color: '#fff' }}>
                  Sign
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <PageItem
        header="Button With Icon & Spinner"
        content={
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.buttonWithIcon}
                onPress={() => setSubmitSpinner(!submitSpinner)}>
                <Icon
                  name="shopping-cart"
                  type="font-awesome"
                  size={28}
                  color="#fff"
                  tvParallaxProperties={undefined}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginHorizontal: 12,
                    color: '#fff',
                    fontWeight: '500',
                  }}>
                  Add to Cart
                </Text>
                {submitSpinner ? (
                  <ActivityIndicator
                    style={{ marginLeft: 10 }}
                    color="#fff"
                    size="small"
                  />
                ) : null}
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <PageItem
        header="Icon Button"
        content={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#c3c3c3',
                paddingVertical: 10,
              }}>
              <Text style={styles.btnMiniLabel}>Bordered Icon Button:</Text>
              <TouchableOpacity
                style={styles.bicOpacity}
                onPress={() => btnPress('Icon Button -> Bordered Icon Button')}>
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="red"
                  size={26}
                  tvParallaxProperties={undefined}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#c3c3c3',
                paddingVertical: 10,
              }}>
              <Text style={styles.btnMiniLabel}>Solid Icon Button:</Text>
              <TouchableOpacity
                style={styles.sicOpacity}
                onPress={() => btnPress('Icon Button -> Solid Icon Button')}>
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="#fff"
                  size={26}
                  tvParallaxProperties={undefined}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#c3c3c3',
                paddingVertical: 10,
              }}>
              <Text style={styles.btnMiniLabel}>
                Bordered Icon Round Button:
              </Text>
              <TouchableOpacity
                style={styles.bicrButtons}
                onPress={() =>
                  btnPress('Icon Button -> Bordered Icon Round Button')
                }>
                <Icon
                  name="times"
                  type="font-awesome"
                  color="#000"
                  size={26}
                  tvParallaxProperties={undefined}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#c3c3c3',
                paddingVertical: 10,
              }}>
              <Text style={styles.btnMiniLabel}>Solid Icon Round Button:</Text>
              <TouchableOpacity
                style={styles.sicrButtons}
                onPress={() =>
                  btnPress('Icon Button -> Solid Icon Round Button')
                }>
                <Icon
                  name="plus"
                  type="font-awesome"
                  color="#fff"
                  size={26}
                  tvParallaxProperties={undefined}
                />
              </TouchableOpacity>
            </View>
          </>
        }
      />
      <ButtonAnimations />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 18,
    color: '#000',
    textAlignVertical: 'center',
    marginRight: 15,
  },
  btnMiniLabel: {
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'center',
    marginRight: 15,
  },
  smallButton: {
    backgroundColor: '#05c46b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mediumButton: {
    backgroundColor: '#3c40c6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  mediumButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  largeButton: {
    backgroundColor: '#ef5777',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  largeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  gradientButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoutBorderedButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2c3a47',
  },
  signInBorderedButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6d214f',
    backgroundColor: '#b33771',
  },
  blockButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#ee5a24',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
  roundedButton: {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: '#1b9cfc',
    borderRadius: 1000,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonWithIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fc427b',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  bicOpacity: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  sicOpacity: {
    backgroundColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  bicrButtons: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  sicrButtons: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  animButton: {
    backgroundColor: '#0652dd',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  animButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
});
