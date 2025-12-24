import User from './User';

class Admin extends User {
  constructor({
    employeeId = '',
    position = 'Administrator',
    department = 'Administration',
    permissions = {
      canManageUsers: true,
      canManageInterns: true,
      canManageSupervisors: true,
      canManageDocuments: true,
      canManageSystem: true,
    },
    ...userData
  } = {}) {
    super({ ...userData, role: 'admin' });
    this.employeeId = employeeId;
    this.position = position;
    this.department = department;
    this.permissions = { ...permissions };
  }

  toJSON() {
    return {
      ...super.toJSON(),
      employeeId: this.employeeId,
      position: this.position,
      department: this.department,
      permissions: { ...this.permissions },
    };
  }

  static fromFirebase(doc) {
    const data = doc.data();
    return new Admin({
      ...User.fromFirebase(doc),
      employeeId: data.employeeId || '',
      position: data.position || 'Administrator',
      department: data.department || 'Administration',
      permissions: {
        canManageUsers: data.permissions?.canManageUsers ?? true,
        canManageInterns: data.permissions?.canManageInterns ?? true,
        canManageSupervisors: data.permissions?.canManageSupervisors ?? true,
        canManageDocuments: data.permissions?.canManageDocuments ?? true,
        canManageSystem: data.permissions?.canManageSystem ?? true,
      },
    });
  }
}

export default Admin;
