import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/database";

export const GET = async (_request) => {
  try {
    await connectDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
