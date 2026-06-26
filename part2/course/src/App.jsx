import { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Course from './Course';

const Total = (props) => {
  return (
    <>
      <h1>Total: {props.course.getTotal()}</h1>
    </>
  );
};

function App() {
  // const course = {
  //   name: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10,
  //     },
  //     {
  //       name: 'Using props to pass data',
  //       exercises: 7,
  //     },
  //     {
  //       name: 'State of a component',
  //       exercises: 14,
  //     },
  //   ],
  //   getTotal: function () {
  //     let sum = 0;
  //     this.parts.forEach((item) => (sum = item.exercises + sum));
  //     return sum;
  //   },
  // };
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Course course={courses} />
      {/* <Total course={course} /> */}
    </>
  );
}

export default App;
