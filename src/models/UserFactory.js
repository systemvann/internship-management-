import Admin from './Admin';
import Intern from './Intern';
import Supervisor from './Supervisor';
import User from './User';

class UserFactory {
  static createUser(role, data = {}) {
    switch (role.toLowerCase()) {
      case 'admin':
        return new Admin(data);
      case 'supervisor':
        return new Supervisor(data);
      case 'intern':
        return new Intern(data);
      default:
        return new User(data);
    }
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return this.createUser(data.role || 'user', {
      id: doc.id,
      ...data,
    });
  }

  static createUserFromAuth(userCredential, additionalData = {}) {
    const { user } = userCredential;
    const userData = {
      id: user.uid,
      email: user.email,
      firstName: additionalData.firstName || '',
      lastName: additionalData.lastName || '',
      profileImage: user.photoURL || additionalData.profileImage || '',
      phone: user.phoneNumber || additionalData.phone || '',
      ...additionalData,
    };

    return this.createUser(additionalData.role || 'intern', userData);
  }
}

export default UserFactory;
