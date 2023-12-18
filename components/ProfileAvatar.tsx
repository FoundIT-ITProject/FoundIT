import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ firstName, lastName }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

 const generateBackgroundColor = (initials: string) => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33aaff', '#aaff33', '#ff33aa'];
    const charCodeSum = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = charCodeSum % colors.length;
    return colors[colorIndex];
  };
// calculates a color index based on  sum of the ASCII values of the initials
  const avatarColor = generateBackgroundColor(initials);
  return (
    <View style={styles.avatarContainer}>
         <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
           <Text style={styles.initials}>{initials}</Text>
         </View>
       </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
     width: 120,
     height: 120,
     borderRadius: 60,
     borderWidth: 1,
     borderColor: 'transparent',
     justifyContent: 'center',
     alignItems: 'center',
 marginTop: -40,

   },
  initials: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '800',
  },
avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,

  },

});
export default ProfileAvatar;
