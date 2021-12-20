/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  // staff: ['admin', 'staff'],
  staff: ['staff'],
  user: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
