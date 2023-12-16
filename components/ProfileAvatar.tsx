import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../lib/firebaseConfig';
import { FIREBASE_DB } from '../lib/firebaseConfig';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';




interface FirebaseUser {
  Achternaam: string;
  Voornaam: string;
}


const ProfileAvatar = () => {
  const [userAchternaam, setUserAchternaam] = useState('');
  const [userVoornaam, setUserVoornaam] = useState('');
  const [avatarURL, setAvatarURL] = useState('');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (currentUser) {
          const userDocRef = doc(FIREBASE_DB, 'Users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data() as FirebaseUser;
            setUserAchternaam(userData.Achternaam || '');
            setUserVoornaam(userData.Voornaam || '');


            const formattedName = encodeURIComponent(`${userData.Voornaam} ${userData.Achternaam}`);


            const apiUrl = `https://ui-avatars.com/api/?name=${formattedName}`;
            setAvatarURL(apiUrl);
          }
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      }
    };


    fetchUserData();
  }, []);


  return (
    <View>
      {userAchternaam && userVoornaam ? (
        <View>
          <Text>User: {`${userVoornaam} ${userAchternaam}`}</Text>
          <Image
            source={{ uri: avatarURL }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};


export default ProfileAvatar;


