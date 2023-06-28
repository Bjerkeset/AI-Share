import React from "react";
import Link from "next/link";
import Select from "react-select";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  tagOptions,
}) => {
  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleTagChange = (selected) => {
    setSelectedTags(selected);
    // Convert selected tags to an array of strings, and set it to the post state
    setPost({ ...post, tag: selected.map((tag) => tag.value) });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        {" "}
        <span className="blue_gradient">{type} Post</span>{" "}
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write prompt here"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
          </span>
          <Select
            isMulti // to allow selecting multiple tags
            options={tagOptions} // available tags
            value={selectedTags} // currently selected tags
            onChange={handleTagChange}
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm ">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
