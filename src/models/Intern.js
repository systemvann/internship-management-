import User from './User';
import { Timestamp } from 'firebase/firestore';

class Intern extends User {
  constructor({
    studentId = '',
    university = '',
    faculty = '',
    major = '',
    year = new Date().getFullYear(),
    gpa = 0,
    startDate = null,
    endDate = null,
    supervisorId = '',
    status = 'pending', // 'pending', 'active', 'completed', 'withdrawn'
    ...userData
  } = {}) {
    super({ ...userData, role: 'intern' });
    this.studentId = studentId;
    this.university = university;
    this.faculty = faculty;
    this.major = major;
    this.year = year;
    this.gpa = gpa;
    this.startDate = startDate;
    this.endDate = endDate;
    this.supervisorId = supervisorId;
    this.status = status;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      studentId: this.studentId,
      university: this.university,
      faculty: this.faculty,
      major: this.major,
      year: this.year,
      gpa: this.gpa,
      startDate: this.startDate,
      endDate: this.endDate,
      supervisorId: this.supervisorId,
      status: this.status,
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new Intern({
      ...User.fromFirebase(doc),
      studentId: data.studentId || '',
      university: data.university || '',
      faculty: data.faculty || '',
      major: data.major || '',
      year: data.year || new Date().getFullYear(),
      gpa: data.gpa || 0,
      startDate: data.startDate?.toDate() || null,
      endDate: data.endDate?.toDate() || null,
      supervisorId: data.supervisorId || '',
      status: data.status || 'pending',
    });
  }
}

export default Intern;
