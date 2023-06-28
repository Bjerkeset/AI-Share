// POST function
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  // Convert tag array to a string
  const tagString = tag.join(" ");

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag: tagString });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch {
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};
