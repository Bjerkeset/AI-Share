"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Define the tags array directly within the component
  const tagOptions = [
    { value: "GPT-3.5", label: "GPT-3.5" },
    { value: "GPT-4", label: "GPT-4" },
    { value: "Board", label: "Board" },
    { value: "MidJurney", label: "MidJurney" },
    { value: "UX/UI", label: "UX/UI" },
    { value: "Web-Development", label: "Web-Development" },
  ];

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      // Make a POST request to create a new prompt
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error fetching: ", error);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      tagOptions={tagOptions}
    />
  );
};

export default CreatePrompt;
