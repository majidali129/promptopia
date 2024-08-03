"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: ""
  });
  const [submitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      post={post}
      setPost={setPost}
      type="Create"
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default page;
