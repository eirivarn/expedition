import { db } from '../firebase-config';


// Check if current user is an admin
const AdminUser = async (userId) => {
  const adminRole = await db.collection('roles').doc('eHpUakLV9o1r9zA6h6Qs').get();
  return adminRole.data().users.includes(userId);
};

export default AdminUser;
