const SubmitBtn = ({
  text,
  disabled,
  loading,
}: {
  text: string;
  disabled: boolean;
  loading: boolean;
}) => {
  return (
    <button
      className={`btn btn-primary btn-block ${loading ? "loading" : ""}`}
      type="submit"
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default SubmitBtn;
