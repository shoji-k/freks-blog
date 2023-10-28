import React from 'react'
import './table.css'
import { vegetables } from '../../constants/vegetables'

export default function Table() {
  return (
    <div className="sample-table">
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>野菜</th>
            <th colSpan={4}>栄養素</th>
          </tr>
          <tr>
            <th>カロリー</th>
            <th>ビタミンC</th>
            <th>ビタミンA</th>
            <th>食物繊維</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((vegetable) => (
            <React.Fragment key={vegetable.name}>
              <tr>
                <td>{vegetable.name}</td>
                <td>{vegetable.calorie}</td>
                <td>{vegetable.vitamin_c}</td>
                <td>{vegetable.vitamin_a}</td>
                <td>{vegetable.fiber}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
