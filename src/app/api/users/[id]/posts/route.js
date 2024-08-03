import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/database";

export const GET = async (_request, { params }) => {
  try {
    await connectDB;

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500
    });
  }
};
