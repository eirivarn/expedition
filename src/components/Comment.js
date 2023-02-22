import React from 'react';
import "../styles/Trippage.css";

export function Comment() {
  return (
    <div className='commentShowBody'>
      <h2 className='commentShowAuthor'>Kari Nordmann</h2>
      <label className='commentShowDateTime'>02.02.2023, KL 12:04</label>
      <textarea className='commentShowText'>Spennende tur</textarea>
      <line className='commentShowLine' />
    </div>
  );
}

export default Comment;
