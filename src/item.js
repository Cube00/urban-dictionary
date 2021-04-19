const Item = ({item}) =>{
  const {author, word, definition} = item;
  return <>
    <div className="item">
      <div className="author">
        {author}
        <span>{word}</span>
      </div>
      <div className="def">
        {definition}
      </div>
    </div>
  </>
}

export default Item;
