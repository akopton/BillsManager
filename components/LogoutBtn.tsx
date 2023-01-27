import { signOut } from 'firebase/auth'
import { TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

export const LogoutBtn = (props: any) => {
  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => props.navigation.replace('LoginPage'))
      .catch(() => alert('Wystąpił błąd.'))
  }

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <SimpleLineIcons
        name="logout"
        size={20}
      />
    </TouchableOpacity>
  )
}
