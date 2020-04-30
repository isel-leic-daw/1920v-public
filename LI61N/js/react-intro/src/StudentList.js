import React from 'react'
import Student from './Student'

// Component
export default function StudentList ({ students }) {
  return (
    <div>
      {students.map(student => <Student key={student.number} {...student} />)}
    </div>
  )
}
