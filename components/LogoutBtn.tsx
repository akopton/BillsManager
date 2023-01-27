import { signOut } from 'firebase/auth'
import { TouchableOpacity, Text } from 'react-native'
import { auth } from '../firebase'

export const LogoutBtn = (props: any) => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => props.navigation.replace('LoginPage'))
      .catch(() => alert('Wystąpił błąd.'))
  }

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <Text>Wyloguj się</Text>
    </TouchableOpacity>
  )
}
