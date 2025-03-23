import React from 'react'
import './drag.css'

export default function Drag() {
  return (
    <>
      <script src={'/samples/drag.js'} type="text/javascript" />
      <div className="sample-drag">
        <ul>
          <li id="test1" draggable="true">
            リスト1
          </li>
          <li id="test2" draggable="true">
            リスト2
          </li>
          <li id="test3" draggable="true">
            リスト3
          </li>
        </ul>
      </div>
    </>
  )
}
