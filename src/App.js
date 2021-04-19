import {useState,useEffect} from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import Item from './item';

function App() {
  const [content, setContent] = useState();
  const [word, setWord] = useState('word');
  const [value, setValue] = useState('');

  const searchWord = (e) => {
    e.preventDefault();
    setWord(value);
    setValue('');
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
      params: {
        term: word
      },
      headers: {
        'x-rapidapi-key': '0a86052304msh589c04b0ba83872p11d86fjsnb7879687220f',
        'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
      }
    };

    axios.request(options).then(function(response) {
      setContent(response.data.list);
    }).catch(function(error) {
      console.error(error);
    });
  }, [word])

  return <>
    <div className="conteiner">
      <form className="search-form">
        <div className="wraps">
          <div className="inpt">
            <FiSearch className="search-icon" />
            <input
            id="word"
            className="word-input"
            placeholder="Search word"
            onChange={(e)=>setValue(e.target.value)}
            value={value}
            autoComplete="off"
            />
            {value === '' ? '' : <AiFillCloseCircle onClick={()=>{setValue('')}} className="search-close" />}
          </div>
          <div className="urban">
            <span>
              <AiOutlineSafetyCertificate className="cp"/>
              urban dictionary
            </span>
          </div>
        </div>
        <button onClick={(e)=> searchWord(e)} className="search-btn">Find it now</button>
      </form>
      {word === 'word' ?
        <div className="example">For Example (word)</div> :
        <h2 className="example">{word}</h2>
      }
      {content !== undefined ?
        <div className="urban-dict">
          {content.map((item)=>{
            return <Item item={item} key={item.defid} />
          })}
        </div> :
        'loading...'
      }
    </div>
  </>
}

export default App;
