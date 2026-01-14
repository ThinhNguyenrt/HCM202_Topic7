import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ⚠️ HƯỚNG DẪN LẤY CÁC GIÁ TRỊ:
// 1. Vào Firebase Console: https://console.firebase.google.com
// 2. Chọn project "HCM202"
// 3. Nhấp vào ⚙️ Project Settings (góc trên cùng)
// 4. Vào tab "General"
// 5. Tìm mục "Your apps" → tìm app Web (biểu tượng </>)
// 6. Copy toàn bộ firebaseConfig object
//
// HOẶC làm theo từng bước:
// - apiKey: Copy từ Firebase Console > Project Settings > API keys
// - authDomain: Sẽ là "YOUR_PROJECT_ID.firebaseapp.com"
// - projectId: Đã có "hcm202-31c0b"
// - storageBucket: Sẽ là "YOUR_PROJECT_ID.appspot.com"
// - messagingSenderId: Copy từ Firebase Console > Cloud Messaging
// - appId: Copy từ Firebase Console > Project Settings

const firebaseConfig = {
 apiKey: "AIzaSyAfFmsr7LbdRZZ59FL0RSwSmg0L89xmva4",
  authDomain: "hcm202-31c0b.firebaseapp.com",
  projectId: "hcm202-31c0b",
  storageBucket: "hcm202-31c0b.firebasestorage.app",
  messagingSenderId: "407951345392",
  appId: "1:407951345392:web:0dd0ed4a7528de6ee12435"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
