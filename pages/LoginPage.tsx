import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { auth } from '../firebase'
import { globalStyles } from '../styles/global'

export const LoginPage = ({ route, navigation }: any) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<{
    isEmailValid: boolean
    isPasswordValid: boolean
  }>({
    isEmailValid: false,
    isPasswordValid: false,
  })

  const handleSignUp = () => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        const user = userCredentials.user
        console.log(user.email)
        setIsLoading(false)
      })
      .catch((err) => alert(err))
  }

  const handleLogIn = () => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        const user = userCredentials.user
        console.log(`Logged in with ${user.email}`)
        navigation.replace('HomeScreen')
        setIsLoading(false)
      })
      .catch(() => {
        alert('Wprowadzono zły email lub hasło')
        setIsLoading(false)
      })
  }

  const handleEmail = (input: string) => {
    setEmail(input)
  }

  const handlePassword = (input: string) => {
    setPassword(input)
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.page}
      behavior="padding"
    >
      <View>
        <TextInput
          placeholder={'Email'}
          style={styles.input}
          value={email}
          onChangeText={handleEmail}
        />
        <TextInput
          placeholder={'Password'}
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={handlePassword}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogIn}
        >
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 15,
    borderRadius: 20,
  },
  button: {
    alignSelf: 'center',
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
  },
})
