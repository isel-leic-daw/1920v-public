import React from 'react'
import Student from './Student'

// Component
export default function StudentList ({ students }) {
  return React.createElement('div', null,
    students.map(student => React.createElement(Student, { ...student }))
  )
}
