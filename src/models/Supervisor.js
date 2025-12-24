import User from './User';

class Supervisor extends User {
  constructor({
    employeeId = '',
    position = '',
    department = '',
    maxInterns = 5, // Maximum number of interns they can supervise
    internIds = [], // Array of intern IDs they are supervising
    ...userData
  } = {}) {
    super({ ...userData, role: 'supervisor' });
    this.employeeId = employeeId;
    this.position = position;
    this.department = department;
    this.maxInterns = maxInterns;
    this.internIds = internIds;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      employeeId: this.employeeId,
      position: this.position,
      department: this.department,
      maxInterns: this.maxInterns,
      internIds: [...this.internIds],
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new Supervisor({
      ...User.fromFirebase(doc),
      employeeId: data.employeeId || '',
      position: data.position || '',
      department: data.department || '',
      maxInterns: data.maxInterns || 5,
      internIds: data.internIds || [],
    });
  }
}

export default Supervisor;
