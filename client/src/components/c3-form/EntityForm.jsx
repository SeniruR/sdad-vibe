// Person 3 (C3) — implement EntityForm
export default function EntityForm({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({});
      }}
    >
      <p>TODO: Person 3 — EntityForm component</p>
      <button type="submit">Submit</button>
    </form>
  );
}
