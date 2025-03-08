import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

/* Sign Up */
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

/* Sign In */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error.message;
  }
};

/* Sign Out */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error.message;
  }
};

export default auth;
