 import mongoose from "mongoose";

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error(" Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDataBase;