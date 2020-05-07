import React from 'react'
import Student from './Student'

// Component
export default function StudentList ({ students, children }) {
  return (
    <div>
      {children}
      {students.map(student => <Student key={student.number} {...student} />)}
      {children}
    </div>
  )
}
