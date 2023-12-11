const AddBlog = ({ setTitle, setUrl, setAuthor, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          type="text"
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
  
  export default AddBlog;
  