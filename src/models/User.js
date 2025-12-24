import { Timestamp } from 'firebase/firestore';

class User {
  constructor({
    id = '',
    email = '',
    firstName = '',
    lastName = '',
    phone = '',
    profileImage = '',
    role = 'intern', // 'intern', 'supervisor', or 'admin'
    isActive = true,
    createdAt = Timestamp.now(),
    updatedAt = Timestamp.now(),
    ...rest
  } = {}) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.profileImage = profileImage;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    
    // Store any additional fields
    Object.assign(this, rest);
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      profileImage: this.profileImage,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new User({
      id: doc.id,
      ...data,
      // Convert Firestore Timestamp to Date if needed
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    });
  }
}

export default User;
