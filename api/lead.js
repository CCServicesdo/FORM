import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app;

if (!global._firebaseApp) {
  global._firebaseApp = initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}

app = global._firebaseApp;
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    await db.collection("leads").add({
      ...data,
      createdAt: new Date()
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Error saving:", error);
    return res.status(500).json({ error: "Error saving data" });
  }
}
